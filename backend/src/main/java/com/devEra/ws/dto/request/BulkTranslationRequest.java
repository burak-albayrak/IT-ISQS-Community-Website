package com.devEra.ws.dto.request;

import lombok.Data;
import java.util.List;

@Data
public class BulkTranslationRequest {
    private List<String> texts;
    private String targetLanguage;
} 