package com.devEra.ws.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "blogs")
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int blogID;

    @Size(min = 5, max = 255, message = "Title must be between 5 and 255 characters.")
    @NotBlank(message = "Title cannot be blank.")
    @Column(name = "title")
    private String title;

    @NotBlank(message = "Description cannot be blank.")
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name="owner")
    private String owner;

    @Column(name = "media")
    private String media;

    @Column(name = "category")
    private String category;

    @Column(name = "number_of_views")
    private int numberOfViews = 0;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
}
