package ru.kata.spring.rest.service;


import ru.kata.spring.rest.model.User;

import java.util.List;

public interface UserService {
    public List<User> getAllUsers();

    public void saveUser(User user);

    public void updateUser(User user);

    public User getUser(int id);

    public void deleteUser(int id);

}
