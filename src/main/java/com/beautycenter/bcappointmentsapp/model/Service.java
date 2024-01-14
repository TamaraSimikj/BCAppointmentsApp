package com.beautycenter.bcappointmentsapp.model;


import lombok.*;
import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Integer value;

//    @ManyToMany(mappedBy = "employeeServices")
//    private List<Employee> serviceEmployees;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "salon_id")
    private Salon salon;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

//    @OneToMany(mappedBy = "service")
//    private List<Appointment> serviceAppointments;

    public Service(String name, String description, Integer value, Salon salon, Category category) {
        this.name = name;
        this.description = description;
        this.value = value;
        this.salon = salon;
        this.category = category;
    }
    public Service(String name, String description, Integer value) {
        this.name = name;
        this.description = description;
        this.value = value;
    }
}
