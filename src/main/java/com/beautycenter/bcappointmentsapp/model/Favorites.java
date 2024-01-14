package com.beautycenter.bcappointmentsapp.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Favorites {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name="client_id")
    private Client client;

    @OneToOne
    @JoinColumn(name="salon_id")
    private Salon salon;

    public Favorites(Client client,Salon salon) {
        this.client= client;
        this.salon = salon;
    }
    public Favorites(){
    }
}