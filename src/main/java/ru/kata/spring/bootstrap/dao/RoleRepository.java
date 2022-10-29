package ru.kata.spring.bootstrap.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.kata.spring.bootstrap.model.Role;


public interface RoleRepository extends JpaRepository<Role, Integer> {
}
