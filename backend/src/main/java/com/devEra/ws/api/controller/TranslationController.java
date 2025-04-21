package com.devEra.ws.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.devEra.ws.service.TranslationService;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/translations")
@CrossOrigin
public class TranslationController {
    
    @Autowired
    private TranslationService translationService;
    
    @GetMapping("/languages")
    public ResponseEntity<Map<String, String>> getSupportedLanguages() {
        return ResponseEntity.ok(Collections.emptyMap());
    }
    
    @PostMapping("/translate")
    public ResponseEntity<Map<String, String>> translateText(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(Collections.singletonMap("text", request.get("text")));
    }
    
    @PostMapping("/translate-bulk")
    public ResponseEntity<Map<String, String>> translateBulk(@RequestBody Map<String, Object> request) {
        return ResponseEntity.ok(Collections.emptyMap());
    }
} 