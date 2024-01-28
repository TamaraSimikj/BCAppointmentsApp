package com.beautycenter.bcappointmentsapp.service.impl;

import com.beautycenter.bcappointmentsapp.model.Review;
import com.beautycenter.bcappointmentsapp.model.dto.ReviewDTO;
import com.beautycenter.bcappointmentsapp.model.exceptions.NotFoundException;
import com.beautycenter.bcappointmentsapp.repository.ReviewRepository;
import com.beautycenter.bcappointmentsapp.service.ReviewService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;

    public ReviewServiceImpl(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Override
    public List<Review> findAll() {
        return this.reviewRepository.findAll();
    }

//    @Override
//    public List<Review> findAllBySalon(Long id) {
//        return reviewRepository.findBySalonId(id);
//    }
    @Override
    public List<Review> findAllBySalonId(Long salonId) {
        List<Review> allReviews = reviewRepository.findAll();
        return allReviews.stream()
                .filter(review -> review.getAppointment().getService().getSalon().getId().equals(salonId))
                .collect(Collectors.toList());
    }
    @Override
    public List<Review> findAllByClientId(Long id) {

        return reviewRepository.findAllByClient_Id(id);
    }

    @Override
    public Review findbyId(Long id) {
        return this.reviewRepository.findById(id).orElseThrow(NotFoundException::new);
    }

    @Override
    public Review create(ReviewDTO reviewDTO) {
        Review newReview = new Review(reviewDTO);
        return this.reviewRepository.save(newReview);
    }

    @Override
    public Review update(Long id, ReviewDTO reviewDTO) {
        Review review = this.findbyId(id);
        review.setAppointment(reviewDTO.getAppointment());
        review.setComment(reviewDTO.getComment());
        review.setDate_time(LocalDateTime.parse(reviewDTO.getDate_time()));
        review.setRating(reviewDTO.getRating());
        review.setClient(reviewDTO.getClient());
        return this.reviewRepository.save(review);
    }

    @Override
    public void delete(Long id) {
        this.reviewRepository.deleteById(id);
    }
}
