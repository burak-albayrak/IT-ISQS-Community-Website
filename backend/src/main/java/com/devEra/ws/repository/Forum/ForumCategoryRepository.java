package com.devEra.ws.repository.Forum;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.devEra.ws.entity.Forum.ForumCategory;

import java.util.List;
import java.util.Optional;

@Repository
public interface ForumCategoryRepository extends JpaRepository<ForumCategory, Integer> {
    @Query("SELECT c.categoryId FROM ForumCategory c")
    List<Integer> findAllCategoryIds();
    
    @Query("SELECT c.name FROM ForumCategory c WHERE c.categoryId = :categoryId")
    String findNameById(int categoryId);
    
    Optional<ForumCategory> findByName(String name);
} 