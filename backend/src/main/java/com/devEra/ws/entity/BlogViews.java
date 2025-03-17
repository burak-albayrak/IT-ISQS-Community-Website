package com.devEra.ws.entity;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "blog_views")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BlogViews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long blogViewsID;

    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "blogID", nullable = false)
    private Blog blog;

    private LocalDateTime viewedAt = LocalDateTime.now();
}

