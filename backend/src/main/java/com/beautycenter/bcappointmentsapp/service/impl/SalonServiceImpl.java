package com.beautycenter.bcappointmentsapp.service.impl;

import com.beautycenter.bcappointmentsapp.model.Client;
import com.beautycenter.bcappointmentsapp.model.Favorites;
import com.beautycenter.bcappointmentsapp.model.Salon;
import com.beautycenter.bcappointmentsapp.model.dto.SalonDTO;
import com.beautycenter.bcappointmentsapp.model.exceptions.NotFoundException;
import com.beautycenter.bcappointmentsapp.repository.FavouritesRepository;
import com.beautycenter.bcappointmentsapp.repository.SalonRepository;
import com.beautycenter.bcappointmentsapp.service.SalonService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SalonServiceImpl implements SalonService {
    private final SalonRepository salonRepository;
    private final FavouritesRepository favouritesRepository;


    public SalonServiceImpl(SalonRepository salonRepository, FavouritesRepository favouritesRepository) {
        this.salonRepository = salonRepository;

        this.favouritesRepository = favouritesRepository;
    }

    @Override
    public List<Salon> findAll() {
        return this.salonRepository.findAll();
    }

    @Override
    public List<Salon> findAllFavoritesForClient(Long id) {
        List<Favorites> favorites = this.favouritesRepository.findAllByClient_Id(id);
        List<Salon> salons = favorites.stream()
                .map(Favorites::getSalon)
                .collect(Collectors.toList());
        return salons;
    }

//    @Override
//    public Salon create(String name, String address, String number,String email) {
//        Salon newSalon = new Salon(name,address,number,email);
//        return salonRepository.save(newSalon);
//    }

    @Override
    public Salon update(Long id, SalonDTO updatedSalon) {
        Salon salon = this.findbyId(id);
        salon.setName(updatedSalon.getName());
        salon.setAddress(updatedSalon.getAddress());
        salon.setLatitude(updatedSalon.getLatitude());
        salon.setLongitude(updatedSalon.getLongitude());
        salon.setNumber(updatedSalon.getNumber());
        salon.setEmail(updatedSalon.getEmail());
        if (updatedSalon.getImage().length() > 255) {
            salon.setImage("https://toppng.com/uploads/preview/beauty-center-png-beauty-center-logo-png-11556097776anielza4zb.png");
        } else {
            salon.setImage(updatedSalon.getImage());
        }

        return this.salonRepository.save(salon);
    }


    @Override
    public void delete(Long id) {
        this.salonRepository.deleteById(id);
    }



    @Override
    public Salon findbyId(Long id) {
        return this.salonRepository.findById(id).orElseThrow(() -> new NotFoundException("Salon with ID " + id + " not found"));
    }

    @Override
    public Salon create(SalonDTO salonDTO) {
        Salon salon = new Salon(salonDTO);
        return this.salonRepository.save(salon);
    }

    @Override
    public Favorites removeFromFavorites(Client client, Salon salon) {
        Favorites fav =  this.favouritesRepository.findByClientAndAndSalon(client,salon);
        this.favouritesRepository.delete(fav);
        return fav;
    }

    @Override
    public Favorites addToFavorites(Client client, Salon salon) {
        Favorites present = this.favouritesRepository.findByClientAndAndSalon(client,salon);
        System.out.println("present" +present);
        if(present ==null){
            Favorites favorites = new Favorites(client,salon);
            return this.favouritesRepository.save(favorites);
        }
        return present;
    }

    @Override
    public List<Favorites> findAllByClientId(Long clientId) {
        return this.favouritesRepository.findAllByClient_Id(clientId);
    }
}
