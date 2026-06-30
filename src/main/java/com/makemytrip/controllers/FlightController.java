package com.makemytrip.controllers;

import com.makemytrip.models.Flight;
import com.makemytrip.repositories.FlightRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class FlightController {

    private final FlightRepository flightRepository;

    public FlightController(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    @GetMapping("/flight")
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    @PostMapping("/admin/flight")
    public Flight addFlight(@RequestBody Flight flight) {
        return flightRepository.save(flight);
    }
}
