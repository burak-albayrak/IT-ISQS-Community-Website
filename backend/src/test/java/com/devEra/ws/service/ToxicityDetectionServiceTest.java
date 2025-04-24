package com.devEra.ws.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Map;

@SpringBootTest
public class ToxicityDetectionServiceTest {

    @Autowired
    private ToxicityDetectionService toxicityDetectionService;

    @Test
    public void testNormalText() {
        String text = "Hello, this is a normal comment about the topic.";
        Map<String, Object> result = toxicityDetectionService.checkToxicity(text);
        
        assertFalse((Boolean) result.get("is_toxic"));
        assertTrue(((Number) result.get("toxic_score")).doubleValue() < 30.0);
    }

    @Test
    public void testToxicText() {
        String text = "You are an idiot! I hate you!";
        Map<String, Object> result = toxicityDetectionService.checkToxicity(text);
        
        assertTrue((Boolean) result.get("is_toxic"));
        assertTrue(((Number) result.get("toxic_score")).doubleValue() > 30.0);
    }
} 