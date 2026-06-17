package com.makemytrip.services;
import com.makemytrip.models.FlightStatus;
import com.makemytrip.repositories.FlightStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class FlightRadarService {
    @Autowired
    private FlightStatusRepository statusRepository;
    private final String[] statuses = {"ON TIME", "DELAYED BY 1H", "BOARDING", "DELAYED BY 30M"};
    private final String[] reasons = {"Weather clearance", "Late incoming aircraft", "Air traffic congestion", "None"};
    private final Random random = new Random();

    @Scheduled(fixedRate = 60000)
    public void simulateLiveFlightUpdates() {
        List<FlightStatus> allStatuses = statusRepository.findAll();
        for (FlightStatus fs : allStatuses) {
            int index = random.nextInt(statuses.length);
            fs.setStatus(statuses[index]);
            fs.setDelayReason(reasons[index]);
            fs.setLastUpdated(LocalDateTime.now());
            statusRepository.save(fs);
        }
    }
}
