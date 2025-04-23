package com.devEra.ws.api.controller;

import com.devEra.ws.config.security.JwtTokenService;
import com.devEra.ws.core.enums.CreatorType;
import com.devEra.ws.core.error.ApiError;
import com.devEra.ws.core.message.GenericMessage;
import com.devEra.ws.dto.request.Forum.CreateForumPostRequest;
import com.devEra.ws.entity.Forum.ForumPost;
import com.devEra.ws.service.ForumPostService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    
    /**
     * Forum post oluşturur ve medya dosyalarını yükler
     * 
     * @param title Forum başlığı
     * @param description Forum açıklaması
     * @param mediaFiles Yüklenecek medya dosyaları (max 10 adet)
     * @param categoryIds Kategori ID'leri (max 3 adet)
     * @param tokenHeader Yetkilendirme token'ı
     * @return Oluşturulan forum post'un ID'si veya hata mesajı
     */
    @PostMapping("/with-media")
    public ResponseEntity<?> createForumPostWithMedia(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam(required = false) List<MultipartFile> mediaFiles,
            @RequestParam(required = false) List<Integer> categoryIds,
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
            
            // Forum gönderisi oluştur
            ForumPost post = forumPostService.createForumPostWithMedia(title, description, mediaFiles, categoryIds, userId, creatorType);
            
            // Yanıtı oluştur
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Forum post created successfully.");
            response.put("postId", post.getForumPostID());
            response.put("categoryCount", post.getCategories() != null ? post.getCategories().size() : 0);
            response.put("mediaCount", post.getMediaList() != null ? post.getMediaList().length() : 0);
            
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            ApiError error = new ApiError();
            error.setStatus(400);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/forum-posts/with-media");
            return ResponseEntity.status(400).body(error);
        } catch (IOException e) {
            ApiError error = new ApiError();
            error.setStatus(500);
            error.setMessage("Error uploading media files: " + e.getMessage());
            error.setPath("/api/v1/forum-posts/with-media");
            return ResponseEntity.status(500).body(error);
        } catch (Exception e) {
            ApiError error = new ApiError();
            error.setStatus(401);
            error.setMessage("Invalid or missing token: " + e.getMessage());
            error.setPath("/api/v1/forum-posts/with-media");
            return ResponseEntity.status(401).body(error);
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

    @PostMapping("/like/{postId}")
    public ResponseEntity<GenericMessage> likePost(
            @PathVariable int postId,
            @RequestHeader("Authorization") String tokenHeader) {

        String token = tokenHeader.replace("Bearer ", "");

        CreatorType userType;
        int userId;

        if (jwtTokenService.isAdminToken(token)) {
            userType = CreatorType.ADMIN;
            userId = jwtTokenService.getAdminIdFromToken(token);
        } else {
            userType = CreatorType.USER;
            userId = jwtTokenService.getUserIdFromToken(token);
        }

        forumPostService.toggleLikePost(postId, userId, userType);

        return ResponseEntity.ok(new GenericMessage("Post like status updated."));
    }

    @PostMapping("/{id}/save")
    public ResponseEntity<GenericMessage> savePost(
            @PathVariable int id,
            @RequestHeader("Authorization") String tokenHeader) {

        String token = tokenHeader.replace("Bearer ", "");
        boolean isAdmin = jwtTokenService.isAdminToken(token);
        int userId = isAdmin
                ? jwtTokenService.getAdminIdFromToken(token)
                : jwtTokenService.getUserIdFromToken(token);

        CreatorType creatorType = isAdmin ? CreatorType.ADMIN : CreatorType.USER;

        String resultMessage = forumPostService.saveOrUnsavePost(id, userId, creatorType);
        return ResponseEntity.ok(new GenericMessage(resultMessage));
    }

    /**
     * Kullanıcının oluşturduğu tüm forum postlarını listeler
     * 
     * @param tokenHeader Kullanıcı token'ı
     * @return Kullanıcının oluşturduğu forum postları listesi
     */
    @GetMapping("/my-posts")
    public ResponseEntity<?> getMyPosts(@RequestHeader("Authorization") String tokenHeader) {
        String token = tokenHeader.replace("Bearer ", "");
        try {
            // Önce kullanıcı olarak deneyelim
            Integer userId = jwtTokenService.getUserIdFromToken(token);
            List<ForumPost> posts = forumPostService.getUserForumPosts(userId, CreatorType.USER);
            return ResponseEntity.ok(posts);
        } catch (Exception e1) {
            try {
                // Sonra admin olarak deneyelim
                Integer adminId = jwtTokenService.getAdminIdFromToken(token);
                List<ForumPost> posts = forumPostService.getUserForumPosts(adminId, CreatorType.ADMIN);
                return ResponseEntity.ok(posts);
            } catch (EntityNotFoundException e) {
                ApiError error = new ApiError();
                error.setStatus(404);
                error.setMessage(e.getMessage());
                error.setPath("/api/v1/forum-posts/my-posts");
                return ResponseEntity.status(404).body(error);
            } catch (Exception e2) {
                ApiError error = new ApiError();
                error.setStatus(401);
                error.setMessage("Invalid or missing token.");
                error.setPath("/api/v1/forum-posts/my-posts");
                return ResponseEntity.status(401).body(error);
            }
        }
    }

    /**
     * Belirli bir kullanıcının oluşturduğu tüm forum postlarını listeler
     * 
     * @param userId Kullanıcı ID'si
     * @return Kullanıcının oluşturduğu forum postları listesi
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserPosts(@PathVariable int userId) {
        try {
            List<ForumPost> posts = forumPostService.getUserForumPosts(userId, CreatorType.USER);
            return ResponseEntity.ok(posts);
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/forum-posts/user/" + userId);
            return ResponseEntity.status(404).body(error);
        }
    }

    /**
     * Forum postlarını arama
     * 
     * @param searchQuery Arama sorgusu
     * @return Bulunan forum gönderileri
     */
    @GetMapping("/search")
    public ResponseEntity<?> searchPosts(@RequestParam(required = false) String searchQuery) {
        try {
            List<ForumPost> posts = forumPostService.searchPosts(searchQuery);
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            ApiError error = new ApiError();
            error.setStatus(500);
            error.setMessage("Error searching posts: " + e.getMessage());
            error.setPath("/api/v1/forum-posts/search");
            return ResponseEntity.status(500).body(error);
        }
    }
    
    /**
     * Kategori bazlı forum postlarını getirme
     * 
     * @param categoryId Kategori ID
     * @return Kategori ile filtrelenmiş forum gönderileri
     */
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<?> getPostsByCategory(@PathVariable int categoryId) {
        try {
            List<ForumPost> posts = forumPostService.getPostsByCategory(categoryId);
            return ResponseEntity.ok(posts);
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/forum-posts/category/" + categoryId);
            return ResponseEntity.status(404).body(error);
        } catch (Exception e) {
            ApiError error = new ApiError();
            error.setStatus(500);
            error.setMessage("Error retrieving posts: " + e.getMessage());
            error.setPath("/api/v1/forum-posts/category/" + categoryId);
            return ResponseEntity.status(500).body(error);
        }
    }
    
    /**
     * Metin içeriğine ve kategoriye göre forum gönderilerini arama
     * 
     * @param categoryId Kategori ID
     * @param searchQuery Arama sorgusu
     * @return Bulunan forum gönderileri
     */
    @GetMapping("/category/{categoryId}/search")
    public ResponseEntity<?> searchPostsByCategoryAndText(
            @PathVariable int categoryId,
            @RequestParam(required = false) String searchQuery) {
        try {
            List<ForumPost> posts = forumPostService.searchPostsByCategoryAndText(searchQuery, categoryId);
            return ResponseEntity.ok(posts);
        } catch (EntityNotFoundException e) {
            ApiError error = new ApiError();
            error.setStatus(404);
            error.setMessage(e.getMessage());
            error.setPath("/api/v1/forum-posts/category/" + categoryId + "/search");
            return ResponseEntity.status(404).body(error);
        } catch (Exception e) {
            ApiError error = new ApiError();
            error.setStatus(500);
            error.setMessage("Error searching posts: " + e.getMessage());
            error.setPath("/api/v1/forum-posts/category/" + categoryId + "/search");
            return ResponseEntity.status(500).body(error);
        }
    }

    /**
     * Arama ve filtreleme (Body parametreleri ile)
     * Hem kategori, hem metin ile veya ikisinden biriyle arama yapabilme
     * 
     * Desteklenen arama durumları:
     * 1. Sadece kategori ile arama: {"categoryId": 1}
     * 2. Sadece metin ile arama: {"searchQuery": "aranacak metin"}
     * 3. Hem kategori hem metin ile arama: {"categoryId": 1, "searchQuery": "aranacak metin"}
     * 4. Filtre olmadan tüm gönderileri listeleme: {}
     * 
     * @param searchParams Arama parametreleri (categoryId, searchQuery)
     * @return Bulunan forum gönderileri
     */
    @PostMapping("/search")
    public ResponseEntity<?> searchPostsWithBody(@RequestBody Map<String, Object> searchParams) {
        try {
            Integer categoryId = null;
            String searchQuery = null;
            
            // Kategori ID parametresi varsa al
            if (searchParams.containsKey("categoryId") && searchParams.get("categoryId") != null) {
                try {
                    categoryId = Integer.valueOf(searchParams.get("categoryId").toString());
                } catch (NumberFormatException e) {
                    ApiError error = new ApiError();
                    error.setStatus(400);
                    error.setMessage("Invalid category ID format");
                    error.setPath("/api/v1/forum-posts/search");
                    return ResponseEntity.status(400).body(error);
                }
            }
            
            // Arama sorgusu parametresi varsa al
            if (searchParams.containsKey("searchQuery") && searchParams.get("searchQuery") != null) {
                searchQuery = searchParams.get("searchQuery").toString().trim();
                // Boş string ise null olarak değerlendir
                if (searchQuery.isEmpty()) {
                    searchQuery = null;
                }
            }
            
            // Arama yap (kategori, metin veya her ikisi ile)
            List<ForumPost> posts = forumPostService.searchPostsWithBodyParams(categoryId, searchQuery);
            
            // Sonuç sayısını da ekle
            Map<String, Object> response = new HashMap<>();
            response.put("posts", posts);
            response.put("count", posts.size());
            
            // Create filters map separately instead of using anonymous inner class
            Map<String, Object> filters = new HashMap<>();
            filters.put("categoryId", categoryId);
            filters.put("searchQuery", searchQuery);
            response.put("filters", filters);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ApiError error = new ApiError();
            error.setStatus(500);
            error.setMessage("Error searching posts: " + e.getMessage());
            error.setPath("/api/v1/forum-posts/search");
            return ResponseEntity.status(500).body(error);
        }
    }
}
