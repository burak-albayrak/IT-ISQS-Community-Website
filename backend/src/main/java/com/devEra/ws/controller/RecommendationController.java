package com.devEra.ws.controller;

import com.devEra.ws.dto.RecommendationResponse;
import com.devEra.ws.service.KNNRecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/recommendations")
public class RecommendationController {

    @Autowired
    private KNNRecommendationService knnRecommendationService;

    @GetMapping("/forum-posts")
    public ResponseEntity<List<RecommendationResponse>> getForumPostRecommendations(
            @AuthenticationPrincipal UserDetails userDetails) {
        // Kullanıcı ID'sini UserDetails'den al
        int userId = Integer.parseInt(userDetails.getUsername());
        List<RecommendationResponse> recommendations = knnRecommendationService.getRecommendations(userId);
        return ResponseEntity.ok(recommendations);
    }
}