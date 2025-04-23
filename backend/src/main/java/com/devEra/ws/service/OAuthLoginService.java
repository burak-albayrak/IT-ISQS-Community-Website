package com.devEra.ws.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.devEra.ws.core.enums.AuthProvider;
import com.devEra.ws.dto.auth.OAuth2UserInfo;
import com.devEra.ws.dto.auth.OAuth2UserInfoFactory;
import com.devEra.ws.entity.User;
import com.devEra.ws.repository.UserRepository;

import java.util.Optional;

@Service
public class OAuthLoginService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (Exception ex) {
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        // OAuth2 provider'ı belirle (google, facebook, vb.)
        AuthProvider authProvider = AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId().toUpperCase());
        
        // OAuth2 kullanıcı bilgilerini al
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(authProvider, oAuth2User.getAttributes());
        
        // Email boş ise hata fırlat
        if(oAuth2UserInfo.getEmail() == null || oAuth2UserInfo.getEmail().isEmpty()) {
            throw new OAuth2AuthenticationException("Email not found from OAuth2 provider");
        }

        // Debug - kullanıcı bilgilerini görüntüle
        System.out.println("OAuth2 User Info: " + oAuth2UserInfo.getAttributes());

        // Email ile kullanıcı var mı kontrol et
        Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());
        User user;
        
        if(userOptional.isPresent()) {
            // Kullanıcı varsa güncelle
            user = userOptional.get();
            
            // Farklı provider ile giriş yapıldıysa hata fırlat
            if(!user.getAuthProvider().equals(authProvider)) {
                throw new OAuth2AuthenticationException(
                        "You've signed up with " + user.getAuthProvider() + " account. Please use your " + user.getAuthProvider() + " account to login."
                );
            }
            
            // Kullanıcı bilgilerini güncelle
            user = updateExistingUser(user, oAuth2UserInfo);
        } else {
            // Kullanıcı yoksa yeni kullanıcı oluştur
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }
        
        // OAuth2User nesnesi döndür
        return oAuth2User;
    }

    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        User user = new User();

        try {
            user.setAuthProvider(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId().toUpperCase()));
            user.setProviderId(oAuth2UserInfo.getId());
            user.setFirstName(oAuth2UserInfo.getName() != null ? oAuth2UserInfo.getName() : "Google User");
            user.setLastName("");
            user.setEmail(oAuth2UserInfo.getEmail());
            user.setPassword("Google" + System.currentTimeMillis()); // Güvenli random şifre
            user.setPicture(oAuth2UserInfo.getImageUrl());
            user.setIsActive(true); // Google ile giriş yapan kullanıcılar otomatik aktif
            
            // Debug bilgisi
            System.out.println("Registering new user: " + user.getEmail());
            
            return userRepository.save(user);
        } catch (Exception e) {
            System.err.println("Error registering new user: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
        try {
            existingUser.setFirstName(oAuth2UserInfo.getName() != null ? oAuth2UserInfo.getName() : existingUser.getFirstName());
            if (oAuth2UserInfo.getImageUrl() != null) {
                existingUser.setPicture(oAuth2UserInfo.getImageUrl());
            }
            
            // Debug bilgisi
            System.out.println("Updating existing user: " + existingUser.getEmail());
            
            return userRepository.save(existingUser);
        } catch (Exception e) {
            System.err.println("Error updating existing user: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
} 