package com.devEra.ws.api.controller;

import com.devEra.ws.core.error.ApiError;
import com.devEra.ws.core.message.GenericMessage;
import com.devEra.ws.dto.request.UpdatePasswordRequest;
import com.devEra.ws.dto.request.UpdateProfileRequest;
import com.devEra.ws.dto.request.Admin.AdminLoginRequest;
import com.devEra.ws.dto.response.LoginResponse;
import com.devEra.ws.entity.Admin;
import com.devEra.ws.entity.User;
import com.devEra.ws.service.AdminService;
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
    
    /**
     * Tüm kullanıcıları listeler (admin kullanımı için)
     */
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }
    
    /**
     * Belirli bir kullanıcının bilgilerini getirir (admin kullanımı için)
     */
    @GetMapping("/users/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable int userId) {
        try {
            User user = adminService.getUserById(userId);
            return ResponseEntity.ok(user);
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/admins/users/" + userId);
            return ResponseEntity.status(404).body(error);
        }
    }
    
    /**
     * Admin tarafından kullanıcı profil bilgilerini günceller
     */
    @PutMapping("/users/{userId}")
    public ResponseEntity<?> updateUserProfile(@PathVariable int userId, @RequestBody UpdateProfileRequest request) {
        try {
            User updatedUser = adminService.updateUserProfile(userId, request);
            return ResponseEntity.ok(updatedUser);
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/admins/users/" + userId);
            return ResponseEntity.status(404).body(error);
        }
    }
    
    /**
     * Admin tarafından kullanıcı aktivasyon durumunu değiştirir
     */
    @PutMapping("/users/{userId}/activate")
    public ResponseEntity<?> activateUser(@PathVariable int userId, @RequestBody Map<String, Boolean> requestBody) {
        try {
            Boolean isActive = requestBody.get("isActive");
            if (isActive == null) {
                ApiError error = new ApiError();
                error.setStatus(400);
                error.setMessage("isActive field is required");
                error.setPath("/api/v1/admins/users/" + userId + "/activate");
                return ResponseEntity.badRequest().body(error);
            }
            
            User updatedUser = adminService.updateUserActiveStatus(userId, isActive);
            return ResponseEntity.ok(updatedUser);
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/admins/users/" + userId + "/activate");
            return ResponseEntity.status(404).body(error);
        }
    }
    
    /**
     * Admin tarafından kullanıcı engelleme durumunu değiştirir
     */
    @PutMapping("/users/{userId}/block")
    public ResponseEntity<?> blockUser(@PathVariable int userId, @RequestBody Map<String, Boolean> requestBody) {
        try {
            Boolean isBlocked = requestBody.get("isBlocked");
            if (isBlocked == null) {
                ApiError error = new ApiError();
                error.setStatus(400);
                error.setMessage("isBlocked field is required");
                error.setPath("/api/v1/admins/users/" + userId + "/block");
                return ResponseEntity.badRequest().body(error);
            }
            
            User updatedUser = adminService.updateUserBlockStatus(userId, isBlocked);
            return ResponseEntity.ok(updatedUser);
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/admins/users/" + userId + "/block");
            return ResponseEntity.status(404).body(error);
        }
    }
    
    /**
     * Admin tarafından kullanıcı şifre sıfırlama
     */
    @PutMapping("/users/{userId}/reset-password")
    public ResponseEntity<?> resetUserPassword(@PathVariable int userId, @RequestBody Map<String, String> requestBody) {
        try {
            String newPassword = requestBody.get("newPassword");
            if (newPassword == null || newPassword.trim().isEmpty()) {
                ApiError error = new ApiError();
                error.setStatus(400);
                error.setMessage("newPassword field is required");
                error.setPath("/api/v1/admins/users/" + userId + "/reset-password");
                return ResponseEntity.badRequest().body(error);
            }
            
            User updatedUser = adminService.resetUserPassword(userId, newPassword);
            return ResponseEntity.ok(new GenericMessage("User password has been reset successfully."));
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/admins/users/" + userId + "/reset-password");
            return ResponseEntity.status(404).body(error);
        }
    }
}
