package com.devEra.ws.repository.Forum;

import com.devEra.ws.core.enums.CreatorType;
import com.devEra.ws.entity.User;
import com.devEra.ws.entity.Forum.ForumPost;
import com.devEra.ws.entity.Forum.ForumPostSave;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ForumPostSaveRepository extends JpaRepository<ForumPostSave, Integer> {

    // Kullanıcı ve creatorType'a göre kaydedilen postu bul (toggle save için)
    Optional<ForumPostSave> findByForumPostAndSavedByAndSavedByType(ForumPost forumPost, int savedBy, CreatorType savedByType);

    // Kullanıcının kaydettiği tüm postları getir
    List<ForumPostSave> findBySavedBy(int savedBy);

    // Kullanıcı + tip'e göre kaydedilen postları getir
    List<ForumPostSave> findBySavedByAndSavedByType(int savedBy, CreatorType savedByType);
}
