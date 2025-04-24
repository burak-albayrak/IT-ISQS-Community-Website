package com.devEra.ws.repository;

import com.devEra.ws.entity.Syllabus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SyllabusRepository extends JpaRepository<Syllabus, Integer> {
    
    // Hafta numarasına göre syllabus bulma
    Optional<Syllabus> findByWeek(Integer week);
    
    // Hafta numarasına göre sıralayarak tüm syllabusları getirme
    List<Syllabus> findAllByOrderByWeekAsc();
    
    // Hafta numarasının varlığını kontrol etme (başka bir hafta kaydı oluşturulurken)
    boolean existsByWeek(Integer week);
    
} 