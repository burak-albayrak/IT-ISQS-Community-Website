package com.devEra.ws.repository.Forum;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devEra.ws.entity.Forum.ForumCategory;
import java.util.List;
import java.util.Optional;

@Repository
public interface ForumCategoryRepository extends JpaRepository<ForumCategory, Integer> {
    Optional<ForumCategory> findByName(String name);

    // Get all category IDs
    @Query("SELECT c.categoryId FROM ForumCategory c")
    List<Integer> findAllCategoryIds();
    
    // Find category name by ID
    @Query("SELECT c.name FROM ForumCategory c WHERE c.categoryId = :categoryId")
    String findNameById(@Param("categoryId") int categoryId);
} 

