package com.example.backend.domain.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.example.backend.domain.model.User;

@Service
public interface UserService extends UserDetailsService {

  /**
   * Register user
   * 
   * @param user
   */
  void register(User user);
}
