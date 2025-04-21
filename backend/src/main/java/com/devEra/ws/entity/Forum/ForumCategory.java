package com.devEra.ws.entity.Forum;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "forum_categories")
public class ForumCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private int categoryId;

    @NotBlank(message = "Category name cannot be blank")
    @Size(min = 2, max = 50, message = "Category name must be between 2 and 50 characters")
    @Column(name = "name", nullable = false, unique = true)
    private String name;
    
    @Column(name = "description")
    private String description;
    
    @Column(name = "color")
    private String color;
    
    @Column(name = "icon")
    private String icon;
} 