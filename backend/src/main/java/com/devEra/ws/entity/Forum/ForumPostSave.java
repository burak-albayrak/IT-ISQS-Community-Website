package com.devEra.ws.entity.Forum;

import com.devEra.ws.core.enums.CreatorType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "forum_post_saves")
public class ForumPostSave {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int savedBy;

    @Enumerated(EnumType.STRING)
    private CreatorType savedByType;

    @Column(name = "saved_at")
    private java.time.LocalDateTime savedAt;

    @ManyToOne
    @JoinColumn(name = "forum_post_id")
    private ForumPost forumPost;
}
