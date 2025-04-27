package com.devEra.ws.repository.Forum;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.devEra.ws.core.enums.CreatorType;
import com.devEra.ws.entity.Forum.ForumPostLike;


@Repository
public interface ForumPostLikeRepository extends JpaRepository<ForumPostLike, Integer> {

    Optional<ForumPostLike> findByPostIdAndUserIdAndUserType(int postId, int userId, CreatorType userType);
    
    // Count likes by userId
    Long countByUserId(int userId);
    
    // Find all post IDs liked by a specific user
    @Query("SELECT pl.postId FROM ForumPostLike pl WHERE pl.userId = :userId")
    List<Integer> findForumPostIdByUserId(@Param("userId") int userId);
}
