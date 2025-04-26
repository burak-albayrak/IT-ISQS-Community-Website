package com.devEra.ws.security.oauth2;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
public class OAuth2AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Value("${app.oauth2.successRedirect}")
    private String baseUrl;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException exception) throws IOException, ServletException {
        
        String message = exception.getMessage();
        if (message != null) {
            message = message.replaceAll("[\\r\\n]", " "); // CR/LF karakterlerini temizle
            message = URLEncoder.encode(message, StandardCharsets.UTF_8);
        }

        String targetUrl = UriComponentsBuilder.fromUriString(baseUrl)
                .queryParam("error", "oauth2_error")
                .queryParam("message", message)
                .build().toUriString();

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
} 