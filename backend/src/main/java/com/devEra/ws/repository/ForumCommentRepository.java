package com.devEra.ws.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devEra.ws.entity.ForumComment;

public interface ForumCommentRepository extends JpaRepository<ForumComment,Integer>{
    
}
