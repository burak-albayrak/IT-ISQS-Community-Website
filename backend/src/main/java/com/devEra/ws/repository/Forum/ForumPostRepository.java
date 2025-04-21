package com.devEra.ws.repository.Forum;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.devEra.ws.core.enums.CreatorType;
import com.devEra.ws.entity.Forum.ForumPost;

import java.util.List;

@Repository
public interface ForumPostRepository extends JpaRepository<ForumPost,Integer>{
    List<ForumPost> findByCreatedByAndCreatedByType(int createdBy, CreatorType createdByType);
    
    // İlişkili kayıtları silmek için custom metotlar
    @Modifying
    @Query(value = "DELETE FROM forum_post_likes WHERE post_id = :postId", nativeQuery = true)
    void deleteAllLikesByPostId(@Param("postId") int postId);
    
    @Modifying
    @Query(value = "DELETE FROM forum_post_saves WHERE forum_post_id = :postId", nativeQuery = true)
    void deleteAllSavesByPostId(@Param("postId") int postId);
    
    @Modifying
    @Query(value = "DELETE FROM forum_comments WHERE forum_post_id = :postId", nativeQuery = true)
    void deleteAllCommentsByPostId(@Param("postId") int postId);
}
