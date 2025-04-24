package com.devEra.ws.api.controller;

import com.devEra.ws.config.security.JwtTokenService;
import com.devEra.ws.core.error.ApiError;
import com.devEra.ws.core.message.GenericMessage;
import com.devEra.ws.dto.request.SyllabusCreateRequest;
import com.devEra.ws.dto.request.SyllabusUpdateRequest;
import com.devEra.ws.dto.response.SyllabusResponse;
import com.devEra.ws.service.SyllabusService;
import com.devEra.ws.service.SyllabusZipService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
public class SyllabusController {

    @Autowired
    private SyllabusService syllabusService;

    @Autowired
    private SyllabusZipService syllabusZipService;

    @Autowired
    private JwtTokenService jwtTokenService;

    /**
     * Tüm syllabus (hafta) kayıtlarını getirir
     */
    @GetMapping("/api/v1/syllabus")
    public ResponseEntity<?> getAllSyllabus(@RequestHeader("Authorization") String tokenHeader) {
        // Kullanıcı giriş yapmış mı kontrol et
        try {
            validateUserToken(tokenHeader);
            List<SyllabusResponse> syllabusList = syllabusService.getAllSyllabus();
            return ResponseEntity.ok(syllabusList);
        } catch (Exception e) {
            return createUnauthorizedResponse(e.getMessage(), "/api/v1/syllabus");
        }
    }

    /**
     * ID'ye göre syllabus getirir
     */
    @GetMapping("/api/v1/syllabus/{syllabusId}")
    public ResponseEntity<?> getSyllabusById(
            @PathVariable Integer syllabusId,
            @RequestHeader("Authorization") String tokenHeader) {
        // Kullanıcı giriş yapmış mı kontrol et
        try {
            validateUserToken(tokenHeader);
            
            try {
                SyllabusResponse syllabus = syllabusService.getSyllabusById(syllabusId);
                return ResponseEntity.ok(syllabus);
            } catch (EntityNotFoundException e) {
                return createNotFoundResponse(e.getMessage(), "/api/v1/syllabus/" + syllabusId);
            }
        } catch (Exception e) {
            return createUnauthorizedResponse(e.getMessage(), "/api/v1/syllabus/" + syllabusId);
        }
    }

    /**
     * Hafta numarasına göre syllabus getirir
     */
    @GetMapping("/api/v1/syllabus/week/{weekNumber}")
    public ResponseEntity<?> getSyllabusByWeek(
            @PathVariable Integer weekNumber,
            @RequestHeader("Authorization") String tokenHeader) {
        // Kullanıcı giriş yapmış mı kontrol et
        try {
            validateUserToken(tokenHeader);
            
            try {
                SyllabusResponse syllabus = syllabusService.getSyllabusByWeek(weekNumber);
                return ResponseEntity.ok(syllabus);
            } catch (EntityNotFoundException e) {
                return createNotFoundResponse(e.getMessage(), "/api/v1/syllabus/week/" + weekNumber);
            }
        } catch (Exception e) {
            return createUnauthorizedResponse(e.getMessage(), "/api/v1/syllabus/week/" + weekNumber);
        }
    }

    /**
     * Yeni syllabus (hafta) oluşturur
     */
    @PostMapping("/api/v1/syllabus")
    public ResponseEntity<?> createSyllabus(
            @Valid @RequestBody SyllabusCreateRequest request,
            @RequestHeader("Authorization") String tokenHeader) {
        // Admin kullanıcı kontrolü
        try {
            Integer adminId = validateAdminToken(tokenHeader);
            
            try {
                SyllabusResponse createdSyllabus = syllabusService.createSyllabus(request, adminId);
                return ResponseEntity.status(HttpStatus.CREATED).body(createdSyllabus);
            } catch (IllegalArgumentException e) {
                return createBadRequestResponse(e.getMessage(), "/api/v1/syllabus");
            }
        } catch (Exception e) {
            return createUnauthorizedResponse(e.getMessage(), "/api/v1/syllabus");
        }
    }

