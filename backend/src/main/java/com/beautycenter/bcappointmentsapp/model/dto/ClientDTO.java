package com.beautycenter.bcappointmentsapp.model.dto;

import lombok.Data;

import javax.persistence.Column;

@Data
public class ClientDTO {

    private String name;
    private String surname;
    private String phoneNumber;
    private String email;
    private Boolean loyaltyClub;
    private Integer numberOfApp;

}
