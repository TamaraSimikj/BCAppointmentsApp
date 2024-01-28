package com.beautycenter.bcappointmentsapp.webAPI;

import com.beautycenter.bcappointmentsapp.model.Favorites;
import com.beautycenter.bcappointmentsapp.model.Salon;
import com.beautycenter.bcappointmentsapp.model.dto.FavoritesRequest;
import com.beautycenter.bcappointmentsapp.model.dto.SalonDTO;
import com.beautycenter.bcappointmentsapp.model.exceptions.ErrorResponse;
import com.beautycenter.bcappointmentsapp.model.exceptions.NotFoundException;
import com.beautycenter.bcappointmentsapp.service.SalonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/salons")
//@RequestMapping(value = "/api/salons", produces = MediaType.APPLICATION_JSON_VALUE)
public class SalonController{

    private final SalonService salonService;

    public SalonController(SalonService salonService) {
        this.salonService = salonService;
    }

    @GetMapping()
    public  ResponseEntity<List<Salon>> showSalons() {
        return  ResponseEntity.ok(this.salonService.findAll());
    }

    @GetMapping("/allFavorites/{id}")
    public  ResponseEntity<List<Salon>> showFavoritesSalons(@PathVariable Long id) {
        return  ResponseEntity.ok(this.salonService.findAllFavoritesForClient(id));
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getSalonById(@PathVariable Long id) {
        try {
            Salon salon = this.salonService.findbyId(id);
            return ResponseEntity.ok(salon);
        } catch (NotFoundException e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/add")
    public ResponseEntity<?> createSalon(@RequestBody SalonDTO salonDTO) {
        try {
            Salon createdSalon = salonService.create(salonDTO);
            return new ResponseEntity<>(createdSalon, HttpStatus.CREATED);
        }catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse("An error occurred while creating the salon"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Salon> updateSalon(@PathVariable Long id, @RequestBody SalonDTO salonDTO) {
        Salon updatedSalon = salonService.update(id, salonDTO);
        return new ResponseEntity<>(updatedSalon, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSalon(@PathVariable Long id) {
        this.salonService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("favorites/{id}")
    public ResponseEntity<?> getFavoritesByClientId(@PathVariable Long id){
        try {
            List<Favorites> favorites = this.salonService.findAllByClientId(id);
            return ResponseEntity.ok(favorites);
        } catch (NotFoundException e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/addToFavourites")
    public ResponseEntity<?> addToFavourites(@RequestBody FavoritesRequest favreq) {
        try {
           Favorites fav = salonService.addToFavorites(favreq.getClient(),favreq.getSalon());
            return new ResponseEntity<>(fav, HttpStatus.CREATED);
        }catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse("An error occurred while adding to favorites"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/removeFromFavorites")
    public ResponseEntity<?> removeFromFavorites(@RequestBody FavoritesRequest favreq) {
        try {
            Favorites deletedFav = this.salonService.removeFromFavorites(favreq.getClient(),favreq.getSalon());
            return ResponseEntity.ok(deletedFav);
        }catch (Exception e) {
            return new ResponseEntity<>(new ErrorResponse("An error occurred while removing from favorites"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
