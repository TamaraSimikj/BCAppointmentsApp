package com.beautycenter.bcappointmentsapp.model;

import lombok.*;
import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @MapsId
//    @OneToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "user_id", nullable = false)
//    private User user;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 100)
    private String surname;

    @Column(nullable = false, length = 20)
    private String phoneNumber;

    @Column(nullable = false, length = 150)
    private String email;

    @Column(nullable = false)
    private Integer numberOfApp;

    @Column
    private Integer points;

    @Column
    private Boolean loyaltyClub;

//    @OneToMany(mappedBy = "client")
//    private List<Review> clientReviews;

//    @OneToMany(mappedBy = "client")
//    private List<Appointment> clientAppointments;

//    @ManyToMany
//    @JoinTable(
//            name = "Favourites",
//            joinColumns = @JoinColumn(name = "client_id"),
//            inverseJoinColumns = @JoinColumn(name = "salon_id")
//    )
//    private List<Salon> favouritesSalons;

    public Client(String name,String surname,String phoneNumber,String email){

        this.name = name;
        this.surname = surname;
        this.phoneNumber = phoneNumber;
        this.email=email;
        this.numberOfApp = 0;
        this.points=0;
    }

}
