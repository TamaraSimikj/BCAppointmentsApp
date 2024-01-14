package com.beautycenter.bcappointmentsapp.model.dto;

import com.beautycenter.bcappointmentsapp.model.Employee;
import com.beautycenter.bcappointmentsapp.model.Service;
import lombok.Data;

import java.util.List;

@Data
public class UpdateAssignEmplRequest {
   Service service;
   List<Employee> employees;
}
