package com.devEra.ws.service;

import com.devEra.ws.core.enums.CreatorType;
import com.devEra.ws.dto.request.Forum.CreateForumPostRequest;
import com.devEra.ws.entity.Admin;
import com.devEra.ws.entity.ForumPost;
import com.devEra.ws.entity.User;
import com.devEra.ws.repository.AdminRepository;
import com.devEra.ws.repository.ForumPostRepository;
import com.devEra.ws.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ForumPostService {

    private final ForumPostRepository forumPostRepository;
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
}
