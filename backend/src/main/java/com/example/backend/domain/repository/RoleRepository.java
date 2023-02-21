package com.example.backend.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.domain.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  /**
   * Find Roles by Name
   * 
   * @param roleNames
   * @return
   */
  List<Role> findRolesByNameIn(List<String> roleNames);

  /**
   * Find Role by Name
   * 
   * @param roleName
   * @return
   */
  Role findByName(String roleName);
}
