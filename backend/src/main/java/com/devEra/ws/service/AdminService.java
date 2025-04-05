package com.devEra.ws.service;

import com.devEra.ws.config.security.JwtTokenService;
import com.devEra.ws.dto.request.UpdatePasswordRequest;
import com.devEra.ws.dto.response.LoginResponse;
import com.devEra.ws.entity.Admin;
import com.devEra.ws.repository.AdminRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;
    private final JwtTokenService jwtTokenService;

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    /**
     * Admin kullanıcıyı elle veri tabanına eklemek için.
     * UI üzerinden register yapılmayacak.
     */
    public void save(Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        adminRepository.save(admin);
    }

    /**
     * Admin için giriş yapma
     */
    public LoginResponse login(String email, String password) {
        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Admin not found"));

        if (!passwordEncoder.matches(password, admin.getPassword())) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        String token = jwtTokenService.generateTokenForAdmin(admin);
        return new LoginResponse(token, "Admin login successful.");
    }

    /**
     * Şifre güncelleme (eski şifre kontrolü frontend'de yapılabilir veya buraya
     * eklenebilir)
     */
    public boolean updatePassword(int adminId, UpdatePasswordRequest request) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new EntityNotFoundException("Admin not found"));

        if (!passwordEncoder.matches(request.getOldPassword(), admin.getPassword())) {
            return false;
        }

        admin.setPassword(passwordEncoder.encode(request.getNewPassword()));
        adminRepository.save(admin);

        return true;
    }

}
