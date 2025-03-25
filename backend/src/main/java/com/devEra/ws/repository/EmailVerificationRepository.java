package com.devEra.ws.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devEra.ws.core.enums.VerificationType;
import com.devEra.ws.entity.EmailVerification;

public interface EmailVerificationRepository extends JpaRepository<EmailVerification, Integer> {

    Optional<EmailVerification> findByUserEmailAndUsedFalse(String email);

    Optional<EmailVerification> findByUserEmailAndTypeAndUsedFalse(String email, VerificationType type);

    Optional<EmailVerification> findByCodeAndTypeAndUsedFalse(String code, VerificationType type);
}
