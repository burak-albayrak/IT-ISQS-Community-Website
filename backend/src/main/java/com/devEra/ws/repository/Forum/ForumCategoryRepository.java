package com.devEra.ws.repository.Forum;

import com.devEra.ws.entity.Forum.ForumCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ForumCategoryRepository extends JpaRepository<ForumCategory, Integer> {
    
    @Query("SELECT c.categoryId FROM ForumCategory c")
    List<Integer> findAllCategoryIds();
    
    @Query("SELECT c.name FROM ForumCategory c WHERE c.categoryId = :id")
    String findNameById(@Param("id") int id);
}