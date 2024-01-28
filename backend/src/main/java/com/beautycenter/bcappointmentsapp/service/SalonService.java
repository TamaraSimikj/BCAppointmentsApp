package com.beautycenter.bcappointmentsapp.service;

import com.beautycenter.bcappointmentsapp.model.Client;
import com.beautycenter.bcappointmentsapp.model.Favorites;
import com.beautycenter.bcappointmentsapp.model.Salon;
import com.beautycenter.bcappointmentsapp.model.dto.SalonDTO;

import java.util.List;

public interface SalonService {

    List<Salon> findAll();
    List<Salon> findAllFavoritesForClient(Long id);
    Salon findbyId(Long id);

//    Salon create(String name, String address, String number, String email);
    Salon create(SalonDTO salonDTO);
   Salon update(Long id, SalonDTO updatedSalonDTO);

    void delete(Long id);

    Favorites removeFromFavorites(Client client, Salon salon);

    Favorites addToFavorites(Client client, Salon salon);

    List<Favorites> findAllByClientId(Long clientId);
}
