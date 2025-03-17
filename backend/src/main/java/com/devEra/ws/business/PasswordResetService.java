package com.devEra.ws.business;

import com.devEra.ws.entity.User;
import com.devEra.ws.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordResetService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    public String sendResetEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return "Bu e-posta adresi kayıtlı değil.";
        }

        String token = UUID.randomUUID().toString();
        String resetLink = "http://localhost:8080/api/auth/reset-password?token=" + token;

        emailService.sendEmail(email, "Şifre Sıfırlama", 
            "Şifrenizi sıfırlamak için tıklayın:\n" + resetLink);

        return "Şifre sıfırlama bağlantısı gönderildi!";
    }
}
