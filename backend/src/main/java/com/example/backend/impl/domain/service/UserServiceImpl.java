package com.example.backend.impl.domain.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.domain.model.User;
import com.example.backend.domain.repository.UserRepository;
import com.example.backend.domain.service.UserService;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  PasswordEncoder passwordEncoder;

  @Autowired
  UserRepository userRepository;

  /**
   * Register user
   * 
   * @param user
   */
  @Override
  public void register(User user) {
    // Encrypt password
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    userRepository.save(user);
  }

  /**
   * Load user by username
   * 
   * @param username
   * @return
   * @throws UsernameNotFoundException
   */
  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<User> user = userRepository.findByUsername(username);
    if (user.isEmpty()) {
      throw new UsernameNotFoundException("User not found");
    }
    return new org.springframework.security.core.userdetails.User(
        user.get().getUsername(),
        user.get().getPassword(),
        user.get().isEnabled(),
        user.get().isAccountNonExpired(),
        user.get().isCredentialsNonExpired(),
        user.get().isAccountNonLocked(),
        user.get().getAuthorities());
  }
}
