package com.beautycenter.bcappointmentsapp.repository;


import com.beautycenter.bcappointmentsapp.model.Appointment;
import com.beautycenter.bcappointmentsapp.model.BookingTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    @Query("SELECT a.bookingTime FROM Appointment a " +
            "WHERE a.bookingTime.startTime BETWEEN :startOfDay AND :endOfDay " +
            "AND a.service.id = :serviceId")
    List<BookingTime> findBookedTimes(
            @Param("startOfDay") LocalDateTime startOfDay,
            @Param("endOfDay") LocalDateTime endOfDay,
            @Param("serviceId") Long serviceId
    );

    @Query("SELECT a.bookingTime FROM Appointment a " +
            "WHERE a.bookingTime.startTime BETWEEN :startOfDay AND :endOfDay " +
            "AND a.service.id = :serviceId " +
            "AND a.status != 'DECLINED'")
    List<BookingTime> findBookedTimesWhereStatusNotDeclined(
            @Param("startOfDay") LocalDateTime startOfDay,
            @Param("endOfDay") LocalDateTime endOfDay,
            @Param("serviceId") Long serviceId
    );
    List<Appointment> findAllByClient_Id(Long id);
    List<Appointment> findAllBySalon_Id(Long id);
    List<Appointment> findAllByClient_IdOrderByBookingTimeDesc(Long id);
    List<Appointment> findAllBySalon_IdOrderByBookingTimeDesc(Long id);

    Boolean existsByBookingTime(BookingTime bookingTime);

    Appointment findByBookingTime_Id(Long id);

}
