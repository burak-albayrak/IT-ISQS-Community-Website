package com.devEra.ws.security.oauth2;

import com.devEra.ws.entity.User;
import com.devEra.ws.repository.UserRepository;
import com.devEra.ws.core.enums.AuthProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = super.loadUser(userRequest);
        
        try {
            Map<String, Object> attributes = oauth2User.getAttributes();
            String email = (String) attributes.get("email");
            String name = (String) attributes.get("name");
            String picture = (String) attributes.get("picture");

            // Google genellikle tam adı tek bir string olarak döndürür
            String[] nameParts = name != null ? name.split(" ") : new String[]{"", ""};
            String firstName = nameParts.length > 0 ? nameParts[0] : "";
            // Soyad için kalan tüm parçaları birleştir
            String lastName = nameParts.length > 1 ? 
                String.join(" ", java.util.Arrays.copyOfRange(nameParts, 1, nameParts.length)) : "";

            User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    // Yeni kullanıcı oluştur
                    User newUser = new User();
                    newUser.setEmail(email);
                    newUser.setFirstName(firstName);
                    newUser.setLastName(lastName);
                    newUser.setPicture(picture);
                    newUser.setAuthProvider(AuthProvider.GOOGLE);
                    newUser.setIsActive(true); // Google ile gelen email zaten doğrulanmış
                    newUser.setIsBlocked(false);
                    // Geçici bir şifre ata (daha sonra kullanıcı değiştirecek)
                    newUser.setPassword("TEMP_" + java.util.UUID.randomUUID().toString());
                    return newUser;
                });

            // Kullanıcıyı kaydet veya güncelle
            user = userRepository.save(user);
            
            // OAuth2User'ı döndür
            return oauth2User;

        } catch (Exception ex) {
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }
} 