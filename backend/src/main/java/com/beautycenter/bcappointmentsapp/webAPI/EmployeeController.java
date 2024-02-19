package com.beautycenter.bcappointmentsapp.webAPI;

import com.beautycenter.bcappointmentsapp.model.BookingTime;
import com.beautycenter.bcappointmentsapp.model.Employee;
import com.beautycenter.bcappointmentsapp.model.EmployeesServices;
import com.beautycenter.bcappointmentsapp.model.dto.BookingTimeRequest;
import com.beautycenter.bcappointmentsapp.model.dto.EmployeeDTO;
import com.beautycenter.bcappointmentsapp.model.dto.UpdateAssignEmplRequest;
import com.beautycenter.bcappointmentsapp.model.exceptions.ErrorResponse;
import com.beautycenter.bcappointmentsapp.service.BookingTimeService;
import com.beautycenter.bcappointmentsapp.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/employees")
public class EmployeeController {
    private final EmployeeService employeeService;
    private final BookingTimeService bookingTimeService;


    public EmployeeController(EmployeeService employeeService, BookingTimeService bookingTimeService) {
        this.employeeService = employeeService;
        this.bookingTimeService = bookingTimeService;
    }

    @GetMapping
    public ResponseEntity<List<Employee>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.findAll());
    }

    @GetMapping("/all/{id}")
    public ResponseEntity<List<Employee>> getAllEmployeesForSalon(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.findAllBySalonId(id));
    }
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.findbyId(id));
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id, @RequestBody EmployeeDTO employeeDTO) {
        try {
            Employee updatedEmpl = employeeService.update(id, employeeDTO);
            return new ResponseEntity<>(updatedEmpl, HttpStatus.OK);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        employeeService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/bookingTimes")
    public ResponseEntity<List<BookingTime>> getAllBookingTimes() {
        return ResponseEntity.ok(bookingTimeService.findAll());
    }
    @GetMapping("/bookingTimesBySalon/{id}")
    public ResponseEntity<List<BookingTime>> getAllBookingTimesForSalon(@PathVariable Long id) {
        return ResponseEntity.ok(bookingTimeService.findAllBySalon(id));
    }

    @PostMapping("/createBookingTimes")
    public ResponseEntity<?> createBookingTimes(@RequestBody BookingTimeRequest[] bookingTimeRequest) {
        try {
            System.out.println("booking time create called with" +bookingTimeRequest);
            bookingTimeService.createBookingTimes(bookingTimeRequest);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/listEmployeesByService/{id}")
    public ResponseEntity<List<EmployeesServices>> getAllEmployeesForService(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.findAllEmployeesByServiceId(id));
    }

    @PutMapping("/updateAssigneEmployees")
    public ResponseEntity<?> updateEmployeesForService(@RequestBody UpdateAssignEmplRequest updateAssignEmplRequest) {
        try {
            employeeService.updateEmployeesForService(updateAssignEmplRequest);
            return new ResponseEntity<>( HttpStatus.OK);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/deleteOldTimeslots")
    public ResponseEntity<Void> deleteOldTimeslots() {
        bookingTimeService.deleteOldTimeslots();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
