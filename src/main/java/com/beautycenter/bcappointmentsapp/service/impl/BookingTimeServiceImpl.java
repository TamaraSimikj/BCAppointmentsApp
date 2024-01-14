package com.beautycenter.bcappointmentsapp.service.impl;

import com.beautycenter.bcappointmentsapp.model.BookingTime;
import com.beautycenter.bcappointmentsapp.model.Employee;
import com.beautycenter.bcappointmentsapp.model.dto.BookingTimeDTO;
import com.beautycenter.bcappointmentsapp.model.dto.BookingTimeRequest;
import com.beautycenter.bcappointmentsapp.model.exceptions.NotFoundException;
import com.beautycenter.bcappointmentsapp.repository.BookingTimeRepository;
import com.beautycenter.bcappointmentsapp.service.BookingTimeService;
import com.beautycenter.bcappointmentsapp.service.EmployeeService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.time.LocalDateTime;


@Service
public class BookingTimeServiceImpl implements BookingTimeService {
    private final BookingTimeRepository bookingTimeRepository;
    private final EmployeeService employeeService;

    public BookingTimeServiceImpl(BookingTimeRepository bookingTimeRepository, EmployeeService employeeService) {
        this.bookingTimeRepository = bookingTimeRepository;
        this.employeeService = employeeService;
    }

    @Override
    public List<BookingTime> findAll() {
        return this.bookingTimeRepository.findAll();
    }

    @Override
    public BookingTime findbyId(Long id) {
        return this.bookingTimeRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Override
    public BookingTime create(BookingTimeDTO bookingTimeDTO) {
        Employee employee = this.employeeService.findbyId(bookingTimeDTO.getEmployeeId());
        BookingTime bt = new BookingTime(bookingTimeDTO.getStartTime(),bookingTimeDTO.getDuration(),employee);
        return this.bookingTimeRepository.save(bt);
    }

    @Override
    public BookingTime update(Long id,BookingTimeDTO bookingTimeDTO) {
        BookingTime bt = this.findbyId(id);
        bt.setStartTime(bookingTimeDTO.getStartTime());
        bt.setDuration(bookingTimeDTO.getDuration());
        bt.setEmployee(this.employeeService.findbyId(bookingTimeDTO.getEmployeeId()));
        return this.bookingTimeRepository.save(bt);
    }

    @Override
    public void delete(Long id) {
        this.bookingTimeRepository.deleteById(id);
    }

    @Override
    public void createBookingTimes(BookingTimeRequest[] bookingTimeRequests) {
        System.out.println("called from service " + Arrays.asList(bookingTimeRequests));
        List<BookingTimeRequest> employeeBTData =  Arrays.stream(bookingTimeRequests).toList();

        // Iterate over each BookingTimeRequest
        for (BookingTimeRequest request : employeeBTData) {
            // Split the date string into individual dates
            String[] dateStrings = request.getDates().split(",");

            // Parse fromTime and toTime strings to LocalTime
            LocalTime fromTime = LocalTime.parse(request.getFromTime());
            LocalTime toTime = LocalTime.parse(request.getToTime());
            LocalTime fromTime1 = LocalTime.parse(request.getFromTime1());
            LocalTime toTime1 = LocalTime.parse(request.getToTime1());
            int duration = request.getSlotsDuration().intValue();

            // Iterate over each date
            for (String dateString : dateStrings) {
                LocalDate date = LocalDate.parse(dateString, DateTimeFormatter.ofPattern("dd/MM/yyyy"));

                // Create BookingTimeDTO instances based on the time range and slotsDuration
                List<BookingTime> bookingTimes = generateBookingTimes(date, fromTime, toTime, duration, request.getEmployee().getId());
                List<BookingTime> bookingTimes2 = generateBookingTimes(date, fromTime1, toTime1, duration, request.getEmployee().getId());

                // Use the bookingTimes list as needed (e.g., save to the database)
                System.out.println("Generated booking times: " + bookingTimes +"booking times2" + bookingTimes2);
            }
        }
    }

    private List<BookingTime> generateBookingTimes(LocalDate date, LocalTime fromTime, LocalTime toTime, int slotsDuration, long employeeId) {
        List<BookingTime> bookingTimes = new ArrayList<>();
        LocalDateTime currentDateTime = LocalDateTime.of(date, fromTime);

        // Iterate over the time range with the specified slotsDuration
        while (currentDateTime.plusMinutes(slotsDuration).isBefore(LocalDateTime.of(date, toTime))) {
            BookingTimeDTO bookingTime = new BookingTimeDTO();
            bookingTime.setStartTime(currentDateTime);
            bookingTime.setDuration(LocalTime.of(0, slotsDuration));
            bookingTime.setEmployeeId(employeeId);

            // Add the generated BookingTimeDTO to the list
            bookingTimes.add( this.create(bookingTime));


            // Move to the next time slot
            currentDateTime = currentDateTime.plusMinutes(slotsDuration);
        }

        return bookingTimes;
    }
}