package com.devEra.ws.repository.Forum;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devEra.ws.entity.Forum.ForumPost;


@Repository
public interface ForumPostRepository extends JpaRepository<ForumPost,Integer>{
    
}
