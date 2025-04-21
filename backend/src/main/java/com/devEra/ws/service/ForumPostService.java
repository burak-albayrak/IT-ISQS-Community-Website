package com.devEra.ws.service;

import com.devEra.ws.core.enums.CreatorType;
import com.devEra.ws.dto.request.Forum.CreateForumPostRequest;
import com.devEra.ws.entity.Admin;
import com.devEra.ws.entity.User;
import com.devEra.ws.entity.Forum.ForumPost;
import com.devEra.ws.entity.Forum.ForumPostLike;
import com.devEra.ws.entity.Forum.ForumPostSave;
import com.devEra.ws.repository.AdminRepository;
import com.devEra.ws.repository.UserRepository;
import com.devEra.ws.repository.Forum.ForumPostLikeRepository;
import com.devEra.ws.repository.Forum.ForumPostRepository;
import com.devEra.ws.repository.Forum.ForumPostSaveRepository;

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
        post.setCreatedByType(creatorType);

        return forumPostRepository.save(post);
    }
    
    /**
     * Forum gönderisi oluşturur ve medya dosyalarını S3'e yükler
     * 
     * @param title Forum başlığı
     * @param description Forum açıklaması
     * @param mediaFiles Yüklenecek medya dosyaları (en fazla 10 adet)
     * @param creatorId Oluşturan kullanıcı ID
     * @param creatorType Oluşturan kullanıcı tipi
     * @return Oluşturulan forum gönderisi
     * @throws IOException Dosya yükleme hatası durumunda
     * @throws IllegalArgumentException Geçersiz argüman durumunda
     */
    public ForumPost createForumPostWithMedia(String title, String description, 
                                             List<MultipartFile> mediaFiles, 
                                             int creatorId, CreatorType creatorType) 
                                             throws IOException, IllegalArgumentException {
        
        // En fazla 10 medya dosyası kontrolü
        if (mediaFiles != null && mediaFiles.size() > 10) {
            throw new IllegalArgumentException("Maximum 10 media files are allowed per forum post.");
        }
        
        ForumPost post = new ForumPost();
        post.setTitle(title);
        post.setDescription(description);
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

    public List<ForumPost> getAllPosts() {
        return forumPostRepository.findAll();
    }

    public ForumPost getPostById(int id) {
        ForumPost post = forumPostRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Forum post not found"));
        post.setUpdatedAt(LocalDateTime.now());
        return forumPostRepository.save(post);
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
}
