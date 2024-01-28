package com.beautycenter.bcappointmentsapp.repository;

import com.beautycenter.bcappointmentsapp.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
//    List<Review> findByAppointmentServiceSalonId(Long salonId);
//    @Query("SELECT r FROM Review r JOIN r.appointment a JOIN a.service s WHERE s.salon.id = :salonId")
//    List<Review> findBySalonId(@Param("salonId") Long salonId);

    List<Review> findAllByClient_Id(Long id);

}
