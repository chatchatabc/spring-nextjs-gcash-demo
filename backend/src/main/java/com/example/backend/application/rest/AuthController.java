package com.example.backend.application.rest;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.application.dto.LoginRequest;
import com.example.backend.application.dto.LoginResponse;
import com.example.backend.domain.model.User;
import com.example.backend.domain.repository.UserRepository;
import com.example.backend.domain.service.JwtService;
import com.example.backend.domain.service.UserService;

@RestController
public class AuthController {

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private UserService userService;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  JwtService jwtService;

  /**
   * Login API
   * 
   * @param loginRequest
   * @return
   */
  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
              loginRequest.getPassword()));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    Optional<User> user = userRepository.findByUsername(loginRequest.getUsername());
    if (!user.isPresent()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
    String token = jwtService.generateToken(user.get());
    LoginResponse loginResponse = new LoginResponse(token, user.get().getUsername(),
        user.get().getEmail(), user.get().getAuthorities());
    return ResponseEntity.ok(loginResponse);
  }

  @PostMapping("/register")
  public ResponseEntity<String> register(@RequestBody User user) {
    try {
      userService.register(user);
      return ResponseEntity.status(HttpStatus.CREATED).build();
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }
  }
}
