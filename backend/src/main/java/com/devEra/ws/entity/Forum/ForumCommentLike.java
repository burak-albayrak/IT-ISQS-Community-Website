package com.devEra.ws.entity.Forum;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

import com.devEra.ws.core.enums.CreatorType;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "forum_comment_likes", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"comment_id", "user_id", "user_type"})
})
public class ForumCommentLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private int likeID;

    @Column(name = "comment_id", nullable = false)
    private int commentId;

    @Column(name = "user_id", nullable = false)
    private int userId;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_type", nullable = false)
    private CreatorType userType;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}