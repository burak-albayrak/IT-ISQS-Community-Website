package com.devEra.ws.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devEra.ws.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

}
