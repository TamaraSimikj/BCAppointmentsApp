package com.beautycenter.bcappointmentsapp.repository;

import com.beautycenter.bcappointmentsapp.model.BookingTime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface BookingTimeRepository extends JpaRepository<BookingTime, Long> {
////    List<BookingTime> findAllByStartTime(LocalDateTime date);
//    List<BookingTime> findAllByStartTimeBetween(LocalDateTime startOfDay, LocalDateTime endOfDay);
//    List<BookingTime> findAllByStartTimeBetweenAndEmployee_IdIn(LocalDateTime startOfDay, LocalDateTime endOfDay,List<Long>employeeIds);
    List<BookingTime> findAllByStartTimeBetweenAndEmployee_IdInOrderByStartTime(LocalDateTime startOfDay, LocalDateTime endOfDay,List<Long>employeeIds);
    List<BookingTime> findAllByEmployee_Salon_Id(Long id);
}
