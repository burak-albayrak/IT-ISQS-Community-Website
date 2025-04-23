package com.devEra.ws.dto.auth;

import java.util.Map;

import com.devEra.ws.core.enums.AuthProvider;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;

public class OAuth2UserInfoFactory {
    
    public static OAuth2UserInfo getOAuth2UserInfo(AuthProvider authProvider, Map<String, Object> attributes) {
        switch (authProvider) {
            case GOOGLE:
                return new GoogleOAuth2UserInfo(attributes);
            default:
                throw new OAuth2AuthenticationException("Login with " + authProvider + " is not supported yet.");
        }
    }
} 