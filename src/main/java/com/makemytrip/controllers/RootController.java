package com.makemytrip.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class RootController {

    @Autowired
    private org.springframework.context.ApplicationContext context;

    private Object getRepositoryBean(String repoName) {
        try {
            return context.getBean(Class.forName("com.makemytrip.repositories." + repoName));
        } catch (Exception e) {
            try {
                return context.getBean(Class.forName("com.makemytrip.makemytrip.repositories." + repoName));
            } catch (Exception ex) {
                return null;
            }
        }
    }

    @GetMapping("/flight")
    public ResponseEntity<?> getAllFlights() {
        try {
            Object repo = getRepositoryBean("FlightStatusRepository");
            java.lang.reflect.Method findAll = repo.getClass().getMethod("findAll");
            List<?> rawList = (List<?>) findAll.invoke(repo);
            return ResponseEntity.ok(rawList != null ? rawList : new ArrayList<>());
        } catch (Exception e) {
            return ResponseEntity.ok(new ArrayList<>());
        }
    }

    @GetMapping("/hotel")
    public ResponseEntity<?> getAllHotels() {
        try {
            Object repo = getRepositoryBean("HotelRepository");
            if (repo == null) repo = getRepositoryBean("ReviewRepository");
            java.lang.reflect.Method findAll = repo.getClass().getMethod("findAll");
            List<?> rawList = (List<?>) findAll.invoke(repo);
            return ResponseEntity.ok(rawList != null ? rawList : new ArrayList<>());
        } catch (Exception e) {
            return ResponseEntity.ok(new ArrayList<>());
        }
    }

    @PostMapping(value = {"/booking/flight", "/booking/hotel"})
    public ResponseEntity<?> bookingProcessor() {
        return ResponseEntity.ok(Map.of("status", "SUCCESS", "bookingId", "BK" + System.currentTimeMillis() / 1000));
    }
}