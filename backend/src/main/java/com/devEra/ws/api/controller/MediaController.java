package com.devEra.ws.api.controller;

import com.devEra.ws.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/media")
@RequiredArgsConstructor
public class MediaController {

    private final S3Service s3Service;
    
    @PostMapping("/upload")
    public ResponseEntity<?> uploadMedia(@RequestParam("file") MultipartFile file) {
        try {
            // Dosya boyutu kontrolü (5MB)
            if (file.getSize() > 5 * 1024 * 1024) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "File size must be less than 5MB"
                ));
            }

            // Dosya tipi kontrolü
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "Only image files are allowed"
                ));
            }
            
            // Benzersiz bir key oluştur
            String fileKey = "blogs/" + UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            
            // S3'e yükle
            String fileUrl = s3Service.uploadFile(file, fileKey);
            
            Map<String, String> response = new HashMap<>();
            response.put("fileUrl", fileUrl);
            
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Failed to upload file: " + e.getMessage()
            ));
        }
    }
    
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteMedia(@RequestParam("url") String fileUrl) {
        try {
            // URL'den S3 key'ini çıkar
            String key = extractS3KeyFromUrl(fileUrl);
            
            if (key.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "error", "Invalid file URL"
                ));
            }
            
            // S3'ten sil
            s3Service.deleteFile(key);
            
            return ResponseEntity.ok(Map.of(
                "message", "File deleted successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Failed to delete file: " + e.getMessage()
            ));
        }
    }
    
    /**
     * S3 URL'sinden dosya anahtarını (key) çıkarır
     */
    private String extractS3KeyFromUrl(String url) {
        if (url == null || url.isEmpty()) {
            return "";
        }
        
        // S3 URL formatı: https://bucket-name.s3.region.amazonaws.com/file-key
        String[] parts = url.split(".amazonaws.com/");
        if (parts.length > 1) {
            return parts[1];
        }
        
        return "";
    }
} 