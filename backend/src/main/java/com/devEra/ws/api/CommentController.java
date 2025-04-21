package com.devEra.ws.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.devEra.ws.service.ToxicityDetectionService;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/comments")
@CrossOrigin
public class CommentController {

    @Autowired
    private ToxicityDetectionService toxicityService;

    @PostMapping("/check-toxicity")
    public ResponseEntity<?> checkToxicity(@RequestBody Map<String, String> request) {
        try {
            String commentText = request.get("text");
            Map<String, Object> result = toxicityService.checkToxicity(commentText);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
} 