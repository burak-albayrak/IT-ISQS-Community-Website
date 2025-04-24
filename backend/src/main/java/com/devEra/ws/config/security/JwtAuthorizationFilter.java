package com.devEra.ws.config.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.util.StringUtils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.devEra.ws.core.error.ApiError;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final JwtTokenService jwtTokenService;
    private final ObjectMapper objectMapper;

    public JwtAuthorizationFilter(JwtTokenService jwtTokenService) {
        this.jwtTokenService = jwtTokenService;
        this.objectMapper = new ObjectMapper();
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {
        
        try {
            String path = request.getRequestURI();
            // Şu URL'ler için token kontrolü yapma:
            if (path.startsWith("/api/v1/users/login") || 
                path.startsWith("/api/v1/users/register") || 
                path.startsWith("/api/v1/users/verify") ||
                path.startsWith("/api/v1/users/forgot-password") ||
                path.startsWith("/api/v1/users/reset-password") ||
                path.startsWith("/api/v1/forum/posts") && request.getMethod().equals("GET") ||
                path.startsWith("/api/v1/forum/categories") ||
                path.startsWith("/api/v1/admins/login") ||
                path.startsWith("/oauth2/")) {
                filterChain.doFilter(request, response);
                return;
            }

            String token = getTokenFromRequest(request);

            if (StringUtils.hasText(token) && jwtTokenService.validateToken(token)) {
                // Token'dan user veya admin bilgisini al
                Integer userId = null;
                
                if (jwtTokenService.isUserToken(token)) {
                    userId = jwtTokenService.getUserIdFromToken(token);
                    
                    // Authentication nesnesi oluştur ve SecurityContext'e ekle
                    UsernamePasswordAuthenticationToken authentication = 
                            new UsernamePasswordAuthenticationToken(userId, null, null);
                    
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                } else if (jwtTokenService.isAdminToken(token)) {
                    Integer adminId = jwtTokenService.getAdminIdFromToken(token);
                    
                    // Authentication nesnesi oluştur ve SecurityContext'e ekle
                    UsernamePasswordAuthenticationToken authentication = 
                            new UsernamePasswordAuthenticationToken(adminId, null, null);
                    
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
                
                filterChain.doFilter(request, response);
            } else {
                // Token geçersiz veya yok, 401 Unauthorized hatası döndür
                ApiError error = new ApiError();
                error.setStatus(401);
                error.setMessage("Unauthorized: Invalid or missing token");
                error.setPath(request.getRequestURI());
                
                response.setStatus(401);
                response.setContentType("application/json");
                response.getWriter().write(objectMapper.writeValueAsString(error));
            }
        } catch (Exception e) {
            // Beklenmeyen bir hata oluştuğunda 500 Internal Server Error döndür
            ApiError error = new ApiError();
            error.setStatus(500);
            error.setMessage("Internal server error: " + e.getMessage());
            error.setPath(request.getRequestURI());
            
            response.setStatus(500);
            response.setContentType("application/json");
            response.getWriter().write(objectMapper.writeValueAsString(error));
        }
    }

    private String getTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        
        return null;
    }
} 