package com.devEra.ws.entity.Forum;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "forum_categories")
@Data
public class ForumCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private int categoryId;

    @Column(nullable = false)
    private String name;

    @Column
    private String description;
}