package com.devEra.ws.business;

import com.devEra.ws.entity.User;
import com.devEra.ws.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public String registerUser(String name, String surname, String email, String password) {
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            throw new RuntimeException("Bu e-posta zaten kayıtlı!");
        }

        User user = new User();
        user.setName(name);
        user.setSurname(surname);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password)); // Şifreyi hashle
        user.setActive(false); // Hesap doğrulanana kadar pasif
        userRepository.save(user);

        // Doğrulama tokenı oluştur
        String token = UUID.randomUUID().toString();
        user.setVerificationToken(token);
        userRepository.save(user);

        String verificationLink = "http://localhost:8080/api/auth/verify?token=" + token;
        emailService.sendEmail(user.getEmail(), "Hesabınızı Doğrulayın", 
            "Lütfen aşağıdaki bağlantıya tıklayarak hesabınızı doğrulayın:\n" + verificationLink);

        return "Kayıt başarılı! Lütfen e-postanızı kontrol edin.";
    }

    public String verifyEmail(String token) {
        Optional<User> optionalUser = userRepository.findByVerificationToken(token);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setActive(true);
            userRepository.save(user);
            return "Hesabınız doğrulandı!";
        } else {
            return "Geçersiz veya süresi dolmuş token!";
        }
    }
}
