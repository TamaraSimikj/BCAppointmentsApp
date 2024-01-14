package com.beautycenter.bcappointmentsapp.model;

import com.beautycenter.bcappointmentsapp.model.dto.EmployeeDTO;
import com.beautycenter.bcappointmentsapp.repository.EmployeeRepository;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @MapsId
//    @OneToOne(cascade = CascadeType.MERGE,fetch = FetchType.LAZY, optional = false)
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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "salon_id", nullable = false)
   // @JsonBackReference
    private Salon salon;

//
//    @OneToMany(mappedBy = "employee")
//    private List<BookingTime> employeeBookingTimes;
//
//    @OneToMany
//    private List<Appointment> employeeAppointments;


//    @ManyToMany(fetch = FetchType.EAGER)
//    @JoinTable(
//            name = "EmployeeServices",
//            joinColumns = @JoinColumn(name = "employeeId"),
//            inverseJoinColumns = @JoinColumn(name = "serviceId")
//    )
//    private List<Service> employeeServices;


//    @ManyToMany
//    @JoinTable(
//            name = "employee_services",
//            joinColumns = @JoinColumn(name = "user_id"), //dali da e employee_id
//            inverseJoinColumns = @JoinColumn(name = "service_id")
//    )
//    private Set<Service> services;
//
//    @ManyToOne
////    @JoinColumn(name = "salon_id") dali da ima join column?
//    private Salon salon;

public Employee(String name,String surname,String phoneNumber,String email,Salon salon){
//    this.user = user;
//    this.id = user.getId();
    this.name = name;
    this.surname = surname;
    this.phoneNumber = phoneNumber;
    this.email=email;
    this.salon = salon;
}
    public Employee(EmployeeDTO employeeDTO,Salon salon){
//        this.user = user;
//        this.id = user.getId();
        this.name = employeeDTO.getName();
        this.surname = employeeDTO.getSurname();
        this.phoneNumber = employeeDTO.getPhoneNumber();
        this.email=employeeDTO.getEmail();
        this.salon = salon;
    }

}

