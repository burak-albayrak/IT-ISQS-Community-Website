package com.devEra.ws.repository;

import com.devEra.ws.entity.SyllabusMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SyllabusMaterialRepository extends JpaRepository<SyllabusMaterial, Integer> {
    
    // Bir syllabus'a ait materyalleri getirme
    List<SyllabusMaterial> findBySyllabus_SyllabusID(Integer syllabusId);
    
    // S3 anahtarına göre materyal bulma (silme işlemi için)
    SyllabusMaterial findByS3Key(String s3Key);
    
} 