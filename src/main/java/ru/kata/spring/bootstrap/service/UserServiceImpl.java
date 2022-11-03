package ru.kata.spring.bootstrap.service;

import org.hibernate.Hibernate;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.bootstrap.dao.RoleRepository;
import ru.kata.spring.bootstrap.dao.UserRepository;
import ru.kata.spring.bootstrap.model.User;

import java.util.List;


@Service
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    @Transactional(readOnly = false)
    public void saveUser(User user) {
        userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = false)
    public void updateUser(User user) {
        userRepository.save(user);
    }

    @Override
    public User getUser(int id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional(readOnly = false)
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        Hibernate.initialize(user.getRoles());
        return user;
    }

}
