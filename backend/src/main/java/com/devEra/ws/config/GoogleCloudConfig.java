package com.devEra.ws.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.vision.v1.ImageAnnotatorClient;
import com.google.cloud.vision.v1.ImageAnnotatorSettings;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;

@Configuration
public class GoogleCloudConfig {

    private static final String CREDENTIALS_PATH = "vision-key.json";

    @Bean
    public GoogleCredentials googleCredentials() throws IOException {
        ClassPathResource resource = new ClassPathResource(CREDENTIALS_PATH);
        return GoogleCredentials.fromStream(resource.getInputStream());
    }

    @Bean
    public ImageAnnotatorClient imageAnnotatorClient(GoogleCredentials credentials) throws IOException {
        ImageAnnotatorSettings settings = ImageAnnotatorSettings.newBuilder()
            .setCredentialsProvider(() -> credentials)
            .build();
        return ImageAnnotatorClient.create(settings);
    }

    @Bean
    public Translate translateService(GoogleCredentials credentials) {
        return TranslateOptions.newBuilder()
            .setCredentials(credentials)
            .build()
            .getService();
    }
} 