package com.devEra.ws.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
@Table(name = "syllabus")
public class Syllabus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "syllabus_id")
    private int syllabusID;

    @NotNull(message = "Week number cannot be null")
    @Column(name = "week", nullable = false)
    private Integer week;

    @NotBlank(message = "Title cannot be blank")
    @Size(min = 2, max = 255, message = "Title must be between 2 and 255 characters")
    @Column(name = "title", nullable = false)
    private String title;

    @NotBlank(message = "Description cannot be blank")
    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "created_by")
    private Integer createdBy;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Bir haftaya ait birden fazla materyal olabilir (one-to-many ilişkisi)
    @OneToMany(mappedBy = "syllabus", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SyllabusMaterial> materials = new ArrayList<>();

    // Materyal ekleme metodu
    public void addMaterial(SyllabusMaterial material) {
        materials.add(material);
        material.setSyllabus(this);
    }

    // Materyal silme metodu
    public void removeMaterial(SyllabusMaterial material) {
        materials.remove(material);
        material.setSyllabus(null);
    }

    // Tüm materyalleri temizleme metodu
    public void clearMaterials() {
        for (SyllabusMaterial material : new ArrayList<>(materials)) {
            removeMaterial(material);
        }
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
} 