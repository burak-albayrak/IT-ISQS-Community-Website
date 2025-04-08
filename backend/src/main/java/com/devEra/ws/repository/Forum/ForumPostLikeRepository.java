package com.devEra.ws.repository.Forum;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devEra.ws.core.enums.CreatorType;
import com.devEra.ws.entity.Forum.ForumPostLike;


@Repository
public interface ForumPostLikeRepository extends JpaRepository<ForumPostLike, Integer> {

    Optional<ForumPostLike> findByPostIdAndUserIdAndUserType(int postId, int userId, CreatorType userType);
    
}
