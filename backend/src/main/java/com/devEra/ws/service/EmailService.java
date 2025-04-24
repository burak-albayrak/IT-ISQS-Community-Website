package com.devEra.ws.service;

import com.devEra.ws.dto.request.ContactFormRequest;

public interface EmailService {
    void sendContactFormEmail(ContactFormRequest contactRequest);
} 