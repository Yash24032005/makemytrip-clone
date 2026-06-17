package com.makemytrip.controllers;
import com.makemytrip.models.Cancellation;
import com.makemytrip.services.CancellationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cancellations")
@CrossOrigin(origins = "http://localhost:3000")
public class CancellationController {
    @Autowired
    private CancellationService cancellationService;

    @PostMapping("/trigger")
    public ResponseEntity<Cancellation> triggerCancellation(@RequestParam String bookingId, @RequestParam String reason) {
        return ResponseEntity.ok(cancellationService.processCancellation(bookingId, reason));
    }

    @GetMapping("/tracker")
    public ResponseEntity<List<Cancellation>> getRefundHistory(@RequestParam String userId) {
        return ResponseEntity.ok(cancellationService.getUserCancellations(userId));
    }
}
