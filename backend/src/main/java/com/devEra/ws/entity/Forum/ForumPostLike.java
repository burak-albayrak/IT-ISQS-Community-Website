package com.devEra.ws.entity.Forum;

import com.devEra.ws.core.enums.CreatorType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "forum_post_likes", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"post_id", "user_id", "user_type"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ForumPostLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "post_id", nullable = false)
    private int postId;

    @Column(name = "user_id", nullable = false)
    private int userId;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_type", nullable = false)
    private CreatorType userType;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
