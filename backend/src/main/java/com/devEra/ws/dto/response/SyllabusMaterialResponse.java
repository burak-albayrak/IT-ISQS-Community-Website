package com.devEra.ws.dto.response;

import com.devEra.ws.entity.SyllabusMaterial;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SyllabusMaterialResponse {
    
    private Integer materialID;
    private String fileName;
    private String fileUrl;
    private String fileType;
    private Long fileSize;
    private LocalDateTime createdAt;
    
    // Entity'den Response DTO'ya dönüştürme
    public static SyllabusMaterialResponse fromEntity(SyllabusMaterial material) {
        SyllabusMaterialResponse response = new SyllabusMaterialResponse();
        response.setMaterialID(material.getMaterialID());
        response.setFileName(material.getFileName());
        response.setFileUrl(material.getFileUrl());
        response.setFileType(material.getFileType());
        response.setFileSize(material.getFileSize());
        response.setCreatedAt(material.getCreatedAt());
        return response;
    }
} 