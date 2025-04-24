package com.devEra.ws.dto.request;

import lombok.Data;

@Data
public class TranslationRequest {
    private String text;
    private String targetLanguage;
} 