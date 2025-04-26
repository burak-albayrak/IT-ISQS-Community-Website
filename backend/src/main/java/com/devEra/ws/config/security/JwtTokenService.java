package com.devEra.ws.config.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import com.devEra.ws.core.enums.CreatorType;
import com.devEra.ws.dto.oauth.OAuth2UserInfo;
import com.devEra.ws.entity.Admin;
import com.devEra.ws.entity.User;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.time.Duration;

@Service
public class JwtTokenService {

    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 24 saat
    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Admin için token üret
    public String generateTokenForAdmin(Admin admin) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);

        return Jwts.builder()
                .setSubject(admin.getEmail())
                .claim("adminId", admin.getId())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SECRET_KEY)
                .compact();
    }

    // User için token üret
    public String generateTokenForUser(User user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);

        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("userId", user.getUserID())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SECRET_KEY)
                .compact();
    }

    // Ortak email alma (her iki tip için de geçerli)
    public String getEmailFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Admin ID'si çıkar
    public Integer getAdminIdFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("adminId", Integer.class);
    }

    // User ID'si çıkar
    public Integer getUserIdFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("userId", Integer.class);
    }

    // Doğrulama
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    
    // Admin token mı?
    public boolean isAdminToken(String token) {
        try {
            var claims = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.get("adminId") != null;
        } catch (Exception e) {
            return false;
        }
    }

    // User token mı?
    public boolean isUserToken(String token) {
        try {
            var claims = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.get("userId") != null;
        } catch (Exception e) {
            return false;
        }
    }

    public CreatorType getUserTypeFromToken(String token) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getUserTypeFromToken'");
    }

    // OAuth2 kullanıcısı için geçici token üret
    public String generateTempToken(Map<String, Object> attributes) {
        OAuth2UserInfo userInfo = OAuth2UserInfo.extract("google", attributes);
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes

        return Jwts.builder()
                .setSubject(userInfo.getEmail())
                .claim("temp", true)
                .claim("firstName", userInfo.getFirstName())
                .claim("lastName", userInfo.getLastName())
                .claim("email", userInfo.getEmail())
                .claim("imageUrl", userInfo.getImageUrl())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SECRET_KEY)
                .compact();
    }

    // Geçici token'dan kullanıcı bilgilerini al
    public OAuth2UserInfo getUserInfoFromTempToken(String token) {
        var claims = Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return OAuth2UserInfo.builder()
                .email(claims.get("email", String.class))
                .firstName(claims.get("firstName", String.class))
                .lastName(claims.get("lastName", String.class))
                .imageUrl(claims.get("imageUrl", String.class))
                .build();
    }

    // Geçici token mı?
    public boolean isTempToken(String token) {
        try {
            var claims = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.get("temp", Boolean.class) != null && 
                   claims.get("temp", Boolean.class);
        } catch (Exception e) {
            return false;
        }
    }
}
