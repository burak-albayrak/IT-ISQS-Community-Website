package com.devEra.ws.entity;


import jakarta.persistence.*;
import lombok.*;
import com.devEra.ws.entity.enums.ContentType;

@Entity
@Table(name = "user_likes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserLikes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "userID", nullable = false)
    private User user;

    private Long contentID; // Beğenilen içerik ID'si

    @Enumerated(EnumType.STRING)
    private ContentType contentType; // İçerik türü: ForumPost, Blog, Comment
}

