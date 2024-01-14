package com.beautycenter.bcappointmentsapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeesServices {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name="employee_id")
    private Employee employee;

    @OneToOne
    @JoinColumn(name="service_id")
    private Service service;

    public EmployeesServices(Service service, Employee employee){
        this.service = service;
        this.employee = employee;
    }


}

