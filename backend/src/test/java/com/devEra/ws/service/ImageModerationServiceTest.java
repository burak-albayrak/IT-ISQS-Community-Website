package com.devEra.ws.service;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.io.InputStream;

import static org.junit.jupiter.api.Assertions.*;

// Bu test, Google Cloud Vision API'ye gerçek istekler gönderir.
// Çalıştırmak için geçerli `vision-key.json` dosyasının `src/main/resources` altında olması
// ve Google Cloud projesinde Vision API'nin etkin olması gerekir.
// API çağrıları ücretli olabileceğinden dikkatli kullanılmalıdır.
@SpringBootTest
class ImageModerationServiceTest {

    private static final Logger logger = LoggerFactory.getLogger(ImageModerationServiceTest.class);

    @Autowired
    private ImageModerationService imageModerationService;

    private byte[] loadImage(String path) throws IOException {
        logger.info("Loading test image from classpath: {}", path);
        ClassPathResource resource = new ClassPathResource(path);
        if (!resource.exists()) {
            logger.error("Test image not found at classpath: {}", path);
            throw new IOException("Test image not found: " + path);
        }
        try (InputStream inputStream = resource.getInputStream()) {
            return StreamUtils.copyToByteArray(inputStream);
        }
    }

    // Test çalıştırmadan önce src/test/resources altına 'safe-test-image.jpg' eklediğinizden emin olun.
    @Test
    //@Disabled("Enable this test only when needed to avoid API costs and ensure credentials are set up.")
    void testSafeImage() throws IOException {
        byte[] imageData = loadImage("safe-test-image.jpg");
        logger.info("Testing safe image ({} bytes)...", imageData.length);
        boolean isSafe = imageModerationService.isImageSafe(imageData);
        logger.info("Safe image test result: isSafe={}", isSafe);
        assertTrue(isSafe, "Expected the safe test image to be classified as safe.");
    }

    // Test çalıştırmadan önce src/test/resources altına 'unsafe-test-image.jpg' eklediğinizden emin olun.
    @Test
    //@Disabled("Enable this test only when needed to avoid API costs and ensure credentials are set up.")
    void testUnsafeImage() throws IOException {
        byte[] imageData = loadImage("unsafe-test-image.jpg");
        logger.info("Testing unsafe image ({} bytes)...", imageData.length);
        boolean isSafe = imageModerationService.isImageSafe(imageData);
        logger.info("Unsafe image test result: isSafe={}", isSafe);
        assertFalse(isSafe, "Expected the unsafe test image to be classified as unsafe.");
    }
} 