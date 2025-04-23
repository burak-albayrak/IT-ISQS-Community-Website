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

    @NotBlank(message = "Title cannot be blank")
    @Size(min = 2, max = 100, message = "Title must be between 2 and 100 characters")
    @Column(name = "title", nullable = false)
    private String title;

    @NotBlank(message = "Description cannot be blank")
    @Size(min = 2, max = 2000, message = "Description must be between 2 and 2000 characters")
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "media_list")
    private String mediaList;

    @Column(name = "likes_count")
    private int likesCount;
    
    @Column(name = "comment_count")
    private int commentCount;

    @Column(name = "created_by")
    private Integer createdBy;

    @Column(name = "creator_type")
    @Enumerated(EnumType.STRING)
    private CreatorType creatorType;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")

    private LocalDateTime updatedAt;
    
    // Birden fazla kategori ile ilişki (maksimum 3 kategori)
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "forum_post_categories",
        joinColumns = @JoinColumn(name = "forum_post_id"),
        inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<ForumCategory> categories = new ArrayList<>();
    
    // Kategori ekleme (maksimum 3 kategori kontrolü)
    public void addCategory(ForumCategory category) {
        if (categories == null) {
            categories = new ArrayList<>();
        }
        
        if (categories.size() >= 3) {
            throw new IllegalArgumentException("Maximum 3 categories allowed per post");
        }
        
        if (!categories.contains(category)) {
            categories.add(category);
        }
    }
    
    // Tüm kategorileri temizleme
    public void clearCategories() {
        if (categories != null) {
            categories.clear();
        }
    }
}
