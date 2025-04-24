package com.devEra.ws.dto.response;

import com.devEra.ws.entity.Syllabus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SyllabusResponse {
    
    private Integer syllabusID;
    private Integer week;
    private String title;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<SyllabusMaterialResponse> materials;
    
    // Entity'den Response DTO'ya dönüştürme
    public static SyllabusResponse fromEntity(Syllabus syllabus) {
        SyllabusResponse response = new SyllabusResponse();
        response.setSyllabusID(syllabus.getSyllabusID());
        response.setWeek(syllabus.getWeek());
        response.setTitle(syllabus.getTitle());
        response.setDescription(syllabus.getDescription());
        response.setCreatedAt(syllabus.getCreatedAt());
        response.setUpdatedAt(syllabus.getUpdatedAt());
        
        // Materyal listesini dönüştürme
        if (syllabus.getMaterials() != null) {
            response.setMaterials(syllabus.getMaterials().stream()
                    .map(SyllabusMaterialResponse::fromEntity)
                    .collect(Collectors.toList()));
        }
        
        return response;
    }
} 