package com.beautycenter.bcappointmentsapp.model;

import lombok.*;
import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String comment;

    @Column(nullable = false)
    private Integer rating;

    private LocalDateTime date_time;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private Client client;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    private Appointment ratedAppointment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_id", nullable = false)
    private Appointment appointment;
}






