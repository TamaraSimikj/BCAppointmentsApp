package com.beautycenter.bcappointmentsapp.webAPI;

import com.beautycenter.bcappointmentsapp.model.BookingTime;
import com.beautycenter.bcappointmentsapp.model.dto.BookingTimeSlotsDTO;
import com.beautycenter.bcappointmentsapp.service.BookingTimeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/appointments")
public class AppointmentController {
 private final BookingTimeService bookingTimeService;

    public AppointmentController(BookingTimeService bookingTimeService) {
        this.bookingTimeService = bookingTimeService;
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
}
