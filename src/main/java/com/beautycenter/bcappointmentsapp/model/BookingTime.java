package com.beautycenter.bcappointmentsapp.model;

import lombok.*;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime startTime;
//    private Duration duration;
    @Column(nullable = false)
    private LocalTime duration;


//    @OneToMany(mappedBy = "bookingTime")
//    private List<Appointment> bookingTimeAppointments;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    public BookingTime(LocalDateTime startTime, LocalTime duration, Employee employee) {
        this.startTime = startTime;
        this.duration = duration;
        this.employee = employee;
    }
}
