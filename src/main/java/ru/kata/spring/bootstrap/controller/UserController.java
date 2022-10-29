package ru.kata.spring.bootstrap.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.kata.spring.bootstrap.model.User;


@Controller
@RequestMapping("/user")
public class UserController {

    @GetMapping("/")
    public String showAllUsers(Model model) {
        User currentUser = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        model.addAttribute("currentUser", currentUser);
        return "user";
    }

}