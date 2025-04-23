package com.devEra.ws.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.io.ClassPathResource;
import static org.junit.jupiter.api.Assertions.*;

import java.io.IOException;
import java.nio.file.Files;

@SpringBootTest
public class ImageModerationServiceTest {

    @Autowired
    private ImageModerationService imageModerationService;

    @Test
    public void testSafeImage() throws IOException {
        // Test klasöründe src/test/resources/test-images/safe-image.jpg dosyasını kullan
        ClassPathResource resource = new ClassPathResource("test-images/safe-image.jpg");
        byte[] imageData = Files.readAllBytes(resource.getFile().toPath());
        
        boolean result = imageModerationService.isImageSafe(imageData);
        assertTrue(result, "Safe image should be approved");
    }

    @Test
    public void testUnsafeImage() throws IOException {
        // Test klasöründe src/test/resources/test-images/unsafe-image.jpg dosyasını kullan
        ClassPathResource resource = new ClassPathResource("test-images/unsafe-image.jpg");
        byte[] imageData = Files.readAllBytes(resource.getFile().toPath());
        
        boolean result = imageModerationService.isImageSafe(imageData);
        assertFalse(result, "Unsafe image should be rejected");
    }

    @Test
    public void testInvalidImage() {
        byte[] invalidImageData = "not an image".getBytes();
        
        assertThrows(IOException.class, () -> {
            imageModerationService.isImageSafe(invalidImageData);
        });
    }
} 