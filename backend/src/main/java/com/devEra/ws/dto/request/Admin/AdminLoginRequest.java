package com.devEra.ws.dto.request.Admin;

import lombok.Data;

@Data
public class AdminLoginRequest {
    private String email;
    private String password;
}