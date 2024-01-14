package com.beautycenter.bcappointmentsapp.repository;

import com.beautycenter.bcappointmentsapp.model.Employee;
import com.beautycenter.bcappointmentsapp.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface EmployeeRepository extends JpaRepository<Employee, Long> {

   // List<Employee> findAllByEmployeeServices(Service service);
    List<Employee> findAllBySalon_Id(Long id);

}
