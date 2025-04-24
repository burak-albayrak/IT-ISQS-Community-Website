package com.devEra.ws.config;

import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;

import java.nio.file.Files;
import java.nio.file.Paths;

@Configuration
public class VisionApiConfig {

    private static final Logger logger = LoggerFactory.getLogger(VisionApiConfig.class);
    private static final String CREDENTIALS_PATH = "src/main/resources/vision-key.json";

    @PostConstruct
    public void initialize() {
        // Credentials are now loaded directly in ImageModerationService.
        // This check is just for informational purposes.
        if (!Files.exists(Paths.get(CREDENTIALS_PATH))) {
             logger.warn("Google Cloud Vision credentials file not found at: {}. ImageModerationService will fail to load credentials.", CREDENTIALS_PATH);
        }
    }
} 