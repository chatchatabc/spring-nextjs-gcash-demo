package com.example.backend.infra;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.backend.domain.service.RoleService;

@Component
public class DataInit implements CommandLineRunner {

  @Autowired
  RoleService roleService;

  @Override
  public void run(String... args) throws Exception {
    roleService.createRoles();
  }

}
