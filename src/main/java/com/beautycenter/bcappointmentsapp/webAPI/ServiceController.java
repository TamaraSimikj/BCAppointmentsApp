package com.beautycenter.bcappointmentsapp.webAPI;

import com.beautycenter.bcappointmentsapp.model.Service;
import com.beautycenter.bcappointmentsapp.model.dto.ServiceDTO;
import com.beautycenter.bcappointmentsapp.model.exceptions.ErrorResponse;
import com.beautycenter.bcappointmentsapp.model.exceptions.NotFoundException;
import com.beautycenter.bcappointmentsapp.service.ServicesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/services")
public class ServiceController {

    private final ServicesService servicesService;

    public ServiceController(ServicesService servicesService) {
        this.servicesService = servicesService;
    }

    @GetMapping()
    public ResponseEntity<List<Service>> showServices() {
        return  ResponseEntity.ok(this.servicesService.findAll());
    }
    @GetMapping("/bySalon")
    public ResponseEntity<List<Service>> showServicesBySalon(@RequestParam Long id) {
        return  ResponseEntity.ok(this.servicesService.findbySalonId(id));
    }

    @GetMapping("/byCategory")
    public ResponseEntity<List<Service>> showServicesByCategory(@RequestParam Long id) {
        return  ResponseEntity.ok(this.servicesService.findbyCategoryId(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getServiceById(@PathVariable Long id) {
        try {
            Service service = this.servicesService.findbyId(id);
            return ResponseEntity.ok(service);
        } catch (NotFoundException e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/add")
    public ResponseEntity<?> createService(@RequestBody ServiceDTO serviceDTO) {
        try {
            Service createdService = servicesService.create(serviceDTO);
            return new ResponseEntity<>(createdService, HttpStatus.CREATED);
        }catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse("An error occurred while creating the service"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Service> updateService(@PathVariable Long id, @RequestBody ServiceDTO serviceDTO) {
        Service updatedService = servicesService.update(id, serviceDTO);
        return new ResponseEntity<>(updatedService, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        this.servicesService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
