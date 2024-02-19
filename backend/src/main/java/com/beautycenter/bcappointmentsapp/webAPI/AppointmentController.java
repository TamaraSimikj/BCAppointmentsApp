package com.beautycenter.bcappointmentsapp.webAPI;

import com.beautycenter.bcappointmentsapp.model.Appointment;
import com.beautycenter.bcappointmentsapp.model.BookingTime;
import com.beautycenter.bcappointmentsapp.model.dto.AppointmentDTO;
import com.beautycenter.bcappointmentsapp.model.dto.BookingTimeSlotsDTO;
import com.beautycenter.bcappointmentsapp.service.AppointmentService;
import com.beautycenter.bcappointmentsapp.service.BookingTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/appointments")
public class AppointmentController {
 private final BookingTimeService bookingTimeService;
    private final AppointmentService appointmentService;

    @Autowired
    private PlatformTransactionManager transactionManager;


    public AppointmentController(BookingTimeService bookingTimeService, AppointmentService appointmentService) {
        this.bookingTimeService = bookingTimeService;
        this.appointmentService = appointmentService;
    }
    @GetMapping("/allbookingTimes")
    public ResponseEntity<List<BookingTime>> getAllBookingTimes() {
        try {

            List<BookingTime> bookingSlots = bookingTimeService.findAll();
            return ResponseEntity.ok(bookingSlots);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/bookingTime/{id}")
    public ResponseEntity<BookingTime> getBookingTimeById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(bookingTimeService.findbyId(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

@GetMapping("/slots")
public ResponseEntity<List<BookingTimeSlotsDTO>> getSlotsByDate(@RequestParam("date") String dateString,
                                                                @RequestParam("serviceId") Long serviceId) {
    try {
       LocalDateTime date = LocalDateTime.parse(dateString); // DateTimeFormatter.ISO_LOCAL_DATE_TIME
//        System.out.println("date" + date + "serviceId" + serviceId);
        List<BookingTimeSlotsDTO> bookingSlots = bookingTimeService.findAllByDate(date,serviceId);
        return ResponseEntity.ok(bookingSlots);
    } catch (Exception e) {
        return ResponseEntity.badRequest().build();
    }
}

    @GetMapping("/all")
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        try {
            List<Appointment> appointments = appointmentService.listAll();
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/allByClient/{id}")
    public ResponseEntity<List<Appointment>> getAllAppointmentsForClient(@PathVariable Long id) {
        try {

            List<Appointment> appointments = appointmentService.listAllByClientId(id);
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/allBySalon/{id}")
    public ResponseEntity<List<Appointment>> getAllAppointmentsForSalon(@PathVariable Long id) {
        try {

            List<Appointment> appointments = appointmentService.listAllBySalonId(id);
            return ResponseEntity.ok(appointments);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(appointmentService.findbyId(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

//    @PostMapping("/create")
//    public ResponseEntity<Appointment> createAppointment(@RequestBody AppointmentDTO appointmentDTO) {
//        try {
//            Appointment createdAppointment = appointmentService.create(appointmentDTO);
//            return ResponseEntity.ok(createdAppointment);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().build();
//        }
//    }

    @PostMapping("/create")
    public ResponseEntity<?> createAppointment(@RequestBody AppointmentDTO appointmentDTO) {
        try {
            // Begin a database transaction
            TransactionStatus transactionStatus = transactionManager.getTransaction(new DefaultTransactionDefinition());

            // Check if an appointment already exists for the given booking time
            boolean appointmentExists = appointmentService.existsByBookingTime(appointmentDTO.getBookingTime());
            if (appointmentExists) {
                // Rollback the transaction
                transactionManager.rollback(transactionStatus);
                return ResponseEntity.badRequest().body("Appointment already exists for the given booking time.");
            }

            // Create the appointment
            Appointment createdAppointment = appointmentService.create(appointmentDTO);

            // Commit the transaction
            transactionManager.commit(transactionStatus);

            return ResponseEntity.ok(createdAppointment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to create appointment.");
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable Long id, @RequestBody AppointmentDTO appointmentDTO) {
        try {
            Appointment updatedAppointment = appointmentService.update(id, appointmentDTO);
            return ResponseEntity.ok(updatedAppointment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        try {
            appointmentService.delete(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/updateStatus/{id}")
    public ResponseEntity<Appointment> updateAppointmentStatus(@PathVariable Long id, @RequestParam("status") String status) {
        try {
            Appointment updatedAppointment = appointmentService.updateStatus(id, status);
            return ResponseEntity.ok(updatedAppointment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
//    @PutMapping("/decline/{id}")
//    public ResponseEntity<Appointment> declineAppointment(@PathVariable Long id) {
//        try {
//            Appointment declinedAppointment = appointmentService.decline(id);
//            return ResponseEntity.ok(declinedAppointment);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().build();
//        }
//    }
}
