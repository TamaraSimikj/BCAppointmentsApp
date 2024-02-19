package com.beautycenter.bcappointmentsapp.service.impl;


import com.beautycenter.bcappointmentsapp.model.Client;
import com.beautycenter.bcappointmentsapp.model.Employee;
import com.beautycenter.bcappointmentsapp.model.Salon;
import com.beautycenter.bcappointmentsapp.model.User;
import com.beautycenter.bcappointmentsapp.model.dto.RegisterDTO;
import com.beautycenter.bcappointmentsapp.model.dto.UserDTO;
import com.beautycenter.bcappointmentsapp.model.enums.Role;
import com.beautycenter.bcappointmentsapp.model.exceptions.InvalidUsernameOrPasswordException;
import com.beautycenter.bcappointmentsapp.model.exceptions.UsernameAlreadyExistsException;
import com.beautycenter.bcappointmentsapp.model.exceptions.NotFoundException;

import com.beautycenter.bcappointmentsapp.repository.ClientRepository;
import com.beautycenter.bcappointmentsapp.repository.EmployeeRepository;
import com.beautycenter.bcappointmentsapp.repository.SalonRepository;
import com.beautycenter.bcappointmentsapp.repository.UserRepository;
import com.beautycenter.bcappointmentsapp.service.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final EmployeeRepository employeeRepository;
    private final ClientRepository clientRepository;
    private final SalonRepository salonRepository;

    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, EmployeeRepository employeeRepository, ClientRepository clientRepository, SalonRepository salonRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.employeeRepository = employeeRepository;
        this.clientRepository = clientRepository;
        this.salonRepository = salonRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<User> findAll() {
        return this.userRepository.findAll();
    }

    @Override
    public List<User> findAllAdmins() {
        return this.userRepository.findAllByRole(Role.ROLE_ADMIN);
    }

    @Override
    public User findbyId(Long id) {
        return this.userRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    public User create(UserDTO userDTO) {
        String username = userDTO.getUsername();
        String password = userDTO.getPassword();


        if (username == null || username.isEmpty() || password == null || password.isEmpty()) {
            throw new InvalidUsernameOrPasswordException();
        }

        if (userRepository.findByUsername(username) != null) {
            throw new UsernameAlreadyExistsException(username);
        }

        User user = new User(username,passwordEncoder.encode(password),userDTO.getRole());
        return userRepository.save(user);
    }
    public User create(String username, String password, Role role) {
        if (username == null || username.isEmpty() || password == null || password.isEmpty()) {
            throw new InvalidUsernameOrPasswordException();
        }

        if (userRepository.findByUsername(username) != null) {
            throw new UsernameAlreadyExistsException(username);
        }

        User user = new User(username,passwordEncoder.encode(password), role);
        return userRepository.save(user);
    }

    @Override
    public User update(Long id,UserDTO userDTO) {
        User existingUser = this.findbyId(id);

        if (userRepository.findByUsername(userDTO.getUsername()) != null) {
            throw new UsernameAlreadyExistsException(userDTO.getUsername());
        }
        else{
            existingUser.setUsername(userDTO.getUsername());
        }
        existingUser.setRole(userDTO.getRole());
        if(!userDTO.getPassword().equals("")){
            existingUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }
        return userRepository.save(existingUser);
    }

    @Override
    public void deleteById(Long id) {

        userRepository.deleteById(id);
//                User deleteUser = this.findbyId(id);
//                deleteUser.setEnabled(false);
       // userRepository.deleteById(id); // da ne brise , samo enabled na false
    }

//    @Override
//    public User register(RegisterDTO registerDTO) {
//        User newUser = create(registerDTO.getUsername(),registerDTO.getPassword(),registerDTO.getRole());
//
//        if(registerDTO.getRole().equals(Role.ROLE_EMPLOYEE)){
//            Salon salon = this.salonRepository.findById(registerDTO.getSalonId()).orElseThrow(()-> new NotFoundException("Salon with ID " + registerDTO.getSalonId() + " not found"));
//            Employee newEmpl = new Employee(registerDTO.getName(),
//                    registerDTO.getPhoneNumber(),registerDTO.getSurname(),registerDTO.getEmail(),salon);
//            this.employeeRepository.save(newEmpl);
//            newUser.setEmployee(newEmpl);
//        }else if(registerDTO.getRole().equals(Role.ROLE_CLIENT)){
//            Client newClient = new Client(registerDTO.getName(),
//                    registerDTO.getPhoneNumber(),registerDTO.getSurname(),registerDTO.getEmail());
//            this.clientRepository.save(newClient);
//            newUser.setClient(newClient);
//        }
//        return this.userRepository.save(newUser);
//    }
@Override
public User registerEmployee(RegisterDTO registerDTO) {
    User newUser = create(registerDTO.getUsername(),registerDTO.getPassword(),registerDTO.getRole());
      //  Salon salon = this.salonRepository.findById(registerDTO.getSalonId()).orElseThrow(()-> new NotFoundException("Salon with ID " + registerDTO.getSalonId() + " not found"));
        Employee newEmpl = new Employee(registerDTO.getName(),
                registerDTO.getSurname(),registerDTO.getPhoneNumber(),registerDTO.getEmail(),registerDTO.getSalon());
        this.employeeRepository.save(newEmpl);
        newUser.setEmployee(newEmpl);

    return this.userRepository.save(newUser);
}

    @Override
    public User registerAdmin(UserDTO userDTO) {
       // User admin = new User(userDTO);
        User admin = create(userDTO.getUsername(),userDTO.getPassword(),userDTO.getRole());
        return this.userRepository.save(admin);
    }

//    @Override
//    public Employee registerEmployee(RegisterDTO registerDTO) {
//        User newUser = create(registerDTO.getUsername(),registerDTO.getPassword(),registerDTO.getRole());
//
//        Salon salon = this.salonRepository.findById(registerDTO.getSalonId()).orElseThrow(()-> new NotFoundException("Salon with ID " + registerDTO.getSalonId() + " not found"));
//
//        Employee newEmpl = new Employee(newUser,registerDTO.getName(),
//                registerDTO.getPhoneNumber(),registerDTO.getSurname(),registerDTO.getEmail(),salon);
//        return this.employeeRepository.save(newEmpl);
//    }

//
    @Override
    public User registerClient(RegisterDTO registerDTO) {
        User newUser = create(registerDTO.getUsername(),registerDTO.getPassword(),registerDTO.getRole());
            Client newClient = new Client(registerDTO.getName(),
                    registerDTO.getPhoneNumber(),registerDTO.getSurname(),registerDTO.getEmail());
            this.clientRepository.save(newClient);
            newUser.setClient(newClient);

        return this.userRepository.save(newUser);
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
         return this.userRepository.findByUsername(username);
    }
}
