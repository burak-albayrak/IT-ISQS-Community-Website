package com.devEra.ws.service;

import java.util.UUID;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.devEra.ws.entity.User;
import com.devEra.ws.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final EmailVerificationService emailVerificationService;

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void save(User user) {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setIsActive(false); 
            user.setIsBlocked(false);
            user.setIsAdmin(false);

            userRepository.save(user); 
            emailVerificationService.sendVerificationCode(user);

        } catch (DataIntegrityViolationException e) {
            System.out.println("Duplicate email or other integrity error.");
            throw e;
        }
    }
}
