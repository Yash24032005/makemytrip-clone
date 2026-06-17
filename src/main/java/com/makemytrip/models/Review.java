package com.makemytrip.models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Document(collection = "reviews")
public class Review {
    @Id
    private String id;
    private String targetId;
    private String userId;
    private String userName;
    private int rating;
    private String reviewText;
    private List<String> uploadedPhotos;
    private boolean isFlagged;
    private LocalDateTime createdAt;
}
