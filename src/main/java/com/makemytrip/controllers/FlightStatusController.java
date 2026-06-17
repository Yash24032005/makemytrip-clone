package com.makemytrip.controllers;
import com.makemytrip.models.FlightStatus;
import com.makemytrip.repositories.FlightStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "http://localhost:3000")
public class FlightStatusController {
    @Autowired
    private FlightStatusRepository statusRepository;

    @GetMapping("/live/{flightId}")
    public ResponseEntity<FlightStatus> getLiveFlightStatus(@PathVariable String flightId) {
        FlightStatus status = statusRepository.findByFlightId(flightId)
                .orElseGet(() -> {
                    FlightStatus dummy = new FlightStatus();
                    dummy.setFlightId(flightId);
                    dummy.setStatus("ON TIME");
                    return statusRepository.save(dummy);
                });
        return ResponseEntity.ok(status);
    }
}
