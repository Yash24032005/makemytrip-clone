package com.makemytrip.services;
import com.makemytrip.models.Cancellation;
import com.makemytrip.repositories.CancellationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CancellationService {
    @Autowired
    private CancellationRepository cancellationRepository;

    public Cancellation processCancellation(String bookingId, String reason) {
        Cancellation cancellation = new Cancellation();
        cancellation.setBookingId(bookingId);
        cancellation.setCancellationReason(reason);
        cancellation.setRefundStatus("PROCESSED");
        return cancellationRepository.save(cancellation);
    }

    public List<Cancellation> getUserCancellations(String userId) {
        return cancellationRepository.findByUserId(userId);
    }
}
