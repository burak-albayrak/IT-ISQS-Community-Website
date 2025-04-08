package com.devEra.ws.repository.Forum;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devEra.ws.entity.Forum.ForumComment;


@Repository
public interface ForumCommentRepository extends JpaRepository<ForumComment,Integer>{
    
}
