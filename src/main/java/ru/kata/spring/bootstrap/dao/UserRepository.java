package ru.kata.spring.bootstrap.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.kata.spring.bootstrap.model.User;


public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
}
