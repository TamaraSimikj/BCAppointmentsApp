package com.beautycenter.bcappointmentsapp.webAPI;

import com.beautycenter.bcappointmentsapp.model.Category;
import com.beautycenter.bcappointmentsapp.model.Review;
import com.beautycenter.bcappointmentsapp.model.dto.CategoryDTO;
import com.beautycenter.bcappointmentsapp.model.dto.ReviewDTO;
import com.beautycenter.bcappointmentsapp.model.exceptions.ErrorResponse;
import com.beautycenter.bcappointmentsapp.service.ReviewService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(value = "/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }


    @GetMapping
    public ResponseEntity<List<Review>> getAllReviews() {
        return ResponseEntity.ok(reviewService.findAll());
    }

    @GetMapping("/allBySalon/{id}")
    public ResponseEntity<List<Review>> getReviewsBySalonId( @PathVariable Long id) {
        List<Review> reviews = reviewService.findAllBySalonId(id);
        return ResponseEntity.ok(reviews);
    }
    @GetMapping("/allByClient/{id}")
    public ResponseEntity<List<Review>> getReviewsByClientId( @PathVariable Long id) {
        List<Review> reviews = reviewService.findAllByClientId(id);
        return ResponseEntity.ok(reviews);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Review> getReview(@PathVariable final Long id) {
        return ResponseEntity.ok(reviewService.findbyId(id));
    }

    @PostMapping("/add")
    public ResponseEntity<?> createReview(@RequestBody ReviewDTO reviewDTO) {
        try {
            Review review = reviewService.create(reviewDTO);

            return new ResponseEntity<>(review, HttpStatus.CREATED);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateReview(@PathVariable final Long id,
            @RequestBody ReviewDTO reviewDTO) {
        try {
            return new ResponseEntity<>(reviewService.update(id, reviewDTO), HttpStatus.OK);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable final Long id) {
        reviewService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
