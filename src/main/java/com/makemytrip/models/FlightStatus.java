package com.makemytrip.models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Document(collection = "flight_statuses")
public class FlightStatus {
    @Id
    private String id;
    private String flightId;
    private String status;
    private String delayReason;
    private LocalDateTime revisedDeparture;
    private LocalDateTime lastUpdated;
}
