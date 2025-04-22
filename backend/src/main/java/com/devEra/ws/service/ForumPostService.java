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

    public ForumPost createForumPost(CreateForumPostRequest request, int creatorId, CreatorType creatorType) {
        ForumPost post = new ForumPost();
        post.setTitle(request.getTitle());
        post.setDescription(request.getDescription());
        post.setMediaList(request.getMediaList());
        
        // Kategori ataması
        if (request.getCategoryId() != null) {
            ForumCategory category = findCategoryById(request.getCategoryId());
            post.setCategory(category);
        }
        
        post.setLikesCount(0);
        post.setCommentCount(0);
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());
        post.setCreatedBy(creatorId);
        post.setCreatedByType(creatorType);

        return forumPostRepository.save(post);
    }
    
    /**
     * Forum gönderisi oluşturur ve medya dosyalarını S3'e yükler
     * 
     * @param title Forum başlığı
     * @param description Forum açıklaması
     * @param mediaFiles Yüklenecek medya dosyaları (en fazla 10 adet)
     * @param categoryId Kategori ID (opsiyonel)
     * @param creatorId Oluşturan kullanıcı ID
     * @param creatorType Oluşturan kullanıcı tipi
     * @return Oluşturulan forum gönderisi
     * @throws IOException Dosya yükleme hatası durumunda
     * @throws IllegalArgumentException Geçersiz argüman durumunda
     */
    public ForumPost createForumPostWithMedia(String title, String description, 
                                             List<MultipartFile> mediaFiles,
                                             Integer categoryId,
                                             int creatorId, CreatorType creatorType) 
                                             throws IOException, IllegalArgumentException {
        
        // En fazla 10 medya dosyası kontrolü
        if (mediaFiles != null && mediaFiles.size() > 10) {
            throw new IllegalArgumentException("Maximum 10 media files are allowed per forum post.");
        }
        
        ForumPost post = new ForumPost();
        post.setTitle(title);
        post.setDescription(description);
        
        // Kategori ataması
        if (categoryId != null) {
            ForumCategory category = findCategoryById(categoryId);
            post.setCategory(category);
        }
        
        post.setLikesCount(0);
        post.setCommentCount(0);
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());
        post.setCreatedBy(creatorId);
        post.setCreatedByType(creatorType);
        
        // Önce post'u kaydet (ID almak için)
        post = forumPostRepository.save(post);
        
        // Medya dosyaları varsa S3'e yükle
        if (mediaFiles != null && !mediaFiles.isEmpty()) {
            List<String> mediaUrls = new ArrayList<>();
            
            for (MultipartFile file : mediaFiles) {
                if (!file.isEmpty()) {
                    // S3'e dosyayı yükle
                    String fileKey = "forum/" + post.getForumPostID() + "/" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
                    String mediaUrl = s3Service.uploadFile(file, fileKey);
                    mediaUrls.add(mediaUrl);
                }
            }
            
            post.setMediaList(mediaUrls);
            post = forumPostRepository.save(post); // Güncellenmiş post'u kaydet
        }
        
        return post;
    }

    /**
     * Populates the transient creator details (name and profile picture) for a given post.
     * @param post The ForumPost entity to populate.
     */
    private void populateCreatorDetails(ForumPost post) {
        if (post == null) return; // Avoid NullPointerException

        try {
            if (post.getCreatedByType() == CreatorType.USER) {
                User creator = userRepository.findById(post.getCreatedBy()).orElse(null);
                if (creator != null) {
                    post.setCreatorName(creator.getFirstName() + " " + creator.getLastName());
                    post.setCreatorProfilePic(creator.getPicture());
                } else {
                    post.setCreatorName("Unknown User");
                    // Keep default profile pic or set a specific one for unknown
                }
            } else if (post.getCreatedByType() == CreatorType.ADMIN) {
                Admin creator = adminRepository.findById(post.getCreatedBy()).orElse(null);
                if (creator != null) {
                    post.setCreatorName(creator.getFirstName() + " " + creator.getLastName());
                    post.setCreatorProfilePic(creator.getPicture());
                } else {
                    post.setCreatorName("Unknown Admin");
                    // Keep default profile pic or set a specific one for unknown
                }
            }
        } catch (Exception e) {
             // Log the error and set default names
             System.err.println("Error fetching creator details for post ID " + post.getForumPostID() + ": " + e.getMessage());
             post.setCreatorName("Error Loading Name");
             // Set default profile picture (handled by frontend if null)
             post.setCreatorProfilePic(null); 
        }
    }

    public List<ForumPost> getAllPosts() {
        // Fetch all posts
        List<ForumPost> posts = forumPostRepository.findAll();
        
        // Iterate through posts and populate creator details
        for (ForumPost post : posts) {
           populateCreatorDetails(post); // Call helper method
        }
        
        return posts;
    }

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
     * @return true ise silme başarılı
     */
    @Transactional
    public void deletePost(int postId, int requesterId, CreatorType requesterType) {
        ForumPost post = forumPostRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Forum post not found"));

        boolean isOwner = post.getCreatedBy() == requesterId && post.getCreatedByType() == requesterType;
        boolean isAdmin = requesterType == CreatorType.ADMIN;

        // Admin her zaman silebilir, normal kullanıcı sadece kendi postlarını silebilir
        if (!isOwner && !isAdmin) {
            throw new SecurityException("You are not authorized to delete this post.");
        }
        
        // Eğer medya dosyaları varsa S3'ten sil
        if (post.getMediaList() != null && !post.getMediaList().isEmpty()) {
            for (String mediaUrl : post.getMediaList()) {
                try {
                    s3Service.deleteFile(extractS3KeyFromUrl(mediaUrl));
                } catch (Exception e) {
                    // Silme hatalarını log'la ama işleme devam et
                    System.err.println("Error deleting media file: " + mediaUrl + " - " + e.getMessage());
                }
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
        save.setForumPost(post);  // ForumPost nesnesi burada set ediliyor
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
        return forumPostRepository.findByCreatedByAndCreatedByType(userId, creatorType);
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
        return forumPostRepository.findByTitleOrDescriptionContainingIgnoreCase(searchText.trim());
    }

    /**
     * Kategori bazlı filtreleme yapar
     * 
     * @param categoryId Kategori ID
     * @return Kategori ile filtrelenmiş forum gönderileri listesi
     */
    public List<ForumPost> getPostsByCategory(int categoryId) {
        ForumCategory category = findCategoryById(categoryId);
        return forumPostRepository.findByCategory(category);
    }

    /**
     * Metin içeriğine ve kategoriye göre forum gönderilerini arar
     * 
     * @param searchText Arama metni
     * @param categoryId Kategori ID
     * @return Bulunan forum gönderileri listesi
     */
    public List<ForumPost> searchPostsByCategoryAndText(String searchText, int categoryId) {
        ForumCategory category = findCategoryById(categoryId);
        
        if (searchText == null || searchText.trim().isEmpty()) {
            return forumPostRepository.findByCategory(category);
        }
        
        return forumPostRepository.findByCategoryAndTitleOrDescriptionContainingIgnoreCase(category, searchText.trim());
    }

    /**
     * Kategori ID'sine göre kategori bulur
     * 
     * @param categoryId Kategori ID
     * @return Kategori
     * @throws EntityNotFoundException Kategori bulunamazsa
     */
    private ForumCategory findCategoryById(int categoryId) {
        // ForumCategoryRepository'den kategori bulma
        return forumCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Category not found with ID: " + categoryId));
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
