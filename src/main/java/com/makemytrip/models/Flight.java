package com.makemytrip.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "flights") 
public class Flight {
    @Id
    private String id;
    private String flightName;
    private String fromCity;
    private String toCity;
    private String departureTime;
    private String arrivalTime;
    private double price;
    private int availableSeats;
}