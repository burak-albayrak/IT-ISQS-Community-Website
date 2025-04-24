package com.devEra.ws.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.devEra.ws.core.error.ApiError;
import com.devEra.ws.core.message.GenericMessage;
import com.devEra.ws.dto.request.ForgotPasswordRequest;
import com.devEra.ws.dto.request.LoginRequest;
import com.devEra.ws.dto.request.ResetPasswordRequest;
import com.devEra.ws.dto.request.VerificationRequest;
import com.devEra.ws.dto.response.LoginResponse;
import com.devEra.ws.service.AuthenticationService;
import com.devEra.ws.service.EmailVerificationService;
import com.devEra.ws.service.ForgotPasswordService;

import jakarta.persistence.EntityNotFoundException;

@RestController
public class AuthenticationController {

    @Autowired
    private EmailVerificationService emailVerificationService;

    @Autowired
    private ForgotPasswordService forgotPasswordService;

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/api/v1/users/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            LoginResponse response = authenticationService.login(request);
            return ResponseEntity.ok(response);
            
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage("Email not found");
            error.setPath("/api/v1/users/login");
            return ResponseEntity.status(404).body(error);

        } catch (IllegalStateException e) {
            ApiError error = new ApiError();
            error.setStatus(403);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/users/login");
            return ResponseEntity.status(403).body(error);

        } catch (IllegalArgumentException e) {
            ApiError error = new ApiError();
            error.setStatus(401);
            error.setMessage("Invalid credentials");
            error.setPath("/api/v1/users/login");
            return ResponseEntity.status(401).body(error);
        }
    }

    @PostMapping("/api/v1/users/verify")
    public ResponseEntity<?> verifyEmail(@RequestBody VerificationRequest request) {
        boolean result = emailVerificationService.verifyCode(request.getCode());

        if (result) {
            return ResponseEntity.ok(new GenericMessage("Email verified successfully."));
        } else {
            ApiError apiError = new ApiError();
            apiError.setPath("/api/v1/users/verify");
            apiError.setMessage("Invalid or expired verification code.");
            apiError.setStatus(400);
            return ResponseEntity.badRequest().body(apiError);
        }
    }

    @PostMapping("/api/v1/users/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        boolean result = forgotPasswordService.sendResetCode(request.getEmail());

        if (result) {
            return ResponseEntity.ok(new GenericMessage("Verification code has been sent to your email."));
        } else {
            ApiError apiError = new ApiError();
            apiError.setPath("/api/v1/users/forgot-password");
            apiError.setMessage("No user registered with this email address.");
            apiError.setStatus(404);
            return ResponseEntity.status(404).body(apiError);
        }
    }

    @PostMapping("/api/v1/users/verify-reset-code")
    public ResponseEntity<?> verifyResetCode(@RequestBody VerificationRequest request) {
        boolean result = forgotPasswordService.verifyResetCode(request.getCode());

        if (result) {
            return ResponseEntity.ok(new GenericMessage("Reset code is valid. You can now change your password."));
        } else {
            ApiError apiError = new ApiError();
            apiError.setPath("/api/v1/users/verify-reset-code");
            apiError.setMessage("Invalid or expired verification code.");
            apiError.setStatus(400);
            return ResponseEntity.badRequest().body(apiError);
        }
    }

    @PostMapping("/api/v1/users/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {

        boolean result = forgotPasswordService.resetPassword(request.getCode(), request.getNewPassword());

        if (!result) {
            ApiError error = new ApiError();
            error.setStatus(400);
            error.setPath("/api/v1/users/reset-password");
            error.setMessage("Invalid or expired code");
            return ResponseEntity.badRequest().body(error);
        }

        return ResponseEntity.ok(new GenericMessage("Password has been successfully reset."));
    }
    
    @PostMapping("/api/v1/users/resend-verification")
    public ResponseEntity<?> resendVerificationCode(@RequestBody ForgotPasswordRequest request) {
        boolean result = authenticationService.resendVerificationCode(request.getEmail());
        
        if (result) {
            return ResponseEntity.ok(new GenericMessage("Verification code has been resent to your email."));
        } else {
            ApiError apiError = new ApiError();
            apiError.setPath("/api/v1/users/resend-verification");
            apiError.setMessage("Email is not registered or already verified.");
            apiError.setStatus(400);
            return ResponseEntity.badRequest().body(apiError);
        }
    }
    
    @PostMapping("/api/v1/users/resend-reset-code")
    public ResponseEntity<?> resendResetCode(@RequestBody ForgotPasswordRequest request) {
        boolean result = forgotPasswordService.sendResetCode(request.getEmail());
        
        if (result) {
            return ResponseEntity.ok(new GenericMessage("Password reset code has been resent to your email."));
        } else {
            ApiError apiError = new ApiError();
            apiError.setPath("/api/v1/users/resend-reset-code");
            apiError.setMessage("No user registered with this email address.");
            apiError.setStatus(404);
            return ResponseEntity.status(404).body(apiError);
        }
    }
}
