package com.example.backend.domain.service;

import org.springframework.stereotype.Service;

import com.example.backend.domain.model.User;

@Service
public interface JwtService {

  /**
   * Generate token
   * 
   * @param user
   * @return
   */
  public String generateToken(User user);

  /**
   * Validate token and get id
   * 
   * @param token
   * @return
   */
  public String validateTokenAndGetId(String token);
}
