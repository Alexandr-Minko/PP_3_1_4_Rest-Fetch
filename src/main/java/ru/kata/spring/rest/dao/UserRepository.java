package ru.kata.spring.rest.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.kata.spring.rest.model.User;


public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
}