    /**
     * Syllabus (hafta) bilgilerini günceller
     */
    @PutMapping("/api/v1/syllabus/{syllabusId}")
    public ResponseEntity<?> updateSyllabus(
            @PathVariable Integer syllabusId,
            @Valid @RequestBody SyllabusUpdateRequest request,
            @RequestHeader("Authorization") String tokenHeader) {
        // Admin kullanıcı kontrolü
        try {
            validateAdminToken(tokenHeader);
            
            try {
                SyllabusResponse updatedSyllabus = syllabusService.updateSyllabus(syllabusId, request);
                return ResponseEntity.ok(updatedSyllabus);
            } catch (EntityNotFoundException e) {
                return createNotFoundResponse(e.getMessage(), "/api/v1/syllabus/" + syllabusId);
            } catch (IllegalArgumentException e) {
                return createBadRequestResponse(e.getMessage(), "/api/v1/syllabus/" + syllabusId);
            }
        } catch (Exception e) {
            return createUnauthorizedResponse(e.getMessage(), "/api/v1/syllabus/" + syllabusId);
        }
    }

    /**
     * Syllabus (hafta) kaydını siler
     */
    @DeleteMapping("/api/v1/syllabus/{syllabusId}")
    public ResponseEntity<?> deleteSyllabus(
            @PathVariable Integer syllabusId,
            @RequestHeader("Authorization") String tokenHeader) {
        // Admin kullanıcı kontrolü
        try {
            validateAdminToken(tokenHeader);
            
            try {
                syllabusService.deleteSyllabus(syllabusId);
                return ResponseEntity.ok(new GenericMessage("Syllabus deleted successfully"));
            } catch (EntityNotFoundException e) {
                return createNotFoundResponse(e.getMessage(), "/api/v1/syllabus/" + syllabusId);
            }
        } catch (Exception e) {
            return createUnauthorizedResponse(e.getMessage(), "/api/v1/syllabus/" + syllabusId);
        }
    }

    /**
     * Syllabus'a (haftaya) materyal dosyası ekler
     */
    @PostMapping("/api/v1/syllabus/{syllabusId}/materials")
    public ResponseEntity<?> addMaterialToSyllabus(
            @PathVariable Integer syllabusId,
            @RequestParam("file") MultipartFile file,
            @RequestHeader("Authorization") String tokenHeader) {
        // Admin kullanıcı kontrolü
        try {
            validateAdminToken(tokenHeader);
            
            try {
                SyllabusResponse updatedSyllabus = syllabusService.addMaterialToSyllabus(syllabusId, file);
                return ResponseEntity.status(HttpStatus.CREATED).body(updatedSyllabus);
            } catch (EntityNotFoundException e) {
                return createNotFoundResponse(e.getMessage(), "/api/v1/syllabus/" + syllabusId + "/materials");
            } catch (IOException e) {
                return createBadRequestResponse("Failed to upload file: " + e.getMessage(), 
                        "/api/v1/syllabus/" + syllabusId + "/materials");
            }
        } catch (Exception e) {
            return createUnauthorizedResponse(e.getMessage(), "/api/v1/syllabus/" + syllabusId + "/materials");
        }
    }

    /**
     * Syllabus'tan (haftadan) materyal dosyası siler
     */
    @DeleteMapping("/api/v1/syllabus/{syllabusId}/materials/{materialId}")
    public ResponseEntity<?> deleteMaterialFromSyllabus(
            @PathVariable Integer syllabusId,
            @PathVariable Integer materialId,
            @RequestHeader("Authorization") String tokenHeader) {
        // Admin kullanıcı kontrolü
        try {
            validateAdminToken(tokenHeader);
            
            try {
                syllabusService.deleteMaterialFromSyllabus(syllabusId, materialId);
                return ResponseEntity.ok(new GenericMessage("Material deleted successfully"));
            } catch (EntityNotFoundException e) {
                return createNotFoundResponse(e.getMessage(), 
                        "/api/v1/syllabus/" + syllabusId + "/materials/" + materialId);
            } catch (IllegalArgumentException e) {
                return createBadRequestResponse(e.getMessage(), 
                        "/api/v1/syllabus/" + syllabusId + "/materials/" + materialId);
            }
        } catch (Exception e) {
            return createUnauthorizedResponse(e.getMessage(), 
                    "/api/v1/syllabus/" + syllabusId + "/materials/" + materialId);
        }
    }

