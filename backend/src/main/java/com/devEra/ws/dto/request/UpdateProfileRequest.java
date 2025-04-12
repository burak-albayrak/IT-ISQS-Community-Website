package com.devEra.ws.dto.request;

import com.devEra.ws.core.enums.Gender;
import com.devEra.ws.core.enums.Role;
import lombok.Data;

@Data
public class UpdateProfileRequest {

    private String firstName;
    private String lastName;
    private String institution;
    private String country;
    private Role role;
    private Integer age;
    private Gender gender;
    private String picture;
}