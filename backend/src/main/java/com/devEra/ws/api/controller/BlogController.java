package com.devEra.ws.api.controller;

import com.devEra.ws.config.security.JwtTokenService;
import com.devEra.ws.core.message.GenericMessage;
import com.devEra.ws.dto.request.Blog.CreateBlogRequest;
import com.devEra.ws.dto.request.Blog.UpdateBlogRequest;
import com.devEra.ws.entity.Blog;
import com.devEra.ws.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/blogs")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;
    private final JwtTokenService jwtTokenService;

    // 1. Blog oluştur (Admin)
    @PostMapping("/create")
    public ResponseEntity<GenericMessage> createBlog(@RequestBody CreateBlogRequest request,
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
    @PutMapping("/update/{id}")
    public ResponseEntity<GenericMessage> updateBlog(
            @PathVariable int id,
            @RequestBody UpdateBlogRequest request,
            @RequestHeader("Authorization") String tokenHeader) {
        String token = tokenHeader.replace("Bearer ", "");
        int adminId = jwtTokenService.getAdminIdFromToken(token);

        blogService.updateBlog(id, request, adminId); // service'e gönder
        return ResponseEntity.ok(new GenericMessage("Blog updated successfully."));
    }

    // 5. Blog sil (Admin)
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<GenericMessage> deleteBlog(
            @PathVariable int id,
            @RequestHeader("Authorization") String tokenHeader) {
        String token = tokenHeader.replace("Bearer ", "");
        int adminId = jwtTokenService.getAdminIdFromToken(token);
        blogService.deleteBlog(id, adminId);
        return ResponseEntity.ok(new GenericMessage("Blog deleted successfully."));
    }
}
