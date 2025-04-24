package com.devEra.ws.service;

import com.devEra.ws.dto.request.SyllabusCreateRequest;
import com.devEra.ws.dto.request.SyllabusUpdateRequest;
import com.devEra.ws.dto.response.SyllabusResponse;
import com.devEra.ws.entity.Syllabus;
import com.devEra.ws.entity.SyllabusMaterial;
import com.devEra.ws.repository.SyllabusMaterialRepository;
import com.devEra.ws.repository.SyllabusRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.UUID;

@Service
public class SyllabusService {

    @Autowired
    private SyllabusRepository syllabusRepository;

    @Autowired
    private SyllabusMaterialRepository syllabusMaterialRepository;

    @Autowired
    private S3Service s3Service;

    @Value("${aws.s3.syllabusFolderName:syllabusFiles}")
    private String syllabusFolderName;

    /**
     * Yeni bir syllabus oluşturur (hafta)
     */
    @Transactional
    public SyllabusResponse createSyllabus(SyllabusCreateRequest request, Integer adminId) {
        // Aynı hafta numarasına sahip başka bir syllabus var mı kontrol et
        if (syllabusRepository.existsByWeek(request.getWeek())) {
            throw new IllegalArgumentException("A syllabus for week " + request.getWeek() + " already exists");
        }

        Syllabus syllabus = new Syllabus();
        syllabus.setWeek(request.getWeek());
        syllabus.setTitle(request.getTitle());
        syllabus.setDescription(request.getDescription());
        syllabus.setCreatedBy(adminId);
        syllabus.setCreatedAt(LocalDateTime.now());
        syllabus.setUpdatedAt(LocalDateTime.now());

        Syllabus savedSyllabus = syllabusRepository.save(syllabus);
        return SyllabusResponse.fromEntity(savedSyllabus);
    }

    /**
     * Syllabus'u günceller (hafta)
     */
    @Transactional
    public SyllabusResponse updateSyllabus(Integer syllabusId, SyllabusUpdateRequest request) {
        Syllabus syllabus = syllabusRepository.findById(syllabusId)
                .orElseThrow(() -> new EntityNotFoundException("Syllabus not found with ID: " + syllabusId));

        // Eğer hafta numarası değiştiyse ve yeni hafta numarası zaten başka bir syllabus'ta kullanılıyorsa hata ver
        if (!syllabus.getWeek().equals(request.getWeek()) && syllabusRepository.existsByWeek(request.getWeek())) {
            throw new IllegalArgumentException("A syllabus for week " + request.getWeek() + " already exists");
        }

        syllabus.setWeek(request.getWeek());
        syllabus.setTitle(request.getTitle());
        syllabus.setDescription(request.getDescription());
        syllabus.setUpdatedAt(LocalDateTime.now());

        Syllabus updatedSyllabus = syllabusRepository.save(syllabus);
        return SyllabusResponse.fromEntity(updatedSyllabus);
    }

    /**
     * Tüm syllabusları hafta sırasına göre getirir
     */
    public List<SyllabusResponse> getAllSyllabus() {
        return syllabusRepository.findAllByOrderByWeekAsc().stream()
                .map(SyllabusResponse::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * ID'ye göre syllabus getirir
     */
    public SyllabusResponse getSyllabusById(Integer syllabusId) {
        Syllabus syllabus = syllabusRepository.findById(syllabusId)
                .orElseThrow(() -> new EntityNotFoundException("Syllabus not found with ID: " + syllabusId));
        return SyllabusResponse.fromEntity(syllabus);
    }

    /**
     * Hafta numarasına göre syllabus getirir
     */
    public SyllabusResponse getSyllabusByWeek(Integer week) {
        Syllabus syllabus = syllabusRepository.findByWeek(week)
                .orElseThrow(() -> new EntityNotFoundException("Syllabus not found for week: " + week));
        return SyllabusResponse.fromEntity(syllabus);
    }

    /**
     * Syllabus'u siler (ilişkili materyalleri de S3'ten kaldırır)
     */
    @Transactional
    public void deleteSyllabus(Integer syllabusId) {
        Syllabus syllabus = syllabusRepository.findById(syllabusId)
                .orElseThrow(() -> new EntityNotFoundException("Syllabus not found with ID: " + syllabusId));

        // S3'teki ilişkili materyalleri sil
        for (SyllabusMaterial material : syllabus.getMaterials()) {
            if (material.getS3Key() != null && !material.getS3Key().isEmpty()) {
                try {
                    s3Service.deleteFile(material.getS3Key());
                } catch (Exception e) {
                    // Log error but continue with deleting the database record
                    System.err.println("Failed to delete file from S3: " + material.getS3Key() + " - " + e.getMessage());
                }
            }
        }

        // Syllabus kaydını sil (cascade sayesinde ilişkili materyal kayıtları da silinecek)
        syllabusRepository.delete(syllabus);
    }

    /**
     * Syllabus'a materyal ekler (dosya yükleme)
     */
    @Transactional
    public SyllabusResponse addMaterialToSyllabus(Integer syllabusId, MultipartFile file) throws IOException {
        Syllabus syllabus = syllabusRepository.findById(syllabusId)
                .orElseThrow(() -> new EntityNotFoundException("Syllabus not found with ID: " + syllabusId));

        // Dosya adını benzersiz yap
        String originalFilename = file.getOriginalFilename();
        String fileExtension = getFileExtension(originalFilename);
        String uniqueFileName = "week_" + syllabus.getWeek() + "_" + UUID.randomUUID() + fileExtension;
        
        // S3 Key oluştur
        String s3Key = syllabusFolderName + "/" + uniqueFileName;
        
        // S3'e dosyayı yükle
        String fileUrl = s3Service.uploadFile(file, s3Key);

        // Materyal kaydı oluştur
        SyllabusMaterial material = new SyllabusMaterial();
        material.setFileName(originalFilename != null ? originalFilename : uniqueFileName);
        material.setFileUrl(fileUrl);
        material.setFileType(file.getContentType());
        material.setFileSize(file.getSize());
        material.setS3Key(s3Key);
        material.setSyllabus(syllabus);

        // Syllabus'a materyal ekle
        syllabus.addMaterial(material);
        Syllabus updatedSyllabus = syllabusRepository.save(syllabus);
        
        return SyllabusResponse.fromEntity(updatedSyllabus);
    }

    /**
     * Syllabus'tan materyal siler
     */
    @Transactional
    public void deleteMaterialFromSyllabus(Integer syllabusId, Integer materialId) {
        Syllabus syllabus = syllabusRepository.findById(syllabusId)
                .orElseThrow(() -> new EntityNotFoundException("Syllabus not found with ID: " + syllabusId));
        
        SyllabusMaterial material = syllabusMaterialRepository.findById(materialId)
                .orElseThrow(() -> new EntityNotFoundException("Material not found with ID: " + materialId));
        
        // Materyal belirtilen syllabus'a ait mi kontrol et
        if (material.getSyllabus().getSyllabusID() != syllabusId) {
            throw new IllegalArgumentException("Material does not belong to the specified syllabus");
        }
        
        // S3'ten dosyayı sil
        if (material.getS3Key() != null && !material.getS3Key().isEmpty()) {
            try {
                s3Service.deleteFile(material.getS3Key());
            } catch (Exception e) {
                // Log error but continue with deleting the database record
                System.err.println("Failed to delete file from S3: " + material.getS3Key() + " - " + e.getMessage());
            }
        }
        
        // Syllabus'tan materyal kaydını kaldır
        syllabus.removeMaterial(material);
        syllabusRepository.save(syllabus);
        
        // Materyal kaydını sil
        syllabusMaterialRepository.delete(material);
    }
    
    /**
     * Tüm müfredat materyallerini liste olarak döndürür (indirme zip için)
     */
    public List<SyllabusMaterial> getAllSyllabusMaterials() {
        List<Syllabus> allSyllabus = syllabusRepository.findAllByOrderByWeekAsc();
        List<SyllabusMaterial> allMaterials = new ArrayList<>();
        
        for (Syllabus syllabus : allSyllabus) {
            allMaterials.addAll(syllabus.getMaterials());
        }
        
        return allMaterials;
    }

    private String getFileExtension(String fileName) {
        if (fileName == null) {
            return "";
        }
        int lastIndexOf = fileName.lastIndexOf(".");
        if (lastIndexOf == -1) {
            return "";
        }
        return fileName.substring(lastIndexOf);
    }
} 