package com.devEra.ws.repository;

import com.devEra.ws.entity.UserLikes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLikesRepository extends JpaRepository<UserLikes, Long> {
}
