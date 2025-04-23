package com.devEra.ws.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BulkTranslationResponse {
    private Map<String, String> translations;
    private List<String> errors;
    
    public static BulkTranslationResponse success(Map<String, String> translations) {
        return new BulkTranslationResponse(translations, null);
    }
    
    public static BulkTranslationResponse error(List<String> errors) {
        return new BulkTranslationResponse(null, errors);
    }
} 