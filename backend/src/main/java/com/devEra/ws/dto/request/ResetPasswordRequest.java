package com.devEra.ws.dto.request;

import lombok.Data;

@Data
public class ResetPasswordRequest {
    private String code;
    private String newPassword;
}
