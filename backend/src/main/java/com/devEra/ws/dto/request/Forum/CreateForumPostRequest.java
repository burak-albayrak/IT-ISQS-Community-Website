package com.devEra.ws.dto.request.Forum;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateForumPostRequest {

    @NotBlank(message = "Title cannot be blank.")
    @Size(min = 5, max = 255, message = "Title must be between 5 and 255 characters.")
    private String title;

    @NotBlank(message = "Description cannot be blank.")
    private String description;

    private String media; // optional – UI'da boş bırakılabilir
}
