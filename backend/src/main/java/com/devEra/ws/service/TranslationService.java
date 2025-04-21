package com.devEra.ws.service;

import com.google.cloud.translate.Detection;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class TranslationService {
    private static final Logger logger = LoggerFactory.getLogger(TranslationService.class);
    private final Translate translate;

    public TranslationService() throws IOException {
        // Initialize the translation service
        this.translate = TranslateOptions.getDefaultInstance().getService();
        logger.info("Translation service initialized successfully");
    }

    /**
     * Translates text to the target language.
     * Uses caching to avoid repeated translations of the same text.
     *
     * @param text The text to translate
     * @param targetLanguage The target language code (e.g., "en" for English, "tr" for Turkish)
     * @return The translated text
     */
    @Cacheable(value = "translations", key = "#text + '-' + #targetLanguage")
    public String translateText(String text, String targetLanguage) {
        try {
            if (text == null || text.trim().isEmpty()) {
                return text;
            }

            // Detect the source language
            Detection detection = translate.detect(text);
            String sourceLanguage = detection.getLanguage();
            logger.debug("Detected source language: {}", sourceLanguage);

            // If the text is already in the target language, return it as is
            if (sourceLanguage.equals(targetLanguage)) {
                return text;
            }

            // Perform the translation
            Translation translation = translate.translate(
                text,
                Translate.TranslateOption.sourceLanguage(sourceLanguage),
                Translate.TranslateOption.targetLanguage(targetLanguage)
            );

            logger.info("Translated text from {} to {}", sourceLanguage, targetLanguage);
            return translation.getTranslatedText();

        } catch (Exception e) {
            logger.error("Error translating text: {}", e.getMessage());
            // In case of error, return the original text
            return text;
        }
    }
    
    /**
     * Detects the language of the given text.
     *
     * @param text The text to detect language for
     * @return The detected language code
     */
    public String detectLanguage(String text) {
        try {
            if (text == null || text.trim().isEmpty()) {
                return "en"; // Default to English for empty text
            }

            Detection detection = translate.detect(text);
            String detectedLanguage = detection.getLanguage();
            logger.debug("Detected language: {}", detectedLanguage);
            return detectedLanguage;

        } catch (Exception e) {
            logger.error("Error detecting language: {}", e.getMessage());
            return "en"; // Default to English in case of error
        }
    }
}