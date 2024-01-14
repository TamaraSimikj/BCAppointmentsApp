package com.beautycenter.bcappointmentsapp.repository;


import com.beautycenter.bcappointmentsapp.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
