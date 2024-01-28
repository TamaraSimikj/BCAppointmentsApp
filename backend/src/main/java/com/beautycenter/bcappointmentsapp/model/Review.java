package com.beautycenter.bcappointmentsapp.model;

import com.beautycenter.bcappointmentsapp.model.dto.ReviewDTO;
import lombok.*;
import javax.persistence.*;
import java.time.Instant;
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


    public Review(ReviewDTO reviewDTO){
        this.appointment = reviewDTO.getAppointment();
        this.comment = reviewDTO.getComment();
        this.date_time = LocalDateTime.parse(reviewDTO.getDate_time());
        this.rating = reviewDTO.getRating();
        this.client = reviewDTO.getClient();
    }
}






