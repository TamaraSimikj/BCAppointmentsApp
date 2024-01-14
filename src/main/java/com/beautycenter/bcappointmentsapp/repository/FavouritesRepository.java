package com.beautycenter.bcappointmentsapp.repository;


import com.beautycenter.bcappointmentsapp.model.Client;
import com.beautycenter.bcappointmentsapp.model.Favorites;
import com.beautycenter.bcappointmentsapp.model.Salon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavouritesRepository extends JpaRepository<Favorites, Long> {

    Favorites findByClientAndAndSalon(Client client, Salon salon);
    List<Favorites> findAllByClient_Id(Long id);
}
