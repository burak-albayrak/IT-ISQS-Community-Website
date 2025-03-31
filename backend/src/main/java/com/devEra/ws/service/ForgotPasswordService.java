package com.devEra.ws.service;

import com.devEra.ws.core.enums.VerificationType;
import com.devEra.ws.entity.EmailVerification;
import com.devEra.ws.entity.User;
import com.devEra.ws.repository.EmailVerificationRepository;
import com.devEra.ws.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class ForgotPasswordService {

    private final UserRepository userRepository;
    private final EmailVerificationRepository verificationRepository;
    private final EmailSenderService emailService;

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public boolean sendResetCode(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            return false;
        }

        User user = userOpt.get();

        // Önceki kullanılmamış PASSWORD_RESET kodu varsa iptal et
        verificationRepository.findByUserEmailAndTypeAndUsedFalse(
                user.getEmail(), VerificationType.PASSWORD_RESET)
                .ifPresent(ev -> {
                    ev.setUsed(true);
                    verificationRepository.save(ev);
                });

        // Yeni 6 haneli kod üret
        String code = String.format("%06d", new Random().nextInt(999999));

        EmailVerification verification = new EmailVerification();
        verification.setUser(user);
        verification.setCode(code);
        verification.setCreatedAt(LocalDateTime.now());
        verification.setType(VerificationType.PASSWORD_RESET);
        verification.setUsed(false);

        verificationRepository.save(verification);

        // Mail gönder
        emailService.sendForgotPasswordCode(user.getEmail(), code, user.getFirstName());

        return true;
    }

    public boolean verifyResetCode(String code) {
        return verificationRepository
                .findByCodeAndTypeAndUsedFalse(code, VerificationType.PASSWORD_RESET)
                .map(verification -> {
                    verificationRepository.save(verification);
                    return true;
                }).orElse(false);
    }

    // Code'u ui'da tutmamız lazım bunu frontda yaparken dikkat edelim. Yoksa
    // backend hangi kullanıcının şifresini resetleyeceğini bilemez
    public boolean resetPassword(String code, String newPassword) {
        return verificationRepository
                .findByCodeAndTypeAndUsedFalse(code, VerificationType.PASSWORD_RESET)
                .map(verification -> {
                    User user = verification.getUser();
                    user.setPassword(passwordEncoder.encode(newPassword));
                    verification.setUsed(true);
                    userRepository.save(user);
                    verificationRepository.save(verification);
                    return true;
                }).orElse(false);
    }
}
