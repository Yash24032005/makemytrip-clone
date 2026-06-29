package com.makemytrip.controllers;

import com.makemytrip.models.Flight;
import com.makemytrip.repositories.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*") // CORS error se bachne ke liye
public class FlightController {

    @Autowired
    private FlightRepository flightRepository;

    // Frontend isi endpoint se flights uthata hai homepage par
    @GetMapping("/flight")
    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    // Admin panel se flight add karne ke liye
    @PostMapping("/admin/flight")
    public Flight addFlight(@RequestBody Flight flight) {
        return flightRepository.save(flight);
    }
}