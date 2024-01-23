package com.beautycenter.bcappointmentsapp.webAPI;


import com.beautycenter.bcappointmentsapp.model.Employee;
import com.beautycenter.bcappointmentsapp.model.User;
import com.beautycenter.bcappointmentsapp.model.dto.LoginRequest;
import com.beautycenter.bcappointmentsapp.model.dto.RegisterDTO;
import com.beautycenter.bcappointmentsapp.model.dto.UserDTO;
import com.beautycenter.bcappointmentsapp.model.exceptions.ErrorResponse;
import com.beautycenter.bcappointmentsapp.model.exceptions.NotFoundException;
import com.beautycenter.bcappointmentsapp.model.exceptions.UsernameAlreadyExistsException;
import com.beautycenter.bcappointmentsapp.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/admins")
    public ResponseEntity<List<User>> getAllAdmins() {
        return ResponseEntity.ok(userService.findAllAdmins());
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findbyId(id));
    }

    @PostMapping(value = "/users/add")
    public ResponseEntity<User> addUser(@RequestBody UserDTO userDTO) {
        User createdUser = userService.create(userDTO);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PostMapping(value = "/registerEmployee")
    public ResponseEntity<?> registerEmployee(@RequestBody RegisterDTO registerDTO) {
        try {
            return new ResponseEntity<>( userService.registerEmployee(registerDTO), HttpStatus.CREATED);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping(value = "/register")
    public ResponseEntity<?> register(@RequestBody RegisterDTO registerDTO) {
        try {
            return new ResponseEntity<>( userService.registerClient(registerDTO), HttpStatus.CREATED);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/register-admin")
    public ResponseEntity<?> registerAdmin(@RequestBody UserDTO userDTO) {
        try {
            return new ResponseEntity<>( userService.registerAdmin(userDTO), HttpStatus.CREATED);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        try {
            User updatedUser = userService.update(id, userDTO);
            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    @PostMapping(value = "/login")
//    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
//        try {
//            return new ResponseEntity<>( userService.registerClient(registerDTO), HttpStatus.CREATED);
//        } catch (Exception e) {
//            ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
//            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
//        }
//    }



}
