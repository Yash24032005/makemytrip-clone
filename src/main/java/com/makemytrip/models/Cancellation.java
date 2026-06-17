package com.makemytrip.models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Document(collection = "cancellations")
public class Cancellation {
    @Id
    private String id;
    private String bookingId;
    private String userId;
    private String cancellationReason;
    private double paidAmount;
    private double calculatedRefundAmount;
    private String refundStatus;
    private LocalDateTime cancellationTime;
    private LocalDateTime expectedRefundCompletionTime;
}
