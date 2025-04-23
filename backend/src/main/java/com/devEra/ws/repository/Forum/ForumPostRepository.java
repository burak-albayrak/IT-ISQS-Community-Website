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
public interface ForumPostRepository extends JpaRepository<ForumPost,Integer> {
    
    // Kullanıcının oluşturduğu gönderiler
    List<ForumPost> findByCreatedByAndCreatorType(Integer createdBy, CreatorType creatorType);
    
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
    
    // Başlık veya açıklamaya göre arama
    List<ForumPost> findByTitleContainingOrDescriptionContaining(String titleQuery, String descriptionQuery);
    
    // Kategori içeren postları bul
    List<ForumPost> findByCategoriesContaining(ForumCategory category);
    
    // Kategori ve başlık/açıklamaya göre arama
    List<ForumPost> findByCategoriesContainingAndTitleContainingOrDescriptionContaining(
            ForumCategory category, String titleQuery, String descriptionQuery);
            
    // En son oluşturulan 3 gönderiyi getir
    List<ForumPost> findTop3ByOrderByCreatedAtDesc();
}
