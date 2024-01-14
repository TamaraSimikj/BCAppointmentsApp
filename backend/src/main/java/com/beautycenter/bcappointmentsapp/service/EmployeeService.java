package com.beautycenter.bcappointmentsapp.service;

import com.beautycenter.bcappointmentsapp.model.Employee;
import com.beautycenter.bcappointmentsapp.model.EmployeesServices;
import com.beautycenter.bcappointmentsapp.model.dto.EmployeeDTO;
import  com.beautycenter.bcappointmentsapp.model.dto.UpdateAssignEmplRequest;
import java.util.List;

public interface EmployeeService {
    List<Employee> findAll();
    List<Employee> findAllBySalonId(Long id);
    Employee findbyId(Long id);

  //  Employee create(EmployeeDTO employeeDTO);

    Employee update(Long id, EmployeeDTO employeeDTO);

    void deleteById(Long id);

    List<EmployeesServices> findAllEmployeesByServiceId(Long id);

    void updateEmployeesForService(UpdateAssignEmplRequest updateAssignEmplRequest);
}
