package com.beautycenter.bcappointmentsapp.model.dto;

import com.beautycenter.bcappointmentsapp.model.*;
import lombok.Data;

import java.util.Optional;


@Data
public class AppointmentDTO {
   String status;
   Integer price;
   Client client;
   BookingTime bookingTime;
   Salon salon;
   Employee employee;
   Payment payment;
   Service service;
}
