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

import java.time.LocalDateTime;
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

    public ForumPost createForumPost(CreateForumPostRequest request, int creatorId, CreatorType creatorType) {
        ForumPost post = new ForumPost();
        post.setTitle(request.getTitle());
        post.setDescription(request.getDescription());
        post.setMedia(request.getMedia());
        post.setLikesCount(0);
        post.setCommentCount(0);
        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());
        post.setCreatedBy(creatorId);
        post.setCreatedByType(creatorType);

        return forumPostRepository.save(post);
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

    public void deletePost(int postId, int requesterId, CreatorType requesterType) {
        ForumPost post = forumPostRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Forum post not found"));

        boolean isOwner = post.getCreatedBy() == requesterId && post.getCreatedByType() == requesterType;
        boolean isAdmin = requesterType == CreatorType.ADMIN;

        if (!isOwner && !isAdmin) {
            throw new SecurityException("You are not authorized to delete this post.");
        }

        forumPostRepository.delete(post);
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

}
