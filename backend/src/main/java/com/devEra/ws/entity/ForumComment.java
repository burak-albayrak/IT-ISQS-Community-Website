package com.devEra.ws.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "forum_comments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ForumComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long forumCommentID;

    @ManyToOne
    @JoinColumn(name = "forumPostID", nullable = false)
    private ForumPost forumPost;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    private int likes = 0;
    private boolean edited = false;

    @ManyToOne
    @JoinColumn(name = "createdBy", nullable = false)
    private User createdBy;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt;
}

