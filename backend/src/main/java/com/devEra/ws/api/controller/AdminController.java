package com.devEra.ws.api.controller;

import com.devEra.ws.core.error.ApiError;
import com.devEra.ws.core.message.GenericMessage;
import com.devEra.ws.dto.request.UpdatePasswordRequest;
import com.devEra.ws.dto.request.Admin.AdminLoginRequest;
import com.devEra.ws.dto.response.LoginResponse;
import com.devEra.ws.entity.Admin;
import com.devEra.ws.entity.User;
import com.devEra.ws.service.AdminService;
import com.devEra.ws.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admins")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final UserService userService;

    // Admin login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AdminLoginRequest request) {
        try {
            LoginResponse response = adminService.login(request.getEmail(), request.getPassword());
            return ResponseEntity.ok(response);
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage("Admin not found.");
            error.setPath("/api/v1/admins/login");
            return ResponseEntity.status(404).body(error);
        } catch (IllegalArgumentException e) {
            ApiError error = new ApiError();
            error.setStatus(401);
            error.setMessage("Invalid credentials.");
            error.setPath("/api/v1/admins/login");
            return ResponseEntity.status(401).body(error);
        }
    }

    // Admin şifre güncelleme
    @PutMapping("/{id}/password")
    public ResponseEntity<?> updatePassword(@PathVariable int id, @RequestBody UpdatePasswordRequest request) {
        boolean updated = adminService.updatePassword(id, request);

        if (!updated) {
            ApiError error = new ApiError();
            error.setStatus(400);
            error.setMessage("Old password is incorrect.");
            error.setPath("/api/v1/admins/" + id + "/password");
            return ResponseEntity.badRequest().body(error);
        }

        return ResponseEntity.ok(new GenericMessage("Password updated successfully."));
    }

    // Manuel admin ekleme (UI'dan erişilmeyecek, sadece dev/test için)
    @PostMapping
    public ResponseEntity<GenericMessage> createAdmin(@Valid @RequestBody Admin admin) {
        adminService.save(admin);
        return ResponseEntity.ok(new GenericMessage("Admin created successfully."));
    }

    // Tüm kullanıcıları getir
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // Kullanıcı engelleme/engel kaldırma
    @PutMapping("/users/{userId}/block")
    public ResponseEntity<?> toggleUserBlock(@PathVariable int userId, @RequestBody Map<String, Boolean> request) {
        try {
            boolean blocked = request.get("blocked");
            userService.toggleUserBlock(userId, blocked);
            String message = blocked ? "User blocked successfully." : "User unblocked successfully.";
            return ResponseEntity.ok(new GenericMessage(message));
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage("User not found.");
            error.setPath("/api/v1/admins/users/" + userId + "/block");
            return ResponseEntity.status(404).body(error);
        }
    }

    // Kullanıcı rolünü güncelle
    @PutMapping("/users/{userId}/role")
    public ResponseEntity<?> updateUserRole(@PathVariable int userId, @RequestBody Map<String, String> request) {
        try {
            String role = request.get("role");
            userService.updateUserRole(userId, role);
            return ResponseEntity.ok(new GenericMessage("User role updated successfully."));
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage("User not found.");
            error.setPath("/api/v1/admins/users/" + userId + "/role");
            return ResponseEntity.status(404).body(error);
        } catch (IllegalArgumentException e) {
            ApiError error = new ApiError();
            error.setStatus(400);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/admins/users/" + userId + "/role");
            return ResponseEntity.status(400).body(error);
        }
    }
}
