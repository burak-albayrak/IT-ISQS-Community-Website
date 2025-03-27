package com.devEra.ws.service;

import com.devEra.ws.core.enums.VerificationType;
import com.devEra.ws.entity.EmailVerification;
import com.devEra.ws.entity.User;
import com.devEra.ws.repository.EmailVerificationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class EmailVerificationService {

    private final EmailVerificationRepository verificationRepository;
    private final EmailService emailService;

    public void sendVerificationCode(User user) {
        // 6 haneli doğrulama kodu üret
        String code = String.format("%06d", new Random().nextInt(999999));

        // Önceki kullanılmamış REGISTER türündeki kodu pasifleştir
        verificationRepository.findByUserEmailAndTypeAndUsedFalse(user.getEmail(), VerificationType.REGISTRATION)
                .ifPresent(ev -> {
                    ev.setUsed(true);
                    verificationRepository.save(ev);
                });

        // Yeni doğrulama kaydı oluştur
        EmailVerification verification = new EmailVerification();
        verification.setUser(user);
        verification.setCode(code);
        verification.setCreatedAt(LocalDateTime.now());
        verification.setType(VerificationType.REGISTRATION);
        verification.setUsed(false);

        verificationRepository.save(verification);

        // Mail gönder
        emailService.sendVerificationEmail(user.getEmail(), code, user.getFirstName());
    }

    @Transactional
    public boolean verifyCode(String code) {
        var verificationOpt = verificationRepository.findByCodeAndTypeAndUsedFalse(code, VerificationType.REGISTRATION);

        if (verificationOpt.isEmpty()) {
            return false;
        }

        EmailVerification verification = verificationOpt.get();
        User user = verification.getUser();

        // Kullanıcıyı aktif hale getir
        user.setIsActive(true);

        // Bu kodu kullanılmış olarak işaretle
        verification.setUsed(true);

        return true;
    }
}
