package com.devEra.ws.entity;



import jakarta.persistence.*;
import lombok.*;
import com.devEra.ws.entity.enums.ContentType;
import com.devEra.ws.entity.enums.ReportReason;
import java.time.LocalDateTime;

@Entity
@Table(name = "reports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportID;

    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private User reporter;

    private Long contentID;
    
    @Enumerated(EnumType.STRING)
    private ContentType contentType;

    @Enumerated(EnumType.STRING)
    private ReportReason reason;

    private LocalDateTime reportedAt = LocalDateTime.now();
}

