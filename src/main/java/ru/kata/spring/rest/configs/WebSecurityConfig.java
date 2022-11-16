package ru.kata.spring.rest.configs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final SuccessUserHandler successUserHandler;
    private final UserDetailsService userDetailsService;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public WebSecurityConfig(SuccessUserHandler successUserHandler, @Lazy UserDetailsService userDetailsService, @Lazy PasswordEncoder passwordEncoder) {
        this.successUserHandler = successUserHandler;
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf()
                .disable()

                .authorizeRequests()
                .antMatchers("/login").permitAll()
                .antMatchers("/admin/**").hasRole("ADMIN")
                .antMatchers("/user", "/api").hasAnyRole("USER", "ADMIN")
                .anyRequest().authenticated()

                .and()
                .formLogin().successHandler(successUserHandler)
                .loginPage("/login")
                .loginProcessingUrl("/process_login")
                .failureUrl("/login?error")

                .and()
                .logout()
                // чтобы делать logout GET-ом, из ссылки <a..
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"));
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder authMB) throws Exception {
        authMB.userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder);
    }
}