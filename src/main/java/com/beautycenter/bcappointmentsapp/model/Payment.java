package com.beautycenter.bcappointmentsapp.model;

import javax.persistence.*;

@Entity
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String paymentInfo;

    @Column(nullable = false, length = 100)
    private String status;

    @Column(nullable = false)
    private Boolean online;

    @Column(length = 100, unique = true)
    private String paymentId;

    //    @OneToMany(mappedBy = "payment")
//    private Set<Appointment> paymentAppointments;
//    @OneToOne
//    @JoinColumn(name = "appointment_id")
//    private Appointment appointment;

}
