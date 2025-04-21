package com.devEra.ws.repository.Forum;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devEra.ws.core.enums.CreatorType;
import com.devEra.ws.entity.Forum.ForumCommentLike;

@Repository
public interface ForumCommentLikeRepository extends JpaRepository<ForumCommentLike, Integer> {
    
    // Kullanıcının belirli bir yorumu beğenip beğenmediğini kontrol et
    Optional<ForumCommentLike> findByCommentIdAndUserIdAndUserType(int commentId, int userId, CreatorType userType);
    
    // Belirli bir yoruma ait beğeni sayısını bul
    long countByCommentId(int commentId);
} 