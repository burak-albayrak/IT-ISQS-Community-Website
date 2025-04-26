package com.devEra.ws.security.oauth2;

import com.devEra.ws.config.security.JwtTokenService;
import com.devEra.ws.entity.User;
import com.devEra.ws.service.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenService tokenService;
    private final UserService userService;

    @Value("${app.oauth2.redirectUri}")
    private String redirectUri;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                      Authentication authentication) throws IOException, ServletException {
        
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        
        Optional<User> userOptional = userService.findByEmail(email);
        
        String targetUrl;
        if (userOptional.isPresent()) {
            // Kullanıcı zaten kayıtlı, JWT token oluştur
            User user = userOptional.get();
            String token = tokenService.generateTokenForUser(user);
            
            targetUrl = UriComponentsBuilder.fromUriString(redirectUri)
                    .queryParam("token", token)
                    .build().toUriString();
        } else {
            // Yeni kullanıcı, geçici token oluştur
            String tempToken = tokenService.generateTempToken(oAuth2User.getAttributes());
            
            targetUrl = UriComponentsBuilder.fromUriString(redirectUri)
                    .queryParam("tempToken", tempToken)
                    .queryParam("registration", "incomplete")
                    .build().toUriString();
        }
        
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
} 