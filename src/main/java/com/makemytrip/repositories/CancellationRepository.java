package com.makemytrip.repositories;
import com.makemytrip.models.Cancellation;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CancellationRepository extends MongoRepository<Cancellation, String> {
    List<Cancellation> findByUserId(String userId);
}
