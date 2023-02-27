package com.example.backend.application.dto;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponse {
  private String token;
  private String username;
  private String email;
  private Collection<? extends GrantedAuthority> authorities;
}
