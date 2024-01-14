package com.beautycenter.bcappointmentsapp.repository;

import com.beautycenter.bcappointmentsapp.model.BookingTime;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingTimeRepository extends JpaRepository<BookingTime, Long> {
}
