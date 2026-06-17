package com.makemytrip.repositories;
import com.makemytrip.models.FlightStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface FlightStatusRepository extends MongoRepository<FlightStatus, String> {
    Optional<FlightStatus> findByFlightId(String flightId);
}
