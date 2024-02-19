package com.beautycenter.bcappointmentsapp.repository;

import com.beautycenter.bcappointmentsapp.model.BookingTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

public interface BookingTimeRepository extends JpaRepository<BookingTime, Long> {
////    List<BookingTime> findAllByStartTime(LocalDateTime date);
//    List<BookingTime> findAllByStartTimeBetween(LocalDateTime startOfDay, LocalDateTime endOfDay);
//    List<BookingTime> findAllByStartTimeBetweenAndEmployee_IdIn(LocalDateTime startOfDay, LocalDateTime endOfDay,List<Long>employeeIds);
    List<BookingTime> findAllByStartTimeBetweenAndEmployee_IdInOrderByStartTime(LocalDateTime startOfDay, LocalDateTime endOfDay,List<Long>employeeIds);
    List<BookingTime> findAllByEmployee_Salon_Id(Long id);

    @Query("SELECT bt FROM BookingTime bt WHERE bt.startTime < :thresholdDateTime " +
            "AND bt.id NOT IN (SELECT a.bookingTime.id FROM Appointment a)")
    List<BookingTime> findOldTimeslotsNotInAppointments(LocalDateTime thresholdDateTime);

    default List<BookingTime> findOldTimeslotsNotInAppointments(LocalDate thresholdDate) {
        LocalDateTime thresholdDateTime = thresholdDate.atTime(LocalTime.MIN);
        return findOldTimeslotsNotInAppointments(thresholdDateTime);
    }
}
