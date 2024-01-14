//package com.beautycenter.bcappointmentsapp.config;
//
//import com.beautycenter.bcappointmentsapp.service.UserService;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.builders.WebSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
//
//@Configuration
//@EnableWebSecurity
//@EnableGlobalMethodSecurity(securedEnabled = true,prePostEnabled = true)
//public class SecurityConfig extends WebSecurityConfigurerAdapter {
//
//    private final PasswordEncoder passwordEncoder;
//    private final UserService userService;
//
//    public SecurityConfig(PasswordEncoder passwordEncoder, UserService userService) {
//        this.passwordEncoder = passwordEncoder;
//        this.userService = userService;
//    }
//
//    @Override
//    public void configure(WebSecurity web) throws Exception {
//        // TODO: If you are implementing the security requirements, remove this following line
//        web.ignoring().antMatchers("/**");
//    }
////
////    @Override
////    protected void configure(HttpSecurity http) throws Exception {
////        http.csrf().disable()
////                .authorizeRequests()
////                .antMatchers("/").permitAll()
////                .anyRequest().hasRole("ADMIN")
////                .and()
////                .formLogin()
////                .failureUrl("/login?error=BadCredentials")
////                .defaultSuccessUrl("/products", true)
////                .and()
////                .logout()
////                .logoutUrl("/logout")
////                .clearAuthentication(true)
////                .invalidateHttpSession(true)
////                .deleteCookies("JSESSIONID")
////                .logoutSuccessUrl("/");
////
////    }
//
//
//    @Override
//    public void configure(HttpSecurity http) throws Exception {
//        http.csrf().disable().authorizeRequests()
//                .antMatchers("/").permitAll()
//                .anyRequest().permitAll().and()
//                .formLogin().loginPage("/login")
//                .successHandler(new SavedRequestAwareAuthenticationSuccessHandler())
//                .failureUrl("/login?hasError=true&error=Username or password is incorrect")
//                .and().logout().logoutUrl("/user/logout")
//                .logoutSuccessUrl("/")
//                .deleteCookies("JSESSIONID")
//                .invalidateHttpSession(true)
//                .clearAuthentication(true);
//    }
//    @Override
//    public void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(userService);
//    }
//}
