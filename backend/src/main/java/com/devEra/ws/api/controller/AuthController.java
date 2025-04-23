package com.devEra.ws.api.controller;

import java.io.IOException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devEra.ws.util.CookieUtils;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    /**
     * OAuth2 giriş için başlatıcı endpoint
     * 
     * @param provider OAuth2 provider (google, facebook, vb.)
     * @param redirectUri Başarılı girişten sonra yönlendirilecek URL
     * @param request HTTP isteği
     * @param response HTTP yanıtı
     */
    @GetMapping("/oauth2/authorize/{provider}")
    public void authorizeOAuth2Authentication(
            @PathVariable String provider,
            @RequestParam(required = false) String redirectUri,
            HttpServletRequest request,
            HttpServletResponse response) throws IOException {
        
        if (redirectUri != null && !redirectUri.isEmpty()) {
            // Yönlendirme URL'sini cookie'ye kaydet (30 dakika geçerli)
            CookieUtils.addCookie(response, "redirect_uri", redirectUri, 30 * 60);
        }
        
        // Doğrudan OAuth2 yetkilendirme URL'sine yönlendir (Spring Security tarafından işlenecek)
        response.sendRedirect("/oauth2/authorize/" + provider);
    }
} 