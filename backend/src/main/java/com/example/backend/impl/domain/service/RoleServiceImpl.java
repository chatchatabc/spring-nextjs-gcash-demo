package com.example.backend.impl.domain.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.domain.model.Role;
import com.example.backend.domain.repository.RoleRepository;
import com.example.backend.domain.service.RoleService;

@Service
public class RoleServiceImpl implements RoleService {

  @Autowired
  RoleRepository roleRepository;

  /**
   * Create roles
   */
  @Override
  public void createRoles() {
    List<String> roleNames = Arrays.asList("ROLE_ADMIN", "ROLE_GUEST");
    List<Role> roles = roleRepository.findRolesByNameIn(roleNames);
    if (roles.isEmpty()) {
      Role adminRole = Role.builder().name("ROLE_ADMIN").build();
      Role guestRole = Role.builder().name("ROLE_GUEST").build();
      roleRepository.saveAll(Arrays.asList(adminRole, guestRole));
    }
  }

}
