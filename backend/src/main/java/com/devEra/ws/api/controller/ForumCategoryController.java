package com.devEra.ws.api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devEra.ws.config.security.JwtTokenService;
import com.devEra.ws.core.enums.CreatorType;
import com.devEra.ws.core.error.ApiError;
import com.devEra.ws.core.message.GenericMessage;
import com.devEra.ws.entity.Forum.ForumCategory;
import com.devEra.ws.service.ForumCategoryService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/forum-categories")
@RequiredArgsConstructor
public class ForumCategoryController {

    private final ForumCategoryService categoryService;
    private final JwtTokenService jwtTokenService;
    
    /**
     * Tüm kategorileri listeler
     */
    @GetMapping
    public ResponseEntity<?> getAllCategories() {
        List<ForumCategory> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
    
    /**
     * ID'ye göre kategori getirir
     */
    @GetMapping("/{categoryId}")
    public ResponseEntity<?> getCategoryById(@PathVariable int categoryId) {
        try {
            ForumCategory category = categoryService.getCategoryById(categoryId);
            return ResponseEntity.ok(category);
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/forum-categories/" + categoryId);
            return ResponseEntity.status(404).body(error);
        }
    }
    
    /**
     * Yeni kategori oluşturur (Sadece admin yetkisi gerektirir)
     */
    @PostMapping
    public ResponseEntity<?> createCategory(
            @Valid @RequestBody ForumCategory category,
            @org.springframework.web.bind.annotation.RequestHeader("Authorization") String tokenHeader) {
        try {
            // Admin yetkisi kontrolü
            String token = tokenHeader.replace("Bearer ", "");
            if (!jwtTokenService.isAdminToken(token)) {
                ApiError error = new ApiError();
                error.setStatus(403);
                error.setMessage("Only admins can create categories");
                error.setPath("/api/v1/forum-categories");
                return ResponseEntity.status(403).body(error);
            }
            
            ForumCategory createdCategory = categoryService.createCategory(category);
            return ResponseEntity.ok(createdCategory);
        } catch (Exception e) {
            ApiError error = new ApiError();
            error.setStatus(400);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/forum-categories");
            return ResponseEntity.status(400).body(error);
        }
    }
    
    /**
     * Kategori günceller (Sadece admin yetkisi gerektirir)
     */
    @PutMapping("/{categoryId}")
    public ResponseEntity<?> updateCategory(
            @PathVariable int categoryId,
            @Valid @RequestBody ForumCategory category,
            @org.springframework.web.bind.annotation.RequestHeader("Authorization") String tokenHeader) {
        try {
            // Admin yetkisi kontrolü
            String token = tokenHeader.replace("Bearer ", "");
            if (!jwtTokenService.isAdminToken(token)) {
                ApiError error = new ApiError();
                error.setStatus(403);
                error.setMessage("Only admins can update categories");
                error.setPath("/api/v1/forum-categories/" + categoryId);
                return ResponseEntity.status(403).body(error);
            }
            
            ForumCategory updatedCategory = categoryService.updateCategory(categoryId, category);
            return ResponseEntity.ok(updatedCategory);
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/forum-categories/" + categoryId);
            return ResponseEntity.status(404).body(error);
        } catch (Exception e) {
            ApiError error = new ApiError();
            error.setStatus(400);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/forum-categories/" + categoryId);
            return ResponseEntity.status(400).body(error);
        }
    }
    
    /**
     * Kategori siler (Sadece admin yetkisi gerektirir)
     */
    @DeleteMapping("/{categoryId}")
    public ResponseEntity<?> deleteCategory(
            @PathVariable int categoryId,
            @org.springframework.web.bind.annotation.RequestHeader("Authorization") String tokenHeader) {
        try {
            // Admin yetkisi kontrolü
            String token = tokenHeader.replace("Bearer ", "");
            if (!jwtTokenService.isAdminToken(token)) {
                ApiError error = new ApiError();
                error.setStatus(403);
                error.setMessage("Only admins can delete categories");
                error.setPath("/api/v1/forum-categories/" + categoryId);
                return ResponseEntity.status(403).body(error);
            }
            
            categoryService.deleteCategory(categoryId);
            return ResponseEntity.ok(new GenericMessage("Category deleted successfully."));
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/forum-categories/" + categoryId);
            return ResponseEntity.status(404).body(error);
        } catch (Exception e) {
            ApiError error = new ApiError();
            error.setStatus(400);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/forum-categories/" + categoryId);
            return ResponseEntity.status(400).body(error);
        }
    }
} 