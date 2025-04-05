package com.devEra.ws.api.controller;

import com.devEra.ws.core.error.ApiError;
import com.devEra.ws.core.message.GenericMessage;
import com.devEra.ws.dto.request.UpdatePasswordRequest;
import com.devEra.ws.dto.request.Admin.AdminLoginRequest;
import com.devEra.ws.dto.response.LoginResponse;
import com.devEra.ws.entity.Admin;
import com.devEra.ws.service.AdminService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
