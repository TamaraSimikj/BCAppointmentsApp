package com.beautycenter.bcappointmentsapp.model.enums;


import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    ROLE_ADMIN,
    //ROLE_SALON,
    ROLE_EMPLOYEE,
    ROLE_CLIENT;

    @Override
    public String getAuthority() {
        return name();
    }
}
