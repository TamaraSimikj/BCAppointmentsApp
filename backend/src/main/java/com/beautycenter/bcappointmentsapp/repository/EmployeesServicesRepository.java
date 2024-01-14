package com.beautycenter.bcappointmentsapp.repository;

import com.beautycenter.bcappointmentsapp.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeesServicesRepository extends JpaRepository<EmployeesServices,Long> {
    EmployeesServices findByEmployeeAndService(Employee employee, Service service);
    List<EmployeesServices> findAllByService_Id(Long id);

}
