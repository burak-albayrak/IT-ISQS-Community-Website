package com.devEra.ws.dto.response.Blog;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BlogResponse {

    private int blogID;

    private String title;

    private String description;

    private String media;

    private String category;

    private int numberOfViews;

    private String createdBy;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
