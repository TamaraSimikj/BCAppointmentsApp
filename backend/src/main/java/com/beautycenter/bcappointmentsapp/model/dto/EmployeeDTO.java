package com.beautycenter.bcappointmentsapp.model.dto;

import lombok.Data;

@Data
public class EmployeeDTO {
//    private Long id;
    private String name;
    private String surname;
    private String phoneNumber;
    private String email;
    private Long salonId;
}
