package com.devEra.ws.api.controller;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.devEra.ws.core.enums.CreatorType;
import com.devEra.ws.core.error.ApiError;
import com.devEra.ws.core.message.GenericMessage;
import com.devEra.ws.dto.request.UpdatePasswordRequest;
import com.devEra.ws.dto.request.UpdateProfileRequest;
import com.devEra.ws.entity.User;
import com.devEra.ws.entity.Forum.ForumPost;
import com.devEra.ws.exception.NotUniqueEmailException;
import com.devEra.ws.service.UserService;
import com.devEra.ws.service.S3Service;
import com.devEra.ws.config.security.JwtTokenService;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    S3Service s3Service;

    @Autowired
    com.devEra.ws.config.security.JwtTokenService jwtTokenService;

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

    @GetMapping("/api/v1/users/{userId}/saved-posts")
    public List<ForumPost> getUserSavedPosts(
            @PathVariable int userId,
            @RequestParam CreatorType creatorType) {
        return userService.getSavedForumPosts(userId, creatorType);
    }

    /**
     * Giriş yapmış kullanıcının kaydettiği forum postlarını getirir
     * 
     * @param tokenHeader Yetkilendirme token'ı
     * @return Kullanıcının kaydettiği forum postları listesi
     */
    @GetMapping("/api/v1/users/me/saved-posts")
    public ResponseEntity<?> getMyUserSavedPosts(
            @RequestHeader("Authorization") String tokenHeader) {
        try {
            // Token'dan kullanıcı bilgilerini al
            String token = tokenHeader.replace("Bearer ", "");
            Integer userId;
            CreatorType creatorType;
            
            if (jwtTokenService.isAdminToken(token)) {
                userId = jwtTokenService.getAdminIdFromToken(token);
                creatorType = CreatorType.ADMIN;
            } else {
                userId = jwtTokenService.getUserIdFromToken(token);
                creatorType = CreatorType.USER;
            }
            
            List<ForumPost> savedPosts = userService.getSavedForumPosts(userId, creatorType);
            return ResponseEntity.ok(savedPosts);
        } catch (Exception e) {
            ApiError error = new ApiError();
            error.setStatus(401);
            error.setMessage("Invalid or missing token: " + e.getMessage());
            error.setPath("/api/v1/users/me/saved-posts");
            return ResponseEntity.status(401).body(error);
        }
    }

    /**
     * Kullanıcı bilgilerini ID'ye göre getirir
     * 
     * @param userId Kullanıcı ID'si
     * @return Kullanıcı bilgileri
     */
    @GetMapping("/api/v1/users/{userId}")
    public ResponseEntity<?> getUser(@PathVariable int userId) {
        try {
            User user = userService.getUser(userId);
            return ResponseEntity.ok(user);
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/users/" + userId);
            return ResponseEntity.status(404).body(error);
        }
    }
    
    /**
     * Kullanıcı bilgilerini email adresine göre getirir
     * 
     * @param email Kullanıcı email adresi
     * @return Kullanıcı bilgileri
     */
    @GetMapping("/api/v1/users/email")
    public ResponseEntity<?> getUserByEmail(@RequestParam String email) {
        try {
            User user = userService.getUserByEmail(email);
            return ResponseEntity.ok(user);
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/users/email?email=" + email);
            return ResponseEntity.status(404).body(error);
        } catch (IllegalArgumentException e) {
            ApiError error = new ApiError();
            error.setStatus(400);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/users/email");
            return ResponseEntity.status(400).body(error);
        }
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

    /**
     * Kullanıcının profil resmini günceller
     * 
     * @param userId Kullanıcı ID'si
     * @param file Yüklenen profil resmi
     * @return Başarı mesajı
     */
    @PostMapping("/api/v1/users/{userId}/profile-picture")
    public ResponseEntity<?> uploadProfilePicture(
            @PathVariable int userId,
            @RequestPart("file") MultipartFile file) {
        
        try {
            // S3'e dosyayı yükle ve URL'ini al
            String pictureUrl = s3Service.uploadProfilePicture(file, userId);
            
            // Kullanıcı profilini güncelle
            UpdateProfileRequest updateRequest = new UpdateProfileRequest();
            updateRequest.setPicture(pictureUrl);
            userService.updateProfile(userId, updateRequest);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Profile picture uploaded successfully");
            response.put("pictureUrl", pictureUrl);
            
            return ResponseEntity.ok(response);
            
        } catch (IOException e) {
            ApiError error = new ApiError();
            error.setStatus(500);
            error.setMessage("Failed to upload profile picture: " + e.getMessage());
            error.setPath("/api/v1/users/" + userId + "/profile-picture");
            return ResponseEntity.status(500).body(error);
        } catch (IllegalArgumentException e) {
            ApiError error = new ApiError();
            error.setStatus(400);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/users/" + userId + "/profile-picture");
            return ResponseEntity.badRequest().body(error);
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/users/" + userId + "/profile-picture");
            return ResponseEntity.status(404).body(error);
        }
    }
    
    /**
     * Kullanıcının profil resmini kaldırır (null olarak ayarlar)
     * 
     * @param userId Kullanıcı ID'si
     * @return Başarı mesajı
     */
    @PostMapping("/api/v1/users/{userId}/remove-profile-picture")
    public ResponseEntity<?> removeProfilePicture(@PathVariable int userId) {
        try {
            // Kullanıcı profilini güncelle - resmi null olarak ayarla
            UpdateProfileRequest updateRequest = new UpdateProfileRequest();
            updateRequest.setPicture(null);
            userService.updateProfile(userId, updateRequest);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Profile picture removed successfully");
            
            return ResponseEntity.ok(response);
            
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/users/" + userId + "/remove-profile-picture");
            return ResponseEntity.status(404).body(error);
        } catch (Exception e) {
            ApiError error = new ApiError();
            error.setStatus(500);
            error.setMessage("Failed to remove profile picture: " + e.getMessage());
            error.setPath("/api/v1/users/" + userId + "/remove-profile-picture");
            return ResponseEntity.status(500).body(error);
        }
    }

    /**
     * Giriş yapmış kullanıcının bilgilerini getirir
     * 
     * @param tokenHeader Yetkilendirme token'ı
     * @return Kullanıcı bilgileri
     */
    @GetMapping("/api/v1/users/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String tokenHeader) {
        try {
            String token = tokenHeader.replace("Bearer ", "");
            Integer userId;
            
            if (jwtTokenService.isAdminToken(token)) {
                userId = jwtTokenService.getAdminIdFromToken(token);
            } else {
                userId = jwtTokenService.getUserIdFromToken(token);
            }
            
            User user = userService.getUser(userId);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            ApiError error = new ApiError();
            error.setStatus(401);
            error.setMessage("Invalid or missing token: " + e.getMessage());
            error.setPath("/api/v1/users/me");
            return ResponseEntity.status(401).body(error);
        }
    }
}