package com.devEra.ws.exception;

import java.util.Collections;
import java.util.Map;

public class NotUniqueEmailException extends RuntimeException {

    public NotUniqueEmailException() {
        super("Validation failed");
    }

    public Map<String, String> getValidationErrors() {
        return Collections.singletonMap("email", "This email address is already in use.");
    }
}
