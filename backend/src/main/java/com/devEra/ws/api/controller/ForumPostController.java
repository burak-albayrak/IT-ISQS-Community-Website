package com.devEra.ws.api.controller;

import com.devEra.ws.config.security.JwtTokenService;
import com.devEra.ws.core.enums.CreatorType;
import com.devEra.ws.core.error.ApiError;
import com.devEra.ws.core.message.GenericMessage;
import com.devEra.ws.dto.request.Forum.CreateForumPostRequest;
import com.devEra.ws.entity.ForumPost;
import com.devEra.ws.service.ForumPostService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/forum-posts")
@RequiredArgsConstructor
public class ForumPostController {

    private final ForumPostService forumPostService;
    private final JwtTokenService jwtTokenService;

    @PostMapping
    public ResponseEntity<?> createForumPost(@RequestBody CreateForumPostRequest request,
            @RequestHeader("Authorization") String tokenHeader) {
        try {
            String token = tokenHeader.replace("Bearer ", "");
            Integer userId = jwtTokenService.getUserIdFromToken(token);
            forumPostService.createForumPost(request, userId, CreatorType.USER);

            return ResponseEntity.ok(new GenericMessage("Forum post created successfully."));

        } catch (Exception e1) {
            try {
                String token = tokenHeader.replace("Bearer ", "");
                Integer adminId = jwtTokenService.getAdminIdFromToken(token);
                forumPostService.createForumPost(request, adminId, CreatorType.ADMIN);

                return ResponseEntity.ok(new GenericMessage("Forum post created successfully."));
            } catch (Exception e2) {
                ApiError error = new ApiError();
                error.setStatus(401);
                error.setMessage("Invalid or missing token.");
                error.setPath("/api/v1/forum-posts");
                return ResponseEntity.status(401).body(error);
            }
        }
    }

    @GetMapping
    public ResponseEntity<List<ForumPost>> getAllForumPosts() {
        return ResponseEntity.ok(forumPostService.getAllPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getForumPostById(@PathVariable int id) {
        try {
            ForumPost post = forumPostService.getPostById(id);
            return ResponseEntity.ok(post);
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage("Forum post not found.");
            error.setPath("/api/v1/forum-posts/" + id);
            return ResponseEntity.status(404).body(error);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteForumPost(@PathVariable int id,
            @RequestHeader("Authorization") String tokenHeader) {
        String token = tokenHeader.replace("Bearer ", "");

        try {
            // Önce user kontrolü
            Integer userId = jwtTokenService.getUserIdFromToken(token);
            forumPostService.deletePost(id, userId, CreatorType.USER);
            return ResponseEntity.ok(new GenericMessage("Forum post deleted successfully."));

        } catch (Exception e1) {
            try {
                // Ardından admin kontrolü
                Integer adminId = jwtTokenService.getAdminIdFromToken(token);
                forumPostService.deletePost(id, adminId, CreatorType.ADMIN);
                return ResponseEntity.ok(new GenericMessage("Forum post deleted successfully."));
            } catch (Exception e2) {
                ApiError error = new ApiError();
                error.setStatus(403);
                error.setMessage("You are not authorized to delete this forum post.");
                error.setPath("/api/v1/forum-posts/" + id);
                return ResponseEntity.status(403).body(error);
            }
        }
    }
}
