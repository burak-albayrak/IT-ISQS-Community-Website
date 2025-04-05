package com.devEra.ws.dto.request.Blog;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateBlogRequest {

    @Size(min = 5, max = 255, message = "Title must be between 5 and 255 characters.")
    @NotBlank(message = "Title cannot be blank.")
    private String title;

    @NotBlank(message = "Description cannot be blank.")
    private String description;

    private String media;

    private String category;

    private String owner; 
}
