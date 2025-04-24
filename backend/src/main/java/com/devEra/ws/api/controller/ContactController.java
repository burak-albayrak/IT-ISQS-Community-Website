package com.devEra.ws.api.controller;

import com.devEra.ws.core.message.GenericMessage;
import com.devEra.ws.dto.request.ContactFormRequest;
import com.devEra.ws.service.EmailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/contact")
@RequiredArgsConstructor
public class ContactController {

    private final EmailService emailService;

    @PostMapping
    public ResponseEntity<GenericMessage> handleContactForm(@Valid @RequestBody ContactFormRequest contactRequest) {
        try {
            emailService.sendContactFormEmail(contactRequest);
            return ResponseEntity.ok(new GenericMessage("Message sent successfully."));
        } catch (Exception e) {
            // Catch exceptions from the email service
            // Consider more specific exception handling and logging
            System.err.println("Controller caught error sending contact email: " + e.getMessage());
            // Return a generic error message to the user
            // You might want to return a more specific error DTO in a real application
            return ResponseEntity.status(500).body(new GenericMessage("Failed to send message. Please try again later."));
        }
    }
} 