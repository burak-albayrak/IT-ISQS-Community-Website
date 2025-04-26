package com.devEra.ws.dto.request;

import com.devEra.ws.core.enums.Gender;
import com.devEra.ws.core.enums.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CompleteRegistrationRequest {
    @NotBlank
    private String password;
    
    @NotNull
    private Gender gender;
    
    @NotNull
    private Integer age;
    
    private String institution;
    private String country;
    private Role role;
} 