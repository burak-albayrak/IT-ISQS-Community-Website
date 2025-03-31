package com.devEra.ws.service;

import com.devEra.ws.entity.Admin;
import com.devEra.ws.repository.AdminRepository;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AdminService {
    
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Admin kullanıcıyı elle veri tabanına eklemek için.
     * UI üzerinden register yapılmayacak.
     */
    public void save(Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        adminRepository.save(admin);
    }

    /**
     * Giriş işlemi için email'e göre admin getirir.
     */
    public Optional<Admin> findByEmail(String email) {
        return adminRepository.findAll().stream()
                .filter(admin -> admin.getEmail().equals(email))
                .findFirst();
    }

    /**
     * Şifre güncelleme (eski şifre kontrolü frontend'de yapılabilir veya buraya eklenebilir)
     */
    public boolean updatePassword(String email, String newPassword) {
        Optional<Admin> adminOpt = findByEmail(email);
        if (adminOpt.isEmpty()) return false;

        Admin admin = adminOpt.get();
        admin.setPassword(passwordEncoder.encode(newPassword));
        adminRepository.save(admin);
        return true;
    }
 
}
