package com.beautycenter.bcappointmentsapp.service;

import com.beautycenter.bcappointmentsapp.model.BookingTime;
import com.beautycenter.bcappointmentsapp.model.dto.BookingTimeDTO;
import com.beautycenter.bcappointmentsapp.model.dto.BookingTimeRequest;
import com.beautycenter.bcappointmentsapp.model.dto.BookingTimeSlotsDTO;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public interface BookingTimeService {

    List<BookingTime> findAll();
    List<BookingTime> findAllBySalon(Long id);
    List<BookingTimeSlotsDTO> findAllByDate(LocalDateTime date,Long serviceId);
    BookingTime findbyId(Long id);

    BookingTime create(BookingTimeDTO bookingTimeDTO);

    BookingTime update(Long id,BookingTimeDTO bookingTimeDTO);

    void delete(Long id);

    void createBookingTimes(BookingTimeRequest[] bookingTimeRequest);
}