    /**
     * Tüm syllabus materyallerini zip olarak indirir
     */
    @GetMapping("/api/v1/syllabus/download/all")
    public ResponseEntity<?> downloadAllSyllabusMaterials(
            @RequestHeader("Authorization") String tokenHeader) {
        // Kullanıcı giriş yapmış mı kontrol et
        try {
            validateUserToken(tokenHeader);
            
            try {
                byte[] zipBytes = syllabusZipService.createSyllabusZip();
                return ResponseEntity
                        .ok()
                        .headers(syllabusZipService.createZipHeaders("syllabus_all_materials.zip"))
                        .body(zipBytes);
            } catch (IOException e) {
                return createBadRequestResponse("Failed to create zip file: " + e.getMessage(), 
                        "/api/v1/syllabus/download/all");
            }
        } catch (Exception e) {
            return createUnauthorizedResponse(e.getMessage(), "/api/v1/syllabus/download/all");
        }
    }

    /**
     * Belirli bir haftanın materyallerini zip olarak indirir
     */
    @GetMapping("/api/v1/syllabus/download/week/{weekNumber}")
    public ResponseEntity<?> downloadWeeklySyllabusMaterials(
            @PathVariable Integer weekNumber,
            @RequestHeader("Authorization") String tokenHeader) {
        // Kullanıcı giriş yapmış mı kontrol et
        try {
            validateUserToken(tokenHeader);
            
            try {
                byte[] zipBytes = syllabusZipService.createWeeklyZip(weekNumber);
                return ResponseEntity
                        .ok()
                        .headers(syllabusZipService.createZipHeaders("syllabus_week_" + weekNumber + "_materials.zip"))
                        .body(zipBytes);
            } catch (EntityNotFoundException e) {
                return createNotFoundResponse(e.getMessage(), "/api/v1/syllabus/download/week/" + weekNumber);
            } catch (IOException e) {
                return createBadRequestResponse("Failed to create zip file: " + e.getMessage(), 
                        "/api/v1/syllabus/download/week/" + weekNumber);
            }
        } catch (Exception e) {
            return createUnauthorizedResponse(e.getMessage(), "/api/v1/syllabus/download/week/" + weekNumber);
        }
    }

    /**
     * Token'dan admin ID'sini alır ve doğrular
     */
    private Integer validateAdminToken(String tokenHeader) {
        if (tokenHeader == null || !tokenHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid or missing token");
        }
        
        String token = tokenHeader.substring(7);
        if (!jwtTokenService.isAdminToken(token)) {
            throw new IllegalArgumentException("Admin access required");
        }
        
        return jwtTokenService.getAdminIdFromToken(token);
    }
    
    /**
     * Token'dan kullanıcı ID'sini alır ve doğrular (admin veya normal kullanıcı olabilir)
     */
    private void validateUserToken(String tokenHeader) {
        if (tokenHeader == null || !tokenHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid or missing token");
        }
        
        String token = tokenHeader.substring(7);
        if (!jwtTokenService.isAdminToken(token) && !jwtTokenService.isUserToken(token)) {
            throw new IllegalArgumentException("User authentication required");
        }
    }
    
    /**
     * 404 Not Found yanıtı oluşturur
     */
    private ResponseEntity<ApiError> createNotFoundResponse(String message, String path) {
        ApiError error = new ApiError();
        error.setStatus(404);
        error.setMessage(message);
        error.setPath(path);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    /**
     * 400 Bad Request yanıtı oluşturur
     */
    private ResponseEntity<ApiError> createBadRequestResponse(String message, String path) {
        ApiError error = new ApiError();
        error.setStatus(400);
        error.setMessage(message);
        error.setPath(path);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
    }
    
    /**
     * 401 Unauthorized yanıtı oluşturur
     */
    private ResponseEntity<ApiError> createUnauthorizedResponse(String message, String path) {
        ApiError error = new ApiError();
        error.setStatus(401);
        error.setMessage(message);
        error.setPath(path);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }
} 