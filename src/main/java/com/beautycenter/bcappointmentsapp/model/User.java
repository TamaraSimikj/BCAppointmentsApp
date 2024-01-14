package com.beautycenter.bcappointmentsapp.model;


import com.beautycenter.bcappointmentsapp.model.dto.UserDTO;
import com.beautycenter.bcappointmentsapp.model.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;
import java.util.Collections;

@Entity
@Data
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 150)
    private String username;

    @Column(nullable = false, length = 100)
    private String password;


    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;


    @OneToOne
   // @Nullable
    private Client client;

    @OneToOne
   // @Nullable
    private Employee employee;

//    @OneToOne(fetch = FetchType.LAZY, mappedBy = "user")
//    private Salon salon;

//

    private boolean isAccountNonExpired = true;
    private boolean isAccountNonLocked = true;
    private boolean isCredentialsNonExpired = true;
    private boolean isEnabled = true;

    public User(UserDTO userDTO){
        this.username = userDTO.getUsername();
        this.password = userDTO.getPassword();
        this.role = userDTO.getRole();
        this.client = null;
        this.employee = null;

    }
    public User(String username,String password,Role role){
        this.username = username;
        this.password =password;
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(role);
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return isAccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isCredentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }
}
