package com.devEra.ws.api.controller;

import com.devEra.ws.config.security.JwtTokenService;
import com.devEra.ws.dto.oauth.OAuth2UserInfo;
import com.devEra.ws.dto.request.CompleteRegistrationRequest;
import com.devEra.ws.dto.response.LoginResponse;
import com.devEra.ws.entity.User;
import com.devEra.ws.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/oauth2")
@RequiredArgsConstructor
public class OAuth2Controller {

    private final JwtTokenService tokenService;
    private final UserService userService;

    @Value("${app.oauth2.successRedirect}")
    private String successRedirectUri;

    @GetMapping("/login/oauth2/code/{registrationId}")
    public ResponseEntity<?> handleOAuth2Callback(OAuth2AuthenticationToken authentication) {
        OAuth2UserInfo userInfo = OAuth2UserInfo.extract(
            authentication.getAuthorizedClientRegistrationId(),
            authentication.getPrincipal().getAttributes()
        );

        Optional<User> existingUser = userService.findByEmail(userInfo.getEmail());
        String redirectUrl;

        if (existingUser.isPresent()) {
            // Kullanıcı zaten kayıtlı, JWT token oluştur
            String token = tokenService.generateTokenForUser(existingUser.get());
            redirectUrl = UriComponentsBuilder.fromUriString(successRedirectUri)
                    .queryParam("token", token)
                    .build().toUriString();
        } else {
            // Yeni kullanıcı için geçici token oluştur
            Map<String, Object> claims = new HashMap<>();
            claims.put("email", userInfo.getEmail());
            claims.put("firstName", userInfo.getFirstName());
            claims.put("lastName", userInfo.getLastName());
            claims.put("picture", userInfo.getImageUrl());
            claims.put("isTemp", true);
            
            String tempToken = tokenService.generateTempToken(claims);
            redirectUrl = UriComponentsBuilder.fromUriString(successRedirectUri)
                    .queryParam("temp_token", tempToken)
                    .queryParam("registration", "incomplete")
                    .build().toUriString();
        }

        return ResponseEntity.status(302)
                .location(URI.create(redirectUrl))
                .build();
    }

    @PostMapping("/complete-registration")
    public ResponseEntity<?> completeRegistration(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody CompleteRegistrationRequest request) {
        
        if (!authHeader.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().body("Invalid authorization header");
        }

        String tempToken = authHeader.substring(7);
        if (!tokenService.isTempToken(tempToken)) {
            return ResponseEntity.badRequest().body("Invalid token type");
        }

        OAuth2UserInfo userInfo = tokenService.getUserInfoFromTempToken(tempToken);
        
        // Yeni kullanıcı oluştur
        User newUser = new User();
        newUser.setEmail(userInfo.getEmail());
        newUser.setFirstName(userInfo.getFirstName());
        newUser.setLastName(userInfo.getLastName());
        newUser.setPicture(userInfo.getImageUrl());
        newUser.setPassword(request.getPassword());
        newUser.setGender(request.getGender());
        newUser.setAge(request.getAge());
        newUser.setInstitution(request.getInstitution());
        newUser.setCountry(request.getCountry());
        newUser.setRole(request.getRole());
        newUser.setIsActive(true); // Google ile gelen email zaten doğrulanmış
        newUser.setIsBlocked(false);

        userService.saveUser(newUser);

        // Normal JWT token oluştur
        String token = tokenService.generateTokenForUser(newUser);
        
        return ResponseEntity.ok()
                .body(new LoginResponse(token, "Registration completed successfully"));
    }
} 