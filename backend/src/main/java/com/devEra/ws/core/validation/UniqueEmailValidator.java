package com.devEra.ws.core.validation;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.devEra.ws.entity.User;
import com.devEra.ws.repository.UserRepository;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;


public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {

    @Autowired
    UserRepository userRepository;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {

        Optional<User> indDb = userRepository.findByEmail(value);
        
        return (indDb == null);
    }
    
}
