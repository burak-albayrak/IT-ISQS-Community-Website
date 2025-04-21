package com.devEra.ws.repository.Forum;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devEra.ws.entity.Forum.ForumCategory;

import java.util.Optional;

@Repository
public interface ForumCategoryRepository extends JpaRepository<ForumCategory, Integer> {
    Optional<ForumCategory> findByName(String name);
} 