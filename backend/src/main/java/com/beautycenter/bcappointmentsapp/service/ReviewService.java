package com.beautycenter.bcappointmentsapp.service;

import com.beautycenter.bcappointmentsapp.model.Client;
import com.beautycenter.bcappointmentsapp.model.Favorites;
import com.beautycenter.bcappointmentsapp.model.Review;
import com.beautycenter.bcappointmentsapp.model.Salon;
import com.beautycenter.bcappointmentsapp.model.dto.ReviewDTO;
import com.beautycenter.bcappointmentsapp.model.dto.SalonDTO;

import java.util.List;

public interface ReviewService {
    List<Review> findAll();
    List<Review> findAllBySalonId(Long id);
    List<Review> findAllByClientId(Long id);
    Review findbyId(Long id);

    Review create( ReviewDTO reviewDTO);
    Review update(Long id,  ReviewDTO reviewDTO);

    void delete(Long id);

}
