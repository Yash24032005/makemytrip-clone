package com.makemytrip.services;

import com.makemytrip.models.Flight;
import com.makemytrip.repositories.FlightRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FlightRadarService {

    private final FlightRepository flightRepository;

    // Constructor Parameter Injection (VS Code standard recommendation applied)
    public FlightRadarService(FlightRepository flightRepository) {
        this.flightRepository = flightRepository;
    }

    public List<Flight> getActiveFlightsRadar() {
        return flightRepository.findAll();
    }
}
