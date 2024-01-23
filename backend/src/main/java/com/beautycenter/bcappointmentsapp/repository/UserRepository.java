package com.beautycenter.bcappointmentsapp.repository;


import com.beautycenter.bcappointmentsapp.model.User;
import com.beautycenter.bcappointmentsapp.model.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Long> {


    User findByUsername(String username);
    List<User> findAllByRole(Role role);

}
