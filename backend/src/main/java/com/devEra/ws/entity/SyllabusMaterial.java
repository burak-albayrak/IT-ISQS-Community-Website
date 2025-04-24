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
@Table(name = "syllabus_materials")
public class SyllabusMaterial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "material_id")
    private int materialID;

    @NotBlank(message = "File name cannot be blank")
    @Size(min = 2, max = 255, message = "File name must be between 2 and 255 characters")
    @Column(name = "file_name", nullable = false)
    private String fileName;

    @NotBlank(message = "File URL cannot be blank")
    @Column(name = "file_url", nullable = false)
    private String fileUrl;

    @Column(name = "file_type")
    private String fileType;
    
    @Column(name = "file_size")
    private Long fileSize;

    @Column(name = "s3_key")
    private String s3Key;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // Syllabus ile many-to-one ilişkisi
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "syllabus_id")
    private Syllabus syllabus;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
} 