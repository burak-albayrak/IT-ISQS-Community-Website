package com.devEra.ws.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devEra.ws.entity.ForumPost;

public interface ForumPostRepository extends JpaRepository<ForumPost,Integer>{
    
}
