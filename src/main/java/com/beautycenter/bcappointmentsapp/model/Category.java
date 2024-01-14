package com.beautycenter.bcappointmentsapp.model;

import lombok.*;
import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    private String description;
//
//    @OneToMany(mappedBy = "category")
//    private List<Service> categoryServices;

    public Category(String name,String description){
        this.name= name;
        this.description = description;
    }
}
