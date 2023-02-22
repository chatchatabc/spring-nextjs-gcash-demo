package com.example.backend.impl.domain.service;

import java.time.Instant;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.backend.domain.model.User;
import com.example.backend.domain.service.JwtService;

@Service
public class JwtServiceImpl implements JwtService {

  private final Algorithm hmac512;
  private final JWTVerifier verifier;

  @Value("${jwt.expiration}")
  private Long expiration;

  public JwtServiceImpl(@Value("${jwt.secret}") String secret) {
    this.hmac512 = Algorithm.HMAC512(secret);
    this.verifier = JWT.require(this.hmac512).build();
  }

  /**
   * Generate token
   */
  @Override
  public String generateToken(User user) {
    return JWT.create()
        .withSubject(user.getId().toString())
        .withExpiresAt(Date.from(Instant.now().plusSeconds(expiration)))
        .sign(hmac512);
  }

  /**
   * Validate token and get id
   */
  @Override
  public String validateTokenAndGetId(String token) {
    try {
      return verifier.verify(token).getSubject();
    } catch (Exception e) {
      return null;
    }
  }

}
