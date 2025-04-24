package com.devEra.ws.config.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.devEra.ws.core.enums.CreatorType;
import com.devEra.ws.entity.Admin;
import com.devEra.ws.entity.User;
import com.devEra.ws.repository.UserRepository;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class JwtTokenService {

    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 24 saat
    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private static final long TOKEN_VALIDITY_TIME = 1000 * 60 * 60 * 24; // 24 saat

    private final UserRepository userRepository;

    public JwtTokenService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

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

    /**
     * OAuth2 kimlik doğrulama nesnesinden JWT token oluşturur
     * 
     * @param authentication OAuth2 kimlik doğrulama nesnesi
     * @return JWT token
     */
    public String generateTokenFromAuthentication(Authentication authentication) {
        Object principal = authentication.getPrincipal();
        Map<String, Object> claims = new HashMap<>();
        
        if (principal instanceof OAuth2User) {
            OAuth2User oauth2User = (OAuth2User) principal;
            String email = oauth2User.getAttribute("email");
            
            // Email'e göre kullanıcıyı bul
            Optional<User> userOptional = userRepository.findByEmail(email);
            
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                
                // User Claim'lerini ekle
                claims.put("userId", user.getUserID());
                claims.put("email", user.getEmail());
                claims.put("name", user.getFirstName() + " " + user.getLastName());
                claims.put("role", "USER");
                
                return Jwts.builder()
                        .setClaims(claims)
                        .setIssuedAt(new Date())
                        .setExpiration(new Date(System.currentTimeMillis() + TOKEN_VALIDITY_TIME))
                        .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                        .compact();
            }
        }
        
        throw new RuntimeException("OAuth2 authentication failed");
    }

    private Key getSigningKey() {
        return SECRET_KEY;
    }
}
