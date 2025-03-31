package com.devEra.ws.api.controller;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.devEra.ws.core.error.ApiError;
import com.devEra.ws.core.message.GenericMessage;
import com.devEra.ws.dto.request.UpdatePasswordRequest;
import com.devEra.ws.dto.request.UpdateProfileRequest;
import com.devEra.ws.entity.User;
import com.devEra.ws.exception.NotUniqueEmailException;
import com.devEra.ws.service.UserService;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/api/v1/users")
    GenericMessage createUser(@Valid @RequestBody User user) {

        userService.save(user);
        return new GenericMessage("User is created!");
    };

    @PutMapping("/api/v1/users/{id}")
    public ResponseEntity<?> updateUserProfile(@PathVariable int id, @RequestBody UpdateProfileRequest request) {
        try {
            userService.updateProfile(id, request);
            return ResponseEntity.ok(new GenericMessage("Profile updated successfully."));
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage("User not found");
            error.setPath("/api/v1/users/" + id);
            return ResponseEntity.status(404).body(error);
        }
    }

    @PutMapping("/api/v1/users/{id}/password")
    public ResponseEntity<?> updatePassword(@PathVariable int id, @RequestBody UpdatePasswordRequest request) {

        boolean success = userService.updatePassword(id, request);

        if (!success) {
            ApiError error = new ApiError();
            error.setStatus(400);
            error.setPath("/api/v1/users/" + id + "/password");
            error.setMessage("Old password is incorrect.");
            return ResponseEntity.badRequest().body(error);
        }

        return ResponseEntity.ok(new GenericMessage("Password updated successfully."));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleMethodArgNotValidEx(MethodArgumentNotValidException exception) {

        ApiError apiError = new ApiError();
        apiError.setPath("/api/v1/users");
        apiError.setMessage("Validation failed");
        apiError.setStatus(400);

        Map<String, String> validationErrors = new HashMap<>();

        for (var fieldError : exception.getBindingResult().getFieldErrors()) {
            validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }
        apiError.setValidationErrors(validationErrors);

        return ResponseEntity.badRequest().body(apiError);
    }

    @ExceptionHandler(NotUniqueEmailException.class)
    public ResponseEntity<ApiError> handleNotUniqueEmailEx(NotUniqueEmailException exception) {
        ApiError apiError = new ApiError();
        apiError.setPath("/api/v1/users");
        apiError.setMessage(exception.getMessage());
        apiError.setStatus(400);
        apiError.setValidationErrors(exception.getValidationErrors());
        return ResponseEntity.badRequest().body(apiError);
    }
}