package com.devEra.ws.entity.Forum;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;

import com.devEra.ws.core.enums.CreatorType;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "forum_comments")
public class ForumComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "forum_comment_id")
    private int forumCommentID;

    @Column(name = "forum_post_id", nullable = false)
    private int forumPostID;

    @NotBlank(message = "Comment description cannot be blank.")
    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "likes")
    private int likes = 0;

    @Column(name = "edited")
    private boolean edited = false;
    
    // Parent comment ID - reply yapısı için
    @Column(name = "parent_comment_id")
    private Integer parentCommentID;
    
    // Yorumun cevap aldığı yorum sayısı
    @Column(name = "reply_count")
    private int replyCount = 0;

    @Column(name = "created_by")
    private int createdBy;

    @Enumerated(EnumType.STRING)
    @Column(name = "created_by_type")
    private CreatorType createdByType;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
}
