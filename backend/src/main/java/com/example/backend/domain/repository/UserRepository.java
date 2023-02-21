package com.example.backend.domain.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.domain.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  /**
   * Find user by username
   * 
   * @param username
   * @return
   */
  Optional<User> findByUsername(String username);
}
