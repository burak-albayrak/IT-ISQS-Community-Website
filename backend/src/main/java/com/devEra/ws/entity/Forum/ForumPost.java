package com.devEra.ws.entity.Forum;

import com.devEra.ws.core.enums.CreatorType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "forum_posts")
public class ForumPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "forum_post_id")
    private int forumPostID;

    @Size(min = 5, max = 255, message = "Title must be between 5 and 255 characters.")
    @NotBlank(message = "Title cannot be blank.")
    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @NotBlank(message = "Description cannot be blank.")
    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @ElementCollection
    @CollectionTable(name = "forum_post_media", joinColumns = @JoinColumn(name = "forum_post_id"))
    @Column(name = "media_url")
    private List<String> mediaList = new ArrayList<>();

    @Column(name = "likes_count")
    private int likesCount = 0;

    @Column(name = "comment_count")
    private int commentCount = 0;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private ForumCategory category;

    @Column(name = "created_by")
    private int createdBy;

    @Enumerated(EnumType.STRING)
    @Column(name = "created_by_type")
    private CreatorType createdByType;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    // Transient fields for creator details (not persisted)
    @Transient
    private String creatorName;

    @Transient
    private String creatorProfilePic;
}