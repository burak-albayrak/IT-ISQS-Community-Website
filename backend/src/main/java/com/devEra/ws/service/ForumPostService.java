package com.devEra.ws.service;

import com.devEra.ws.core.enums.CreatorType;
import com.devEra.ws.dto.request.Forum.CreateForumPostRequest;
import com.devEra.ws.entity.Admin;
import com.devEra.ws.entity.User;
import com.devEra.ws.entity.Forum.ForumPost;
import com.devEra.ws.entity.Forum.ForumPostLike;
import com.devEra.ws.entity.Forum.ForumPostSave;
import com.devEra.ws.entity.Forum.ForumCategory;
import com.devEra.ws.repository.AdminRepository;
import com.devEra.ws.repository.UserRepository;
import com.devEra.ws.repository.Forum.ForumPostLikeRepository;
import com.devEra.ws.repository.Forum.ForumPostRepository;
import com.devEra.ws.repository.Forum.ForumPostSaveRepository;
import com.devEra.ws.repository.Forum.ForumCategoryRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ForumPostService {

    private final ForumPostRepository forumPostRepository;
    private final ForumPostLikeRepository forumPostLikeRepository;
    private final ForumPostSaveRepository forumPostSaveRepository;
    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final S3Service s3Service;
    private final ForumCategoryRepository forumCategoryRepository;
    private final MediaService mediaService;
    private final ForumCategoryService categoryService;

    /**
     * JSON veri ile forum gönderisi oluşturur
     * 
     * @param request Oluşturma isteği
     * @param creatorId Oluşturan kullanıcı ID
     * @param creatorType Oluşturan kullanıcı tipi
     * @return Oluşturulan forum gönderisi
     */
    public ForumPost createForumPost(CreateForumPostRequest request, int creatorId, CreatorType creatorType) {
        ForumPost post = new ForumPost();
        post.setTitle(request.getTitle());
        post.setDescription(request.getDescription());
        post.setMediaList(request.getMediaList());
        post.setLikesCount(0);
        post.setCommentCount(0);
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());
        post.setCreatedBy(creatorId);
        post.setCreatorType(creatorType);
        
        // Tekli kategori ataması (geriye dönük uyumluluk için)
        if (request.getCategoryId() != null) {
            try {
                ForumCategory category = categoryService.getCategoryById(request.getCategoryId());
                post.addCategory(category);
            } catch (EntityNotFoundException e) {
                // Kategori bulunamadıysa devam et
            }
        }
        
        // Çoklu kategori ataması (yeni)
        if (request.getCategoryIds() != null && !request.getCategoryIds().isEmpty()) {
            // Kategori sayısı kontrolü
            if (request.getCategoryIds().size() > 3) {
                throw new IllegalArgumentException("Maximum 3 categories are allowed");
            }
            
            for (Integer categoryId : request.getCategoryIds()) {
                try {
                    // Eğer zaten eklenmediyse (categoryId ile eklenmemiş ise) ekle
                    if (categoryId != request.getCategoryId()) {
                        ForumCategory category = categoryService.getCategoryById(categoryId);
                        post.addCategory(category);
                    }
                } catch (EntityNotFoundException e) {
                    // Kategori bulunamadıysa atlayıp devam et
                }
            }
        }

        return forumPostRepository.save(post);
    }
    
    /**
     * Forum gönderisi oluşturur ve medya dosyalarını S3'e yükler
     * 
     * @param title Forum başlığı
     * @param description Forum açıklaması
     * @param mediaFiles Yüklenecek medya dosyaları (en fazla 10 adet)
     * @param categoryIds Kategori ID'leri (en fazla 3 adet)
     * @param creatorId Oluşturan kullanıcı ID
     * @param creatorType Oluşturan kullanıcı tipi
     * @return Oluşturulan forum gönderisi
     * @throws IOException Dosya yükleme hatası durumunda
     * @throws IllegalArgumentException Geçersiz argüman durumunda
     */
    public ForumPost createForumPostWithMedia(String title, String description, 
                                             List<MultipartFile> mediaFiles, List<Integer> categoryIds, 
                                             Integer creatorId, CreatorType creatorType) throws IOException {
        
        // Medya dosyası sayısı kontrolü
        if (mediaFiles != null && mediaFiles.size() > 10) {
            throw new IllegalArgumentException("Maximum 10 media files are allowed");
        }
        
        // Kategori sayısı kontrolü
        if (categoryIds != null && categoryIds.size() > 3) {
            throw new IllegalArgumentException("Maximum 3 categories are allowed");
        }
        
        ForumPost post = new ForumPost();
        post.setTitle(title);
        post.setDescription(description);
        post.setCreatedBy(creatorId);
        post.setCreatorType(creatorType);
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());
        post.setLikesCount(0);
        post.setCommentCount(0);
        
        // Kategorileri ekle (maksimum 3)
        if (categoryIds != null && !categoryIds.isEmpty()) {
            for (Integer categoryId : categoryIds) {
                try {
                    ForumCategory category = categoryService.getCategoryById(categoryId);
                    post.addCategory(category);
                } catch (EntityNotFoundException e) {
                    // Kategori bulunamadıysa atlayıp devam et
                }
            }
        }
        
        // Medya dosyalarını yükle
        if (mediaFiles != null && !mediaFiles.isEmpty()) {
            List<String> uploadedMediaUrls = new ArrayList<>();
            
            for (MultipartFile file : mediaFiles) {
                if (!file.isEmpty()) {
                    String fileUrl = mediaService.uploadMedia(file, "forum");
                    uploadedMediaUrls.add(fileUrl);
                }
            }
            
            // Medya URL'lerini JSON olarak kaydet
            if (!uploadedMediaUrls.isEmpty()) {
                ObjectMapper mapper = new ObjectMapper();
                try {
                    post.setMediaList(mapper.writeValueAsString(uploadedMediaUrls));
                } catch (Exception e) {
                    throw new IOException("Error saving media URLs: " + e.getMessage());
                }
            }
        }
        
        return forumPostRepository.save(post);
    }

    /**

     * Tüm forum gönderilerini getirir
     * 
     * @return Forum gönderileri listesi
     */

    public List<ForumPost> getAllPosts() {
        // Fetch all posts
        List<ForumPost> posts = forumPostRepository.findAll();
        
        // Iterate through posts and populate creator details
        for (ForumPost post : posts) {
           populateCreatorDetails(post); // Call helper method
        }
        
        return posts;
    }

    /**
     * ID'ye göre forum gönderisi getirir
     * 
     * @param id Forum gönderisi ID
     * @return Forum gönderisi
     * @throws EntityNotFoundException Gönderi bulunamazsa
     */
    public ForumPost getPostById(int id) {
        ForumPost post = forumPostRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Forum post not found"));
        
        populateCreatorDetails(post); // Populate creator details before returning

        // Note: Updating updatedAt might not be necessary here unless explicitly required
        // If needed, uncomment the lines below, but consider if fetching details should trigger an update.
        // post.setUpdatedAt(LocalDateTime.now()); 
        // return forumPostRepository.save(post); 

        return post; // Return the post with populated details
    }

    /**
     * Belirli bir forum gönderisini siler
     * 
     * @param postId Silinecek gönderi ID
     * @param requesterId İsteği yapan kullanıcı ID
     * @param requesterType İsteği yapan kullanıcı tipi
     * @throws EntityNotFoundException Gönderi bulunamazsa
     * @throws SecurityException Yetki hatası durumunda
     */
    @Transactional
    public void deletePost(int postId, int requesterId, CreatorType requesterType) {
        ForumPost post = forumPostRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Forum post not found"));

        boolean isOwner = post.getCreatedBy() == requesterId && post.getCreatorType() == requesterType;
        boolean isAdmin = requesterType == CreatorType.ADMIN;

        // Admin her zaman silebilir, normal kullanıcı sadece kendi postlarını silebilir
        if (!isOwner && !isAdmin) {
            throw new SecurityException("You are not authorized to delete this post.");
        }
        
        // Eğer medya dosyaları varsa S3'ten sil
        if (post.getMediaList() != null && !post.getMediaList().isEmpty()) {
            try {
                ObjectMapper mapper = new ObjectMapper();
                List<String> mediaUrls = mapper.readValue(post.getMediaList(), List.class);
                
                for (String mediaUrl : mediaUrls) {
                    try {
                        s3Service.deleteFile(extractS3KeyFromUrl(mediaUrl));
                    } catch (Exception e) {
                        // Silme hatalarını log'la ama işleme devam et
                        System.err.println("Error deleting media file: " + mediaUrl + " - " + e.getMessage());
                    }
                }
            } catch (Exception e) {
                System.err.println("Error parsing media list: " + e.getMessage());
            }
        }

        // İlişkili kayıtları sil (cascade işlemi)
        forumPostRepository.deleteAllLikesByPostId(postId);
        forumPostRepository.deleteAllSavesByPostId(postId);
        forumPostRepository.deleteAllCommentsByPostId(postId);
        
        // Post'u sil
        forumPostRepository.delete(post);
    }
    
    /**
     * S3 URL'sinden dosya anahtarını (key) çıkarır
     * 
     * @param url S3 URL'si
     * @return S3 dosya anahtarı
     */
    private String extractS3KeyFromUrl(String url) {
        // S3 URL formatı: https://bucket-name.s3.region.amazonaws.com/file-key
        // veya: https://s3.region.amazonaws.com/bucket-name/file-key
        
        if (url == null || url.isEmpty()) {
            return "";
        }
        
        // Basit bir çözüm: URL'nin son kısmını al (genellikle dosya adı)
        int lastSlashIndex = url.lastIndexOf("/");
        if (lastSlashIndex >= 0 && lastSlashIndex < url.length() - 1) {
            return url.substring(lastSlashIndex + 1);
        }
        
        return url;
    }

    /**
     * Forum gönderisine beğeni ekler veya kaldırır
     * 
     * @param postId Gönderi ID
     * @param userId Kullanıcı ID
     * @param userType Kullanıcı tipi
     * @throws EntityNotFoundException Gönderi bulunamazsa
     */
    public void toggleLikePost(int postId, int userId, CreatorType userType) {
        ForumPost post = forumPostRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Forum post not found"));

        Optional<ForumPostLike> existingLike = forumPostLikeRepository.findByPostIdAndUserIdAndUserType(postId, userId,
                userType);

        if (existingLike.isPresent()) {
            forumPostLikeRepository.delete(existingLike.get());
            post.setLikesCount(post.getLikesCount() - 1);
        } else {
            ForumPostLike like = new ForumPostLike();
            like.setPostId(postId);
            like.setUserId(userId);
            like.setUserType(userType);
            like.setCreatedAt(LocalDateTime.now());
            forumPostLikeRepository.save(like);

            post.setLikesCount(post.getLikesCount() + 1);
        }

        post.setUpdatedAt(LocalDateTime.now());
        forumPostRepository.save(post);
    }

    /**
     * Forum gönderisini kaydeder veya kaldırır
     * 
     * @param postId Gönderi ID
     * @param userId Kullanıcı ID
     * @param creatorType Kullanıcı tipi
     * @return İşlem sonucu mesajı
     * @throws EntityNotFoundException Gönderi bulunamazsa
     */
    public String saveOrUnsavePost(int postId, int userId, CreatorType creatorType) {
        ForumPost post = forumPostRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Forum post not found"));
    
        Optional<ForumPostSave> existing = forumPostSaveRepository
                .findByForumPostAndSavedByAndSavedByType(post, userId, creatorType);
    
        if (existing.isPresent()) {
            forumPostSaveRepository.delete(existing.get());
            return "Post removed from saved posts.";
        }
    
        ForumPostSave save = new ForumPostSave();
        save.setForumPost(post);
        save.setSavedBy(userId);
        save.setSavedByType(creatorType);
        save.setSavedAt(LocalDateTime.now());
    
        forumPostSaveRepository.save(save);
    
        return "Post saved to profile.";
    }

    /**
     * Belirli bir kullanıcının oluşturduğu tüm forum postlarını getirir
     * 
     * @param userId Kullanıcı ID'si
     * @param creatorType Kullanıcı tipi (USER veya ADMIN)
     * @return Kullanıcının oluşturduğu forum postları listesi
     * @throws EntityNotFoundException Kullanıcı bulunamazsa
     */
    public List<ForumPost> getUserForumPosts(int userId, CreatorType creatorType) {
        // Kullanıcının var olduğunu kontrol et
        if (creatorType == CreatorType.USER) {
            userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        } else if (creatorType == CreatorType.ADMIN) {
            adminRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Admin not found"));
        }
        
        // Kullanıcının oluşturduğu postları getir
        return forumPostRepository.findByCreatedByAndCreatorType(userId, creatorType);
    }

    /**
     * Metin içeriğine göre forum gönderilerini arar
     * 
     * @param searchText Arama metni
     * @return Bulunan forum gönderileri listesi
     */
    public List<ForumPost> searchPosts(String searchText) {
        if (searchText == null || searchText.trim().isEmpty()) {
            return getAllPosts();
        }
        return forumPostRepository.findByTitleContainingOrDescriptionContaining(searchText.trim(), searchText.trim());
    }

    /**
     * Kategori bazlı filtreleme yapar
     * 
     * @param categoryId Kategori ID
     * @return Kategori ile filtrelenmiş forum gönderileri listesi
     * @throws EntityNotFoundException Kategori bulunamazsa
     */
    public List<ForumPost> getPostsByCategory(int categoryId) {
        ForumCategory category = categoryService.getCategoryById(categoryId);
        return forumPostRepository.findByCategoriesContaining(category);
    }

    /**
     * Metin içeriğine ve kategoriye göre forum gönderilerini arar
     * 
     * @param searchQuery Arama metni
     * @param categoryId Kategori ID
     * @return Bulunan forum gönderileri listesi
     * @throws EntityNotFoundException Kategori bulunamazsa
     */
    public List<ForumPost> searchPostsByCategoryAndText(String searchQuery, int categoryId) {
        ForumCategory category = categoryService.getCategoryById(categoryId);
        
        if (searchQuery == null || searchQuery.trim().isEmpty()) {
            return forumPostRepository.findByCategoriesContaining(category);
        }
        
        return forumPostRepository.findByCategoriesContainingAndTitleContainingOrDescriptionContaining(
                category, searchQuery, searchQuery);
    }

    /**
     * Body parametreleri ile kategoriye göre ve içeriğe göre arama yapar
     * 
     * @param categoryId Kategori ID (opsiyonel)
     * @param searchQuery Arama metni (opsiyonel)
     * @return Bulunan forum gönderileri listesi
     */
    public List<ForumPost> searchPostsWithBodyParams(Integer categoryId, String searchQuery) {
        if (categoryId != null) {
            try {
                ForumCategory category = categoryService.getCategoryById(categoryId);
                
                if (searchQuery != null && !searchQuery.trim().isEmpty()) {
                    return forumPostRepository.findByCategoriesContainingAndTitleContainingOrDescriptionContaining(
                            category, searchQuery, searchQuery);
                } else {
                    return forumPostRepository.findByCategoriesContaining(category);
                }
            } catch (EntityNotFoundException e) {
                // Kategori bulunamadı, boş liste dön
                return new ArrayList<>();
            }
        } else if (searchQuery != null && !searchQuery.trim().isEmpty()) {
            // Sadece arama sorgusu var, kategori yok
            return forumPostRepository.findByTitleContainingOrDescriptionContaining(searchQuery, searchQuery);
        } else {
            // Ne kategori ne de arama sorgusu var, tüm gönderileri getir
            return getAllPosts();
        }
    }

    /**
     * Retrieves the most recent forum posts (e.g., top 3).
     * Creator details are populated for each post.
     *
     * @return A list of the most recent ForumPost entities with creator details.
     */
    public List<ForumPost> getRecentPosts() {
        // Fetch the top 3 recent posts using the new repository method
        List<ForumPost> recentPosts = forumPostRepository.findTop3ByOrderByCreatedAtDesc();

        // Populate creator details for each post
        for (ForumPost post : recentPosts) {
            populateCreatorDetails(post); // Reuse existing helper method
        }

        return recentPosts;
    }
}
