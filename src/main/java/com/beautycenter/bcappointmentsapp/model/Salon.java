package com.beautycenter.bcappointmentsapp.model;


import com.beautycenter.bcappointmentsapp.model.dto.SalonDTO;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Salon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "user_id", nullable = false)
    private Long id;

//    @MapsId
//    @OneToOne(cascade = CascadeType.MERGE,fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "user_id", nullable = false)
//    private User user;


    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false, length = 100)
    private String number;

    @Column(nullable = false, length = 150)
    private String email;

//    @OneToMany(mappedBy = "salon")
//    @JsonManagedReference
//    private List<Employee> salonEmployees;

//    @OneToMany(mappedBy = "salon")
//    private List<Service> salonServices;

    //dali da e iskomentirano?
//    @ManyToMany(mappedBy = "favouritesSalons")
//    private List<Client> favouritesClients;

    public Salon(String name, String address, String number, String email) {
        this.name = name;
        this.address = address;
        this.number = number;
        this.email = email;
    }

    public Salon(SalonDTO salonDTO) {
        this.name = salonDTO.getName();
        this.address = salonDTO.getAddress();
        this.number = salonDTO.getNumber();
        this.email = salonDTO.getEmail();
    }
}


