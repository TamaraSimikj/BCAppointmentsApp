package com.beautycenter.bcappointmentsapp.repository;


import com.beautycenter.bcappointmentsapp.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}
