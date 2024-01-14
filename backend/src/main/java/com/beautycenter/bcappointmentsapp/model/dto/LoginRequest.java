package com.beautycenter.bcappointmentsapp.model.dto;

import com.beautycenter.bcappointmentsapp.model.enums.Role;
import lombok.Data;

@Data
public class LoginRequest {

    private String username;
    private String password;
    private Role role;
}