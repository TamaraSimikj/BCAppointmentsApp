package com.beautycenter.bcappointmentsapp.service;



import com.beautycenter.bcappointmentsapp.model.Client;
import com.beautycenter.bcappointmentsapp.model.Employee;
import com.beautycenter.bcappointmentsapp.model.User;
import com.beautycenter.bcappointmentsapp.model.dto.RegisterDTO;
import com.beautycenter.bcappointmentsapp.model.dto.UserDTO;
import com.beautycenter.bcappointmentsapp.model.enums.Role;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService extends UserDetailsService {

    List<User> findAll();

    User findbyId(Long id);

    User create(UserDTO userDTO);

    User create(String username,String password, Role role);
    User update(Long id, UserDTO userDTO);

    void deleteById(Long id);

    User registerEmployee(RegisterDTO registerDTO);
    User registerClient(RegisterDTO registerDTO);
    User registerAdmin(UserDTO userDTO);

}
