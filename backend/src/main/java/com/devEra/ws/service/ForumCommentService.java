package com.devEra.ws.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devEra.ws.core.enums.CreatorType;
import com.devEra.ws.dto.request.Forum.CreateForumCommentRequest;
import com.devEra.ws.dto.response.Forum.ForumCommentResponse;
import com.devEra.ws.entity.Admin;
import com.devEra.ws.entity.User;
import com.devEra.ws.entity.Forum.ForumComment;
import com.devEra.ws.entity.Forum.ForumCommentLike;
import com.devEra.ws.entity.Forum.ForumPost;
import com.devEra.ws.repository.AdminRepository;
import com.devEra.ws.repository.UserRepository;
import com.devEra.ws.repository.Forum.ForumCommentLikeRepository;
import com.devEra.ws.repository.Forum.ForumCommentRepository;
import com.devEra.ws.repository.Forum.ForumPostRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ForumCommentService {

    private final ForumCommentRepository commentRepository;
    private final ForumCommentLikeRepository commentLikeRepository;
    private final ForumPostRepository postRepository;
    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final ToxicityDetectionService toxicityDetectionService;

    /**
     * Yeni bir forum yorumu oluşturur
     * 
     * @param request Yorum bilgileri
     * @param creatorId Oluşturan kullanıcı ID
     * @param creatorType Oluşturan kullanıcı tipi
     * @return Oluşturulan yorum ID'si
     */
    @Transactional
    public int createComment(CreateForumCommentRequest request, int creatorId, CreatorType creatorType) {
        // Toxic kelime kontrolü
        Map<String, Object> toxicityResult = toxicityDetectionService.checkToxicity(request.getDescription());
        boolean isToxic = (boolean) toxicityResult.get("is_toxic");
        double toxicScore = ((Number) toxicityResult.get("toxic_score")).doubleValue();
        
        if (isToxic) {
            throw new IllegalArgumentException("Comment contains inappropriate content. Toxicity score: " + toxicScore + "%");
        }

        // Post'un var olduğunu kontrol et
        ForumPost post = postRepository.findById(request.getForumPostID())
                .orElseThrow(() -> new EntityNotFoundException("Forum post not found"));
        
        // Eğer bir cevap (reply) ise parent yorum var mı kontrol et
        if (request.getParentCommentID() != null) {
            ForumComment parentComment = commentRepository.findById(request.getParentCommentID())
                    .orElseThrow(() -> new EntityNotFoundException("Parent comment not found"));
            
            // Parent yorum aynı post'a ait mi kontrol et
            if (parentComment.getForumPostID() != request.getForumPostID()) {
                throw new IllegalArgumentException("Parent comment does not belong to the specified forum post");
            }
            
            // Parent yorumun kendi parentı yoksa (ana yorumsa) devam et
            if (parentComment.getParentCommentID() != null) {
                throw new IllegalArgumentException("Cannot reply to a reply. You can only reply to main comments.");
            }
        }
        
        // Yeni yorumu oluştur
        ForumComment comment = new ForumComment();
        comment.setForumPostID(request.getForumPostID());
        comment.setDescription(request.getDescription());
        comment.setParentCommentID(request.getParentCommentID());
        comment.setCreatedBy(creatorId);
        comment.setCreatedByType(creatorType);
        comment.setCreatedAt(LocalDateTime.now());
        comment.setUpdatedAt(LocalDateTime.now());
        
        ForumComment savedComment = commentRepository.save(comment);
        
        // Eğer bir cevap (reply) ise parent yorumun yanıt sayısını artır
        if (request.getParentCommentID() != null) {
            ForumComment parentComment = commentRepository.findById(request.getParentCommentID()).get();
            parentComment.setReplyCount(parentComment.getReplyCount() + 1);
            commentRepository.save(parentComment);
        }
        
        // Post'un yorum sayısını artır
        post.setCommentCount(post.getCommentCount() + 1);
        postRepository.save(post);
        
        return savedComment.getForumCommentID();
    }
    
    /**
     * Belirli bir forum yorumunu günceller
     * 
     * @param commentId Güncellenecek yorum ID
     * @param description Yeni açıklama
     * @param requesterId İsteği yapan kullanıcı ID
     * @param requesterType İsteği yapan kullanıcı tipi
     * @return true ise güncelleme başarılı
     */
    @Transactional
    public boolean updateComment(int commentId, String description, int requesterId, CreatorType requesterType) {
        ForumComment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new EntityNotFoundException("Comment not found"));
        
        // Sadece yorum sahibi güncelleyebilir
        if (comment.getCreatedBy() != requesterId || comment.getCreatedByType() != requesterType) {
            throw new SecurityException("You are not authorized to update this comment");
        }
        
        // Toxic kelime kontrolü
        Map<String, Object> toxicityResult = toxicityDetectionService.checkToxicity(description);
        boolean isToxic = (boolean) toxicityResult.get("is_toxic");
        double toxicScore = ((Number) toxicityResult.get("toxic_score")).doubleValue();
        
        if (isToxic) {
            throw new IllegalArgumentException("Comment contains inappropriate content. Toxicity score: " + toxicScore + "%");
        }
        
        comment.setDescription(description);
        comment.setEdited(true);
        comment.setUpdatedAt(LocalDateTime.now());
        
        commentRepository.save(comment);
        return true;
    }
    
    /**
     * Belirli bir forum yorumunu siler
     * 
     * @param commentId Silinecek yorum ID
     * @param requesterId İsteği yapan kullanıcı ID
     * @param requesterType İsteği yapan kullanıcı tipi
     * @return true ise silme başarılı
     */
    @Transactional
    public boolean deleteComment(int commentId, int requesterId, CreatorType requesterType) {
        ForumComment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new EntityNotFoundException("Comment not found"));
        
        boolean isOwner = comment.getCreatedBy() == requesterId && comment.getCreatedByType() == requesterType;
        boolean isAdmin = requesterType == CreatorType.ADMIN;
        
        // Admin her zaman silebilir, normal kullanıcı sadece kendi yorumlarını silebilir
        if (!isOwner && !isAdmin) {
            throw new SecurityException("You are not authorized to delete this comment");
        }
        
        // Eğer bu bir ana yorum ise, önce yanıtları sil
        if (comment.getParentCommentID() == null) {
            List<ForumComment> replies = commentRepository.findByParentCommentIDOrderByCreatedAtAsc(comment.getForumCommentID());
            commentRepository.deleteAll(replies);
        } else {
            // Yanıt ise, parent yorumun yanıt sayısını azalt
            ForumComment parentComment = commentRepository.findById(comment.getParentCommentID())
                    .orElseThrow(() -> new EntityNotFoundException("Parent comment not found"));
            parentComment.setReplyCount(parentComment.getReplyCount() - 1);
            commentRepository.save(parentComment);
        }
        
        // Bu yoruma ait beğenileri sil
        List<ForumCommentLike> likes = commentLikeRepository.findByCommentIdAndUserIdAndUserType(comment.getForumCommentID(), requesterId, requesterType)
                .stream()
                .collect(Collectors.toList());
        commentLikeRepository.deleteAll(likes);
        
        // Yorumu sil
        commentRepository.delete(comment);
        
        // Forum post'un yorum sayısını azalt
        ForumPost post = postRepository.findById(comment.getForumPostID())
                .orElseThrow(() -> new EntityNotFoundException("Forum post not found"));
        post.setCommentCount(post.getCommentCount() - 1);
        postRepository.save(post);
        
        return true;
    }
    
    /**
     * Bir yorumu beğenme/beğeni kaldırma
     * 
     * @param commentId Beğenilecek/beğeni kaldırılacak yorum ID
     * @param userId Kullanıcı ID
     * @param userType Kullanıcı tipi
     * @return true ise beğenildi, false ise beğeni kaldırıldı
     */
    @Transactional
    public boolean toggleLikeComment(int commentId, int userId, CreatorType userType) {
        ForumComment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new EntityNotFoundException("Comment not found"));
        
        // Kullanıcının bu yorumu daha önce beğenip beğenmediğini kontrol et
        Optional<ForumCommentLike> existingLike = commentLikeRepository
                .findByCommentIdAndUserIdAndUserType(commentId, userId, userType);
        
        if (existingLike.isPresent()) {
            // Beğeni varsa kaldır
            commentLikeRepository.delete(existingLike.get());
            comment.setLikes(comment.getLikes() - 1);
            commentRepository.save(comment);
            return false;
        } else {
            // Beğeni yoksa ekle
            ForumCommentLike like = new ForumCommentLike();
            like.setCommentId(commentId);
            like.setUserId(userId);
            like.setUserType(userType);
            like.setCreatedAt(LocalDateTime.now());
            commentLikeRepository.save(like);
            
            comment.setLikes(comment.getLikes() + 1);
            commentRepository.save(comment);
            return true;
        }
    }
    
    /**
     * Bir forum gönderisine ait tüm ana yorumları getirir
     * 
     * @param forumPostId Forum gönderi ID
     * @param currentUserId Mevcut kullanıcı ID (null ise giriş yapılmamış)
     * @param currentUserType Mevcut kullanıcı tipi
     * @return Ana yorumların listesi
     */
    public List<ForumCommentResponse> getMainCommentsByPostId(int forumPostId, Integer currentUserId, CreatorType currentUserType) {
        // Post'un var olduğunu kontrol et
        ForumPost post = postRepository.findById(forumPostId)
                .orElseThrow(() -> new EntityNotFoundException("Forum post not found"));
        
        // Ana yorumları getir (parent_comment_id = null)
        List<ForumComment> mainComments = commentRepository.findByForumPostIDAndParentCommentIDIsNullOrderByCreatedAtDesc(forumPostId);
        
        // DTO'ya dönüştür
        return mainComments.stream()
                .map(comment -> convertToDto(comment, currentUserId, currentUserType, false))
                .collect(Collectors.toList());
    }
    
    /**
     * Bir ana yoruma ait tüm yanıtları getirir
     * 
     * @param parentCommentId Ana yorum ID
     * @param currentUserId Mevcut kullanıcı ID (null ise giriş yapılmamış)
     * @param currentUserType Mevcut kullanıcı tipi
     * @return Yanıtların listesi
     */
    public List<ForumCommentResponse> getRepliesByParentCommentId(int parentCommentId, Integer currentUserId, CreatorType currentUserType) {
        // Parent yorumun var olduğunu kontrol et
        ForumComment parentComment = commentRepository.findById(parentCommentId)
                .orElseThrow(() -> new EntityNotFoundException("Parent comment not found"));
        
        // Yanıtları getir
        List<ForumComment> replies = commentRepository.findByParentCommentIDOrderByCreatedAtAsc(parentCommentId);
        
        // DTO'ya dönüştür
        return replies.stream()
                .map(comment -> convertToDto(comment, currentUserId, currentUserType, false))
                .collect(Collectors.toList());
    }
    
    /**
     * Bir forum gönderisine ait tüm yorumları (ana yorumlar ve yanıtları) hiyerarşik olarak getirir
     * 
     * @param forumPostId Forum gönderi ID
     * @param currentUserId Mevcut kullanıcı ID (null ise giriş yapılmamış)
     * @param currentUserType Mevcut kullanıcı tipi
     * @return Hiyerarşik yorum listesi
     */
    public List<ForumCommentResponse> getAllCommentsByPostIdHierarchical(int forumPostId, Integer currentUserId, CreatorType currentUserType) {
        // Ana yorumları getir
        List<ForumCommentResponse> mainComments = getMainCommentsByPostId(forumPostId, currentUserId, currentUserType);
        
        // Her ana yorum için yanıtları ekle
        for (ForumCommentResponse mainComment : mainComments) {
            if (mainComment.getReplyCount() > 0) {
                List<ForumCommentResponse> replies = getRepliesByParentCommentId(mainComment.getCommentId(), currentUserId, currentUserType);
                mainComment.setReplies(replies);
            } else {
                mainComment.setReplies(new ArrayList<>());
            }
        }
        
        return mainComments;
    }
    
    /**
     * Yorum entity'sini DTO'ya dönüştürür
     * 
     * @param comment Yorum entity
     * @param currentUserId Mevcut kullanıcı ID
     * @param currentUserType Mevcut kullanıcı tipi
     * @param includeReplies Yanıtları dahil et
     * @return Yorum DTO
     */
    private ForumCommentResponse convertToDto(ForumComment comment, Integer currentUserId, CreatorType currentUserType, boolean includeReplies) {
        ForumCommentResponse dto = new ForumCommentResponse();
        
        dto.setCommentId(comment.getForumCommentID());
        dto.setDescription(comment.getDescription());
        dto.setLikes(comment.getLikes());
        dto.setEdited(comment.isEdited());
        dto.setParentCommentId(comment.getParentCommentID());
        dto.setReplyCount(comment.getReplyCount());
        dto.setCreatedBy(comment.getCreatedBy());
        dto.setCreatedByType(comment.getCreatedByType());
        dto.setCreatedAt(comment.getCreatedAt());
        dto.setUpdatedAt(comment.getUpdatedAt());
        
        // Kullanıcı adını ve resmini ekle
        if (comment.getCreatedByType() == CreatorType.USER) {
            userRepository.findById(comment.getCreatedBy())
                .ifPresent(user -> {
                    dto.setCreatorName(user.getFirstName() + " " + user.getLastName());
                    dto.setCreatorPicture(user.getPicture());
                });
        } else if (comment.getCreatedByType() == CreatorType.ADMIN) {
            adminRepository.findById(comment.getCreatedBy())
                .ifPresent(admin -> {
                    dto.setCreatorName(admin.getFirstName() + " " + admin.getLastName());
                    dto.setCreatorPicture(admin.getPicture());
                });
        }
        
        // Kullanıcının bu yorumu beğenip beğenmediğini kontrol et
        if (currentUserId != null) {
            boolean isLiked = commentLikeRepository
                    .findByCommentIdAndUserIdAndUserType(comment.getForumCommentID(), currentUserId, currentUserType)
                    .isPresent();
            dto.setLiked(isLiked);
        } else {
            dto.setLiked(false);
        }
        
        // Yanıtları dahil et
        if (includeReplies && comment.getParentCommentID() == null && comment.getReplyCount() > 0) {
            List<ForumComment> replies = commentRepository.findByParentCommentIDOrderByCreatedAtAsc(comment.getForumCommentID());
            List<ForumCommentResponse> replyDtos = replies.stream()
                    .map(reply -> convertToDto(reply, currentUserId, currentUserType, false))
                    .collect(Collectors.toList());
            dto.setReplies(replyDtos);
        }
        
        return dto;
    }
} 