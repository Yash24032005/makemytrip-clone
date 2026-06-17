package com.makemytrip.controllers;
import com.makemytrip.models.Review;
import com.makemytrip.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {
    @Autowired
    private ReviewRepository reviewRepository;

    @PostMapping("/submit")
    public ResponseEntity<Review> submitReview(@RequestBody Review review) {
        review.setCreatedAt(LocalDateTime.now());
        review.setFlagged(false);
        return ResponseEntity.ok(reviewRepository.save(review));
    }

    @GetMapping("/service/{targetId}")
    public ResponseEntity<List<Review>> getReviews(@PathVariable String targetId) {
        return ResponseEntity.ok(reviewRepository.findByTargetIdAndIsFlaggedFalse(targetId));
    }
}
