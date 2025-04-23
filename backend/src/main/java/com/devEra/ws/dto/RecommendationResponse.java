package com.devEra.ws.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecommendationResponse {
    private int forumPostId;
    private String title;
    private int categoryId;
    private String categoryName;
    private int likesCount;
    private int commentCount;
    private double similarityScore;
}