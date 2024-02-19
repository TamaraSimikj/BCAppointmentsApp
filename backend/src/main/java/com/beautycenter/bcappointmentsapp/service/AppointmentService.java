package com.beautycenter.bcappointmentsapp.service;

import com.beautycenter.bcappointmentsapp.model.Appointment;
import com.beautycenter.bcappointmentsapp.model.BookingTime;
import com.beautycenter.bcappointmentsapp.model.dto.AppointmentDTO;

import java.util.List;

public interface AppointmentService {
    List<Appointment> listAll();
    List<Appointment> listAllByClientId(Long id);

    List<Appointment> listAllBySalonId(Long id);

    Appointment findbyId(Long Id);

    boolean existsByBookingTime(BookingTime bookingTime);

    Appointment create(AppointmentDTO appointmentDTO);

    Appointment update(Long id,AppointmentDTO appointmentDTO);
    Appointment updateStatus(Long id,String status);
//    Appointment decline(Long id);

    void delete(Long id);
}
