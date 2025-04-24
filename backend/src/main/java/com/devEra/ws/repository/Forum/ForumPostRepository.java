package com.devEra.ws.repository.Forum;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.devEra.ws.entity.Forum.ForumPost;
import com.devEra.ws.entity.Forum.ForumCategory;
import com.devEra.ws.core.enums.CreatorType;

import java.util.List;

@Repository
public interface ForumPostRepository extends JpaRepository<ForumPost, Integer> {
    @Query("SELECT MAX(p.likesCount) FROM ForumPost p")
    int findMaxLikesCount();
    
    @Query("SELECT MAX(p.commentCount) FROM ForumPost p")
    int findMaxCommentCount();
    
    @Query("SELECT p FROM ForumPost p LEFT JOIN FETCH p.categories")
    List<ForumPost> findAllWithCategoryAndCounts();
    
    @Query("SELECT p.title FROM ForumPost p WHERE p.forumPostID = :id")
    String findTitleById(int id);
    
    List<ForumPost> findByTitleContainingOrDescriptionContaining(String title, String description);
    
    List<ForumPost> findByCategoriesContaining(ForumCategory category);
    
    List<ForumPost> findByCategoriesContainingAndTitleContainingOrDescriptionContaining(
        ForumCategory category, String title, String description);
    
    List<ForumPost> findTop3ByOrderByCreatedAtDesc();
    
    @Query("SELECT p FROM ForumPost p ORDER BY p.likesCount DESC, p.commentCount DESC")
    List<ForumPost> findAllOrderByLikesAndCommentsDesc();
    
    List<ForumPost> findByCreatedByAndCreatorType(int createdBy, CreatorType creatorType);
    
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
