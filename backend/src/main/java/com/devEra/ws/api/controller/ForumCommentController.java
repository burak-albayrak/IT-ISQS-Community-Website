package com.devEra.ws.api.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.devEra.ws.config.security.JwtTokenService;
import com.devEra.ws.core.enums.CreatorType;
import com.devEra.ws.core.error.ApiError;
import com.devEra.ws.core.message.GenericMessage;
import com.devEra.ws.dto.request.Forum.CreateForumCommentRequest;
import com.devEra.ws.dto.response.Forum.ForumCommentResponse;
import com.devEra.ws.service.ForumCommentService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/forum-comments")
@RequiredArgsConstructor
public class ForumCommentController {

    private final ForumCommentService commentService;
    private final JwtTokenService jwtTokenService;
    
    /**
     * Yeni bir forum yorumu oluşturur
     */
    @PostMapping
    public ResponseEntity<?> createComment(
            @Valid @RequestBody CreateForumCommentRequest request,
            @RequestHeader("Authorization") String tokenHeader) {
        
        try {
            String token = tokenHeader.replace("Bearer ", "");
            Integer userId;
            CreatorType creatorType;
            
            // Kullanıcı tipini belirle (USER veya ADMIN)
            if (jwtTokenService.isAdminToken(token)) {
                userId = jwtTokenService.getAdminIdFromToken(token);
                creatorType = CreatorType.ADMIN;
            } else {
                userId = jwtTokenService.getUserIdFromToken(token);
                creatorType = CreatorType.USER;
            }
            
            // Yorumu oluştur
            int commentId = commentService.createComment(request, userId, creatorType);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Comment created successfully.");
            response.put("commentId", commentId);
            
            return ResponseEntity.ok(response);
            
        } catch (IllegalArgumentException e) {
            ApiError error = new ApiError();
            error.setStatus(400);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/forum-comments");
            return ResponseEntity.status(400).body(error);
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/forum-comments");
            return ResponseEntity.status(404).body(error);
        } catch (Exception e) {
            ApiError error = new ApiError();
            error.setStatus(401);
            error.setMessage("Invalid or missing token: " + e.getMessage());
            error.setPath("/api/v1/forum-comments");
            return ResponseEntity.status(401).body(error);
        }
    }
    
    /**
     * Yorumu günceller
     */
    @PutMapping("/{commentId}")
    public ResponseEntity<?> updateComment(
            @PathVariable int commentId,
            @RequestParam String description,
            @RequestHeader("Authorization") String tokenHeader) {
        
        try {
            String token = tokenHeader.replace("Bearer ", "");
            Integer userId;
            CreatorType userType;
            
            // Kullanıcı tipini belirle (USER veya ADMIN)
            if (jwtTokenService.isAdminToken(token)) {
                userId = jwtTokenService.getAdminIdFromToken(token);
                userType = CreatorType.ADMIN;
            } else {
                userId = jwtTokenService.getUserIdFromToken(token);
                userType = CreatorType.USER;
            }
            
            commentService.updateComment(commentId, description, userId, userType);
            return ResponseEntity.ok(new GenericMessage("Comment updated successfully."));
            
        } catch (SecurityException e) {
            ApiError error = new ApiError();
            error.setStatus(403);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/forum-comments/" + commentId);
            return ResponseEntity.status(403).body(error);
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/forum-comments/" + commentId);
            return ResponseEntity.status(404).body(error);
        } catch (Exception e) {
            ApiError error = new ApiError();
            error.setStatus(401);
            error.setMessage("Invalid or missing token: " + e.getMessage());
            error.setPath("/api/v1/forum-comments/" + commentId);
            return ResponseEntity.status(401).body(error);
        }
    }
    
    /**
     * Yorumu siler
     */
    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(
            @PathVariable int commentId,
            @RequestHeader("Authorization") String tokenHeader) {
        
        try {
            String token = tokenHeader.replace("Bearer ", "");
            Integer userId;
            CreatorType userType;
            
            // Kullanıcı tipini belirle (USER veya ADMIN)
            if (jwtTokenService.isAdminToken(token)) {
                userId = jwtTokenService.getAdminIdFromToken(token);
                userType = CreatorType.ADMIN;
            } else {
                userId = jwtTokenService.getUserIdFromToken(token);
                userType = CreatorType.USER;
            }
            
            commentService.deleteComment(commentId, userId, userType);
            return ResponseEntity.ok(new GenericMessage("Comment deleted successfully."));
            
        } catch (SecurityException e) {
            ApiError error = new ApiError();
            error.setStatus(403);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/forum-comments/" + commentId);
            return ResponseEntity.status(403).body(error);
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/forum-comments/" + commentId);
            return ResponseEntity.status(404).body(error);
        } catch (Exception e) {
            ApiError error = new ApiError();
            error.setStatus(401);
            error.setMessage("Invalid or missing token: " + e.getMessage());
            error.setPath("/api/v1/forum-comments/" + commentId);
            return ResponseEntity.status(401).body(error);
        }
    }
    
