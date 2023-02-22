package com.example.backend.infra.config.springsecurity.filter;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.backend.domain.model.User;
import com.example.backend.domain.repository.UserRepository;
import com.example.backend.domain.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

  @Autowired
  UserRepository userRepository;

  @Autowired
  JwtService jwtService;

  /**
   * Run JWT Checking everytime a route that needs it is called
   *
   * @param request
   * @param response
   * @param filterChain
   * @throws ServletException
   * @throws IOException
   */
  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    // Get header from header
    final String header = request.getHeader(HttpHeaders.AUTHORIZATION);

    // Continue if header is null or does not start with "Bearer "
    if (header == null || !header.startsWith("Bearer ")) {
      filterChain.doFilter(request, response);
      return;
    }

    final String token = header.substring(7);
    final String id = jwtService.validateTokenAndGetId(token);

    // Validation failed or token expired
    if (id == null) {
      filterChain.doFilter(request, response);
      return;
    }

    // Set user info on Spring Security Context
    final Optional<User> user = userRepository.findById(Long.parseLong(id));

    // If user is not found, continue
    if (user.isEmpty()) {
      filterChain.doFilter(request, response);
      return;
    }

    // Set user id on request attribute
    request.setAttribute("id", user.get().getId());

    final UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user.get(), null,
        user.get().getAuthorities());
    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
    SecurityContextHolder.getContext().setAuthentication(authentication);

    // Continue to next filter
    filterChain.doFilter(request, response);
  }

}
