package com.devEra.ws.repository.Forum;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.devEra.ws.core.enums.CreatorType;
import com.devEra.ws.entity.Forum.ForumCategory;
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
    
    // Metin içeriğine göre arama
    @Query("SELECT p FROM ForumPost p WHERE LOWER(p.title) LIKE LOWER(CONCAT('%', :searchText, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :searchText, '%'))")
    List<ForumPost> findByTitleOrDescriptionContainingIgnoreCase(@Param("searchText") String searchText);
    
    // Kategori bazlı filtreleme
    List<ForumPost> findByCategory(ForumCategory category);
    
    // Kategori bazlı filtreleme ve metin araması
    @Query("SELECT p FROM ForumPost p WHERE p.category = :category AND (LOWER(p.title) LIKE LOWER(CONCAT('%', :searchText, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :searchText, '%')))")
    List<ForumPost> findByCategoryAndTitleOrDescriptionContainingIgnoreCase(@Param("category") ForumCategory category, @Param("searchText") String searchText);

    /**
     * Finds the most recent N forum posts ordered by creation date descending.
     *
     * @param count The maximum number of posts to return.
     * @return A list of the most recent forum posts.
     */
    List<ForumPost> findTop3ByOrderByCreatedAtDesc(); // Finds top 3 posts

    // Find the maximum likes count among all posts
    @Query("SELECT COALESCE(MAX(p.likesCount), 0) FROM ForumPost p")
    int findMaxLikesCount();
    
    // Find the maximum comment count among all posts
    @Query("SELECT COALESCE(MAX(p.commentCount), 0) FROM ForumPost p")
    int findMaxCommentCount();
    
    // Find all posts with their categories and counts
    @Query("SELECT p FROM ForumPost p LEFT JOIN FETCH p.category")
    List<ForumPost> findAllWithCategoryAndCounts();
    
    // Find post title by ID
    @Query("SELECT p.title FROM ForumPost p WHERE p.forumPostID = :postId")
    String findTitleById(@Param("postId") int postId);
    
    // Find all posts ordered by likes and comments count (popularity)
    @Query("SELECT p FROM ForumPost p ORDER BY (p.likesCount + p.commentCount) DESC")
    List<ForumPost> findAllOrderByLikesAndCommentsDesc();

    @Query("SELECT p FROM ForumPost p ORDER BY p.commentCount DESC")
    List<ForumPost> findAllOrderByCommentsDesc();
}
