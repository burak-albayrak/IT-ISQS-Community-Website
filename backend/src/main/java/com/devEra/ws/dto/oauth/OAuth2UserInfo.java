package com.devEra.ws.dto.oauth;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class OAuth2UserInfo {
    private String email;
    private String firstName;
    private String lastName;
    private String imageUrl;

    public static OAuth2UserInfo extract(String registrationId, Map<String, Object> attributes) {
        if ("google".equals(registrationId)) {
            String email = (String) attributes.get("email");
            String name = (String) attributes.get("name");
            String picture = (String) attributes.get("picture");
            
            // Google genellikle tam adı tek bir string olarak döndürür
            String[] nameParts = name != null ? name.split(" ") : new String[]{"", ""};
            String firstName = nameParts.length > 0 ? nameParts[0] : "";
            // Soyad için kalan tüm parçaları birleştir
            String lastName = nameParts.length > 1 ? 
                String.join(" ", java.util.Arrays.copyOfRange(nameParts, 1, nameParts.length)) : "";

            return OAuth2UserInfo.builder()
                    .email(email)
                    .firstName(firstName)
                    .lastName(lastName)
                    .imageUrl(picture)
                    .build();
        }
        
        throw new IllegalArgumentException("Unsupported OAuth2 provider: " + registrationId);
    }
} 