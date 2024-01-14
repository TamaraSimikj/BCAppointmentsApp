package com.beautycenter.bcappointmentsapp.config.filters;

import com.beautycenter.bcappointmentsapp.config.JWTTokenProvider;
import com.beautycenter.bcappointmentsapp.model.dto.LoginRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    public JWTAuthenticationFilter(
            AuthenticationManager authenticationManager,
            UserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        try {
            StringBuilder builder = new StringBuilder();
            request.getReader().lines().forEach(builder::append);

            LoginRequest loginRequest = new ObjectMapper().readValue(builder.toString().trim(), LoginRequest.class);
            System.out.println(loginRequest.getUsername());

            String username = loginRequest.getUsername();
            String password = loginRequest.getPassword();

            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if(userDetails ==null){
                throw new RuntimeException("Username does't exist!");
            }
            if (!passwordEncoder.matches(password, userDetails.getPassword())) {
                throw new RuntimeException("Credentials do not match!");
            }

            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            userDetails.getUsername(),
                            userDetails.getPassword(),
                            userDetails.getAuthorities()
                    )
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


    @Override
    protected void successfulAuthentication(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain,
            Authentication authResult
    ) {
        UserDetails user = (UserDetails) authResult.getPrincipal();
        String token = JWTTokenProvider.generateJwtToken(user);

      //  response.setHeader("Authorization", "Bearer " + token); //dodadeno od mene
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        try {
            new ObjectMapper().writeValue(response.getOutputStream(), Map.of("access_token", token, "user", user));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}