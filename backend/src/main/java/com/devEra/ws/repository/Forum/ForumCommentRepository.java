package com.devEra.ws.repository.Forum;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devEra.ws.core.enums.CreatorType;
import com.devEra.ws.entity.Forum.ForumComment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository
public interface ForumCommentRepository extends JpaRepository<ForumComment, Integer> {
    
    // Bir forum gönderisine ait tüm ana yorumları bul (parent_comment_id = null)
    List<ForumComment> findByForumPostIDAndParentCommentIDIsNullOrderByCreatedAtDesc(int forumPostID);
    
    // Bir ana yoruma ait tüm cevapları bul
    List<ForumComment> findByParentCommentIDOrderByCreatedAtAsc(int parentCommentID);
    
    // Bir forum gönderisine ait tüm yorumları bul
    List<ForumComment> findByForumPostIDOrderByCreatedAtDesc(int forumPostID);
    
    // Bir kullanıcının yaptığı tüm yorumları bul
    List<ForumComment> findByCreatedByAndCreatedByTypeOrderByCreatedAtDesc(int createdBy, CreatorType createdByType);

    // Bir kullanıcının yaptığı yorum sayısını say
    Long countByCreatedBy(int userId);
     
    // Bir kullanıcının yorum yaptığı forum gönderilerinin ID'lerini bul
    @Query("SELECT DISTINCT fc.forumPostID FROM ForumComment fc WHERE fc.createdBy = :userId")
    List<Integer> findForumPostIdByCreatedBy(@Param("userId") int userId);
}
