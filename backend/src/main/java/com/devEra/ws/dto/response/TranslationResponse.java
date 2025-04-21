package com.devEra.ws.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TranslationResponse {
    private String translatedText;
    private String error;
    
    public static TranslationResponse success(String translatedText) {
        return new TranslationResponse(translatedText, null);
    }
    
    public static TranslationResponse error(String errorMessage) {
        return new TranslationResponse(null, errorMessage);
    }
} 