package com.devEra.ws.api.controller;

import com.devEra.ws.config.security.JwtTokenService;
import com.devEra.ws.core.error.ApiError;
import com.devEra.ws.core.message.GenericMessage;
import com.devEra.ws.dto.request.Blog.CreateBlogRequest;
import com.devEra.ws.dto.request.Blog.UpdateBlogRequest;
import com.devEra.ws.entity.Blog;
import com.devEra.ws.service.BlogService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/v1/blogs")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;
    private final JwtTokenService jwtTokenService;

    // 1. Blog oluştur (Admin)
    @PostMapping("/create")
    public ResponseEntity<GenericMessage> createBlog(
            @RequestBody CreateBlogRequest request,
            @RequestHeader("Authorization") String tokenHeader) {

        String token = tokenHeader.replace("Bearer ", "");
        int adminId = jwtTokenService.getAdminIdFromToken(token);

        blogService.createBlog(request, adminId);
        return ResponseEntity.ok(new GenericMessage("Blog created successfully."));
    }

    // 2. Tüm blogları getir (Public)
    @GetMapping
    public ResponseEntity<List<Blog>> getAllBlogs() {
        return ResponseEntity.ok(blogService.getAllBlogs());
    }

    // 3. ID'ye göre blog getir (her seferinde görüntülenme artar)
    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable int id) {
        return ResponseEntity.ok(blogService.getBlogById(id));
    }

    // 4. Blog güncelle (Admin)
    @PutMapping("/{id}")
    public ResponseEntity<GenericMessage> updateBlog(
            @PathVariable int id,
            @RequestBody UpdateBlogRequest request,
            @RequestHeader("Authorization") String tokenHeader) {

        String token = tokenHeader.replace("Bearer ", "");
        int adminId = jwtTokenService.getAdminIdFromToken(token);

        blogService.updateBlog(id, request, adminId);
        return ResponseEntity.ok(new GenericMessage("Blog updated successfully."));
    }

    // 5. Blog sil (Admin)
    @DeleteMapping("/{id}")
    public ResponseEntity<GenericMessage> deleteBlog(
            @PathVariable int id,
            @RequestHeader("Authorization") String tokenHeader) {

        String token = tokenHeader.replace("Bearer ", "");
        int adminId = jwtTokenService.getAdminIdFromToken(token);

        blogService.deleteBlog(id, adminId);
        return ResponseEntity.ok(new GenericMessage("Blog deleted successfully."));
    }
    
    // 6. Blog kategorilerini getir
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        // Blog kategorileri
        List<String> categories = Arrays.asList(
            "ARVR",
            "Blockchain",
            "CloudComputing",
            "Cybersecurity",
            "DataScience",
            "DatabaseManagement",
            "DevOps",
            "EmbeddedSystems",
            "GameDevelopment",
            "MachineLearning",
            "MobileDevelopment",
            "OpenSource",
            "ProjectManagement",
            "QAStandards",
            "SoftwareArchitecture",
            "SoftwareTesting",
            "TestPlanning",
            "WebDevelopment"
        );
        
        return ResponseEntity.ok(categories);
    }

    // 🔴 NOT FOUND HATASI
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ApiError> handleEntityNotFound(EntityNotFoundException exception) {
        ApiError error = new ApiError();
        error.setStatus(404);
        error.setMessage(exception.getMessage());
        error.setPath("/api/v1/blogs");
        error.setValidationErrors(new HashMap<>());
        return ResponseEntity.status(404).body(error);
    }


    // JWT HATASI
    @ExceptionHandler(io.jsonwebtoken.JwtException.class)
    public ResponseEntity<ApiError> handleJwtException(io.jsonwebtoken.JwtException exception) {
        ApiError error = new ApiError();
        error.setStatus(401);
        error.setMessage("Invalid or expired token. Please login again.");
        error.setPath("/api/v1/blogs");
        return ResponseEntity.status(401).body(error);
    }

    // GENERAL CATCH-ALL
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGeneralException(Exception exception) {
        ApiError error = new ApiError();
        error.setStatus(500);
        error.setMessage("Unexpected error occurred. Please try again later.");
        error.setPath("/api/v1/blogs");
        return ResponseEntity.status(500).body(error);
    }
}
