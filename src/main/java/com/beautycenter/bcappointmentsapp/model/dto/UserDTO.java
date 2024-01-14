package com.beautycenter.bcappointmentsapp.model.dto;

import com.beautycenter.bcappointmentsapp.model.enums.Role;
import lombok.*;

@Data
@AllArgsConstructor
public class UserDTO {
    private String username;
    private String password;
//    private String repeatPassword;
    private Role role;
//    private String email;
//    private boolean enabled;
}
