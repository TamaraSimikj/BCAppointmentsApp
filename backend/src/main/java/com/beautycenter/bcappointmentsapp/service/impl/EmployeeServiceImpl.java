package com.beautycenter.bcappointmentsapp.service.impl;

import com.beautycenter.bcappointmentsapp.model.Employee;
import com.beautycenter.bcappointmentsapp.model.EmployeesServices;
import com.beautycenter.bcappointmentsapp.model.Service;
import com.beautycenter.bcappointmentsapp.model.dto.EmployeeDTO;
import com.beautycenter.bcappointmentsapp.model.dto.UpdateAssignEmplRequest;
import com.beautycenter.bcappointmentsapp.model.exceptions.NotFoundException;
import com.beautycenter.bcappointmentsapp.repository.EmployeeRepository;
import com.beautycenter.bcappointmentsapp.repository.EmployeesServicesRepository;
import com.beautycenter.bcappointmentsapp.service.EmployeeService;
import com.beautycenter.bcappointmentsapp.service.SalonService;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@org.springframework.stereotype.Service
public class EmployeeServiceImpl implements EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final SalonService salonService;
    private final EmployeesServicesRepository employeesServicesRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository, SalonService salonService, EmployeesServicesRepository employeesServicesRepository) {
        this.employeeRepository = employeeRepository;
        this.salonService = salonService;
        this.employeesServicesRepository = employeesServicesRepository;
    }

    @Override
    public List<Employee> findAll() {
        return this.employeeRepository.findAll();
    }

    @Override
    public List<Employee> findAllBySalonId(Long id) {
        return this.employeeRepository.findAllBySalon_Id(id);
    }

    @Override
    public Employee findbyId(Long id) {
        return this.employeeRepository.findById(id).orElseThrow(NotFoundException::new);
    }

//    @Override
//    public Employee create(EmployeeDTO employeeDTO) {
//        User user = new User();
//
//        return null;
//    }

    @Override
    public Employee update(Long id, EmployeeDTO employeeDTO) {
        Employee empl = this.findbyId(id);
        empl.setName(employeeDTO.getName());
        empl.setSurname(employeeDTO.getSurname());
        empl.setEmail(employeeDTO.getEmail());
        empl.setPhoneNumber(employeeDTO.getPhoneNumber());
        empl.setSalon(this.salonService.findbyId(employeeDTO.getSalonId()));

        return this.employeeRepository.save(empl);
    }

    @Override
    public void deleteById(Long id) {
        this.employeeRepository.deleteById(id);
    }

    @Override
    public List<EmployeesServices> findAllEmployeesByServiceId(Long id) {
        return this.employeesServicesRepository.findAllByService_Id(id);
    }

    @Override
    public void updateEmployeesForService(UpdateAssignEmplRequest updateAssignEmplRequest) {
        Service service = updateAssignEmplRequest.getService();
        System.out.println("service" +  service);
        List<EmployeesServices> currentEmployeesForService =  this.findAllEmployeesByServiceId(service.getId());
        //da vidam zasto se razlicni salonId
        List<Employee> allEmplForSalonId = this.employeeRepository.findAll();// this.employeeRepository.findAllBySalon_Id(service.getSalon().getId());
        List<Employee> employeesList = currentEmployeesForService.stream()
                .map(EmployeesServices::getEmployee)
                .collect(Collectors.toList());
        System.out.println("employeesList assigned" +  employeesList);

        List<Employee> employees = updateAssignEmplRequest.getEmployees();
        System.out.println("employees" +  employees);

        for(Employee empl : allEmplForSalonId){
            if(!employeesList.contains(empl) && employees.contains(empl)){
                System.out.println("ne go sodrzi" + empl);
               EmployeesServices es = new EmployeesServices(service,empl);
                this.employeesServicesRepository.save(es);
           }
            else if(employeesList.contains(empl) && !employees.contains(empl)) {
                System.out.println("treba da se izbrise," + empl);
                EmployeesServices es = this.employeesServicesRepository.findByEmployeeAndService(empl,service);
                if(es != null){
                    this.employeesServicesRepository.delete(es);
                }
            }else{
                continue;
            } //okej e samo refresh da se napravi na front
        }
        // Filter employees where checked is true
//        List selectedEmployees = employees.stream()
//                .filter(x-> x.get("checked"))
//                .collect(Collectors.toList());

//        // Print selected employees
//        System.out.println("Selected Employees: " + selectedEmployees);
//        for (Object employeeMap : employees) {
//            System.out.println("employeeMap" + employeeMap);
//            if (employeeMap instanceof Map) {
//                Map<String, Object> map = (Map<String, Object>) employeeMap;
//
//                // Extract values from the map
//                Employee employee = (Employee) map.get("employee");
//                Boolean checked = (Boolean) map.get("checked");
//                System.out.println("employee" + employee);
//                System.out.println("checked" + checked);
//
//            }
//            Employee employee = (Employee) employeeMap.get("employee");
//            boolean checked = (boolean) employeeMap.get("checked");
//            if(!currentEmployeesForService.contains(employee) && checked){
//                System.out.println("ne go sodrzi" + employee);
//            }
//            else if(currentEmployeesForService.contains(employee) && !checked) {
//                System.out.println("treba da se izbrise," + employee);
//            }else{
//                continue;
//            }
    //    }
//        List allEmployees = employees.stream().forEach(x->{
//            Employee e =x.get("employee");
//            if(x.get("checked") && currentEmployeesForService.contains(x.get("employee"))){
//
//            }
//        });
//
//        // Iterate through selected employees
//        for (Map<Employee,Boolean> employeeMap : employees) {
//            Employee employee = employeeMap.get("employee");
//            boolean checked = (boolean) employeeMap.get("checked");
//
//            // Check if the employee is already present in currentEmployeesForService
//            EmployeesServices existingEmployeeService = currentEmployeesForService.stream()
//                    .filter(es -> es.getEmployee().equals(employee))
//                    .findFirst()
//                    .orElse(null);
//
//            if (checked) {
//                // If selected and not present, insert into EmployeesServices
//                if (existingEmployeeService == null) {
//                    EmployeesServices newEmployeeService = new EmployeesServices(service, employee);
//                    // Save newEmployeeService to repository or perform other operations
//                }
//            } else {
//                // If not selected and present, delete from EmployeesServices
//                if (existingEmployeeService != null) {
//                    // Delete existingEmployeeService from repository or perform other operations
//                }
//            }
//        }


    }
}