    /**
     * Yorumu beğenme/beğeni kaldırma
     */
    @PostMapping("/{commentId}/like")
    public ResponseEntity<?> likeComment(
            @PathVariable int commentId,
            @RequestHeader("Authorization") String tokenHeader) {
        
        try {
            String token = tokenHeader.replace("Bearer ", "");
            Integer userId;
            CreatorType userType;
            
            // Kullanıcı tipini belirle (USER veya ADMIN)
            if (jwtTokenService.isAdminToken(token)) {
                userId = jwtTokenService.getAdminIdFromToken(token);
                userType = CreatorType.ADMIN;
            } else {
                userId = jwtTokenService.getUserIdFromToken(token);
                userType = CreatorType.USER;
            }
            
            boolean isLiked = commentService.toggleLikeComment(commentId, userId, userType);
            String message = isLiked ? "Comment liked successfully." : "Comment like removed successfully.";
            
            return ResponseEntity.ok(new GenericMessage(message));
            
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/forum-comments/" + commentId + "/like");
            return ResponseEntity.status(404).body(error);
        } catch (Exception e) {
            ApiError error = new ApiError();
            error.setStatus(401);
            error.setMessage("Invalid or missing token: " + e.getMessage());
            error.setPath("/api/v1/forum-comments/" + commentId + "/like");
            return ResponseEntity.status(401).body(error);
        }
    }
    
    /**
     * Bir forum gönderisine ait tüm ana yorumları getirir
     */
    @GetMapping("/post/{postId}/main")
    public ResponseEntity<?> getMainCommentsByPostId(
            @PathVariable int postId,
            @RequestHeader(value = "Authorization", required = false) String tokenHeader) {
        
        Integer userId = null;
        CreatorType userType = null;
        
        // Token varsa kullanıcı bilgilerini al
        if (tokenHeader != null && !tokenHeader.isEmpty()) {
            try {
                String token = tokenHeader.replace("Bearer ", "");
                
                if (jwtTokenService.isAdminToken(token)) {
                    userId = jwtTokenService.getAdminIdFromToken(token);
                    userType = CreatorType.ADMIN;
                } else {
                    userId = jwtTokenService.getUserIdFromToken(token);
                    userType = CreatorType.USER;
                }
            } catch (Exception e) {
                // Token geçersizse kullanıcı bilgisi olmadan devam et
            }
        }
        
        try {
            List<ForumCommentResponse> comments = commentService.getMainCommentsByPostId(postId, userId, userType);
            return ResponseEntity.ok(comments);
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/forum-comments/post/" + postId + "/main");
            return ResponseEntity.status(404).body(error);
        }
    }
    
    /**
     * Bir yoruma ait tüm yanıtları getirir
     */
    @GetMapping("/{commentId}/replies")
    public ResponseEntity<?> getRepliesByParentCommentId(
            @PathVariable int commentId,
            @RequestHeader(value = "Authorization", required = false) String tokenHeader) {
        
        Integer userId = null;
        CreatorType userType = null;
        
        // Token varsa kullanıcı bilgilerini al
        if (tokenHeader != null && !tokenHeader.isEmpty()) {
            try {
                String token = tokenHeader.replace("Bearer ", "");
                
                if (jwtTokenService.isAdminToken(token)) {
                    userId = jwtTokenService.getAdminIdFromToken(token);
                    userType = CreatorType.ADMIN;
                } else {
                    userId = jwtTokenService.getUserIdFromToken(token);
                    userType = CreatorType.USER;
                }
            } catch (Exception e) {
                // Token geçersizse kullanıcı bilgisi olmadan devam et
            }
        }
        
        try {
            List<ForumCommentResponse> replies = commentService.getRepliesByParentCommentId(commentId, userId, userType);
            return ResponseEntity.ok(replies);
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/forum-comments/" + commentId + "/replies");
            return ResponseEntity.status(404).body(error);
        }
    }
    
    /**
     * Bir forum gönderisine ait tüm yorumları hiyerarşik olarak getirir
     */
    @GetMapping("/post/{postId}/all")
    public ResponseEntity<?> getAllCommentsByPostIdHierarchical(
            @PathVariable int postId,
            @RequestHeader(value = "Authorization", required = false) String tokenHeader) {
        
        Integer userId = null;
        CreatorType userType = null;
        
        // Token varsa kullanıcı bilgilerini al
        if (tokenHeader != null && !tokenHeader.isEmpty()) {
            try {
                String token = tokenHeader.replace("Bearer ", "");
                
                if (jwtTokenService.isAdminToken(token)) {
                    userId = jwtTokenService.getAdminIdFromToken(token);
                    userType = CreatorType.ADMIN;
                } else {
                    userId = jwtTokenService.getUserIdFromToken(token);
                    userType = CreatorType.USER;
                }
            } catch (Exception e) {
                // Token geçersizse kullanıcı bilgisi olmadan devam et
            }
        }
        
        try {
            List<ForumCommentResponse> comments = commentService.getAllCommentsByPostIdHierarchical(postId, userId, userType);
            return ResponseEntity.ok(comments);
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/forum-comments/post/" + postId + "/all");
            return ResponseEntity.status(404).body(error);
        }
    }
} 