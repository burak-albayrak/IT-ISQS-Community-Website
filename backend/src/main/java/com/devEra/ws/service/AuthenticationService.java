package com.devEra.ws.service;

import com.devEra.ws.config.security.JwtTokenService;
import com.devEra.ws.dto.request.LoginRequest;
import com.devEra.ws.dto.response.LoginResponse;
import com.devEra.ws.entity.User;
import com.devEra.ws.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final JwtTokenService jwtTokenService;
    private final EmailVerificationService emailVerificationService;

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public LoginResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new EntityNotFoundException("User not found."));
        
        if (!user.getIsActive()) {
            // Send a new verification code for inactive users
            emailVerificationService.sendVerificationCode(user);
            throw new IllegalStateException("Account is not verified. A new verification code has been sent to your email.");
        }
        
        if (user.getIsBlocked()) {
            throw new IllegalStateException("Your account has been blocked. Please contact an administrator.");
        }

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials.");
        }

        String token = jwtTokenService.generateTokenForUser(user);
        return new LoginResponse(token, "Login successful.");
    }
    
    /**
     * Aktif olmayan kullanıcılar için yeni doğrulama kodu gönderir
     * 
     * @param email Kullanıcı email adresi
     * @return Doğrulama kodu gönderildi mi
     */
    public boolean resendVerificationCode(String email) {
        return userRepository.findByEmail(email)
                .map(user -> {
                    if (!user.getIsActive()) {
                        emailVerificationService.sendVerificationCode(user);
                        return true;
                    }
                    return false; // Kullanıcı zaten aktif
                })
                .orElse(false); // Kullanıcı bulunamadı
    }
}
