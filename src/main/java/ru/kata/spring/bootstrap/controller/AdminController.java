package ru.kata.spring.bootstrap.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.bootstrap.model.Role;
import ru.kata.spring.bootstrap.model.User;
import ru.kata.spring.bootstrap.service.RoleService;
import ru.kata.spring.bootstrap.service.UserService;

import java.util.List;


@Controller
@RequestMapping("/admin")
public class AdminController {

    private List<Role> allRolesList;
    private final UserService userService;
    private final RoleService rolesService;

    public AdminController(UserService userService, RoleService rolesService) {
        this.userService = userService;
        this.rolesService = rolesService;
        this.allRolesList = rolesService.getAllRoles();
    }

    @GetMapping("/")
    public String showAllUsers(@ModelAttribute("user") User user, Model model) {
        User currentUser = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        model.addAttribute("currentUser", currentUser);
        model.addAttribute("allUsers", userService.getAllUsers());
        model.addAttribute("roles", allRolesList);
        return "admin";
    }

    @PostMapping()
    public String saveUser(@ModelAttribute("user") User user) {
        userService.saveUser(user);
        return "redirect:/admin/";
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable("id") int id) {
        userService.deleteUser(id);
        return "redirect:/admin/";
    }

}