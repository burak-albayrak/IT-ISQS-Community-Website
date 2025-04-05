package com.devEra.ws.dto.request.Blog;

import lombok.Data;

@Data
public class UpdateBlogRequest {

    private String title;

    private String description;

    private String media;

    private String category;

    private String owner;
}
