package com.devEra.ws.service;

import com.devEra.ws.config.security.JwtTokenService;
import com.devEra.ws.dto.request.UpdatePasswordRequest;
import com.devEra.ws.dto.request.UpdateProfileRequest;
import com.devEra.ws.dto.response.LoginResponse;
import com.devEra.ws.entity.Admin;
import com.devEra.ws.entity.User;
import com.devEra.ws.repository.AdminRepository;
import com.devEra.ws.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;
    private final UserRepository userRepository;
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
    
    /**
     * Tüm kullanıcıları listeler
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    /**
     * Belirli bir kullanıcının bilgilerini getirir
     */
    public User getUserById(int userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));
    }
    
    /**
     * Admin tarafından kullanıcı profil bilgilerini günceller
     */
    @Transactional
    public User updateUserProfile(int userId, UpdateProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));
        
        if (request.getFirstName() != null)
            user.setFirstName(request.getFirstName());
        if (request.getLastName() != null)
            user.setLastName(request.getLastName());
        if (request.getInstitution() != null)
            user.setInstitution(request.getInstitution());
        if (request.getCountry() != null)
            user.setCountry(request.getCountry());
        if (request.getAge() != null)
            user.setAge(request.getAge());
        if (request.getGender() != null)
            user.setGender(request.getGender());
        if (request.getRole() != null) {
            user.setRole(request.getRole());
        }
        // Special handling for picture - always update it, even if it's null
        user.setPicture(request.getPicture());
        
        return userRepository.save(user);
    }
    
    /**
     * Admin tarafından kullanıcı aktivasyon durumunu değiştirir
     */
    @Transactional
    public User updateUserActiveStatus(int userId, boolean isActive) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));
        
        user.setIsActive(isActive);
        return userRepository.save(user);
    }
    
    /**
     * Admin tarafından kullanıcı engelleme durumunu değiştirir
     */
    @Transactional
    public User updateUserBlockStatus(int userId, boolean isBlocked) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));
        
        user.setIsBlocked(isBlocked);
        return userRepository.save(user);
    }
    
    /**
     * Admin tarafından kullanıcı şifre sıfırlama
     */
    @Transactional
    public User resetUserPassword(int userId, String newPassword) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + userId));
        
        user.setPassword(passwordEncoder.encode(newPassword));
        return userRepository.save(user);
    }
}
