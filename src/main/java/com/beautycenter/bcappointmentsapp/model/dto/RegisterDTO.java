package com.beautycenter.bcappointmentsapp.model.dto;

import com.beautycenter.bcappointmentsapp.model.Salon;
import com.beautycenter.bcappointmentsapp.model.enums.Role;
import lombok.Data;

@Data
public class RegisterDTO {
    private String username;
    private String password;
    private Role role;
    private String name;
    private String surname;
    private String phoneNumber;
    private String email;
    private Salon salon;
}
