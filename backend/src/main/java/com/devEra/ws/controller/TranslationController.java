package com.devEra.ws.controller;

import com.devEra.ws.service.TranslationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/translate")
@CrossOrigin
public class TranslationController {

    private final TranslationService translationService;

    @Autowired
    public TranslationController(TranslationService translationService) {
        this.translationService = translationService;
    }

    @PostMapping
    public ResponseEntity<String> translateText(
            @RequestBody String text,
            @RequestParam String targetLanguage) {
        String translatedText = translationService.translateText(text, targetLanguage);
        return ResponseEntity.ok(translatedText);
    }

    @PostMapping("/detect")
    public ResponseEntity<String> detectLanguage(@RequestBody String text) {
        String detectedLanguage = translationService.detectLanguage(text);
        return ResponseEntity.ok(detectedLanguage);
    }
} 