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

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new EntityNotFoundException("Email not found"));

        if (!user.getIsActive()) {
            throw new IllegalStateException("Email is not verified");
        }

        boolean passwordMatches = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if (!passwordMatches) {
            throw new IllegalArgumentException("Invalid password");
        }

        String jwt = jwtTokenService.generateToken(user.getEmail());
        return new LoginResponse(jwt, "Login successful!");

    }
}
