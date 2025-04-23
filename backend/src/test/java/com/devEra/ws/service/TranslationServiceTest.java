package com.devEra.ws.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class TranslationServiceTest {

    @Autowired
    private TranslationService translationService;

    @Test
    public void testEnglishToTurkishTranslation() {
        String englishText = "Hello, how are you?";
        String translatedText = translationService.translateText(englishText, "tr");
        
        assertNotNull(translatedText);
        assertNotEquals(englishText, translatedText);
        // Expected Turkish translation: "Merhaba, nasılsın?"
    }

    @Test
    public void testEnglishToSpanishTranslation() {
        String englishText = "Welcome to our community";
        String translatedText = translationService.translateText(englishText, "es");
        
        assertNotNull(translatedText);
        assertNotEquals(englishText, translatedText);
        // Expected Spanish translation: "Bienvenido a nuestra comunidad"
    }

    @Test
    public void testLanguageDetection() {
        String turkishText = "Merhaba dünya";
        String detectedLanguage = translationService.detectLanguage(turkishText);
        
        assertEquals("tr", detectedLanguage);
    }
} 