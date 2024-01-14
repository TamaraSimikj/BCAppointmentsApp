package com.beautycenter.bcappointmentsapp.model;

import javax.persistence.*;

import com.beautycenter.bcappointmentsapp.model.enums.AppointmentStatus;
import lombok.*;

import java.util.List;
import java.util.Set;

@Entity
@Data
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AppointmentStatus status;

    @Column(nullable = false)
    private Integer price;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_time_id", nullable = false)
    private BookingTime bookingTime;

    @ManyToOne
    @JoinColumn(name = "salon_id")
    private Salon salon;

     @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "payment_id")
    private Payment payment;
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "payment_id", nullable = false)
//    private Payment payment;

//    @OneToMany(mappedBy = "appointment")
//    private List<Review> appointmentReviews;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id", nullable = false)
    private Service service;



}

