package com.makemytrip.repositories;
import com.makemytrip.models.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ReviewRepository extends MongoRepository<Review, String> {
    List<Review> findByTargetIdAndIsFlaggedFalse(String targetId);
    List<Review> findByIsFlaggedTrue();
}
