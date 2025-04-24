package com.devEra.ws.service;

import com.devEra.ws.dto.response.SyllabusMaterialResponse;
import com.devEra.ws.entity.Syllabus;
import com.devEra.ws.entity.SyllabusMaterial;
import com.devEra.ws.repository.SyllabusRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
public class SyllabusZipService {

    @Autowired
    private SyllabusService syllabusService;
    
    @Autowired
    private SyllabusRepository syllabusRepository;

    /**
     * Tüm syllabus materyallerini zip dosyası olarak paketler
     *
     * @return Zip dosyasının bayt dizisi
     * @throws IOException I/O hatası durumunda
     */
    public byte[] createSyllabusZip() throws IOException {
        List<SyllabusMaterial> allMaterials = syllabusService.getAllSyllabusMaterials();
        return createZipFromMaterials(allMaterials, "syllabus_all_materials.zip");
    }

    /**
     * Belirli bir haftanın materyallerini zip dosyası olarak paketler
     *
     * @param weekNumber Haftanın numarası
     * @return Zip dosyasının bayt dizisi
     * @throws IOException I/O hatası durumunda
     */
    public byte[] createWeeklyZip(Integer weekNumber) throws IOException {
        // Hafta numarasına göre syllabus al
        Syllabus syllabus = syllabusRepository.findByWeek(weekNumber)
                .orElseThrow(() -> new EntityNotFoundException("Syllabus not found for week: " + weekNumber));
        
        return createZipFromMaterials(syllabus.getMaterials(), "syllabus_week_" + weekNumber + "_materials.zip");
    }

    /**
     * Materyal listesinden zip dosyası oluşturur
     *
     * @param materials Zip'e eklenecek materyaller
     * @param zipFileName Zip dosyasının adı
     * @return Zip dosyasının bayt dizisi
     * @throws IOException I/O hatası durumunda
     */
    private byte[] createZipFromMaterials(List<SyllabusMaterial> materials, String zipFileName) throws IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ZipOutputStream zipOutputStream = new ZipOutputStream(byteArrayOutputStream);

        try {
            for (SyllabusMaterial material : materials) {
                // S3 URL'inden dosyayı okuyup zip'e ekle
                addFileToZip(zipOutputStream, material.getFileName(), material.getFileUrl());
            }
        } finally {
            zipOutputStream.close();
        }

        return byteArrayOutputStream.toByteArray();
    }

    /**
     * URL'den dosya oku ve zip'e ekle
     *
     * @param zipOutputStream Zip output stream
     * @param fileName Zip içinde görünecek dosya adı
     * @param fileUrl Dosyanın URL'i
     * @throws IOException I/O hatası durumunda
     */
    private void addFileToZip(ZipOutputStream zipOutputStream, String fileName, String fileUrl) throws IOException {
        try {
            // URL'den dosyayı oku
            URL url = new URL(fileUrl);
            byte[] buffer = new byte[1024];
            
            // Zip girişi oluştur
            ZipEntry zipEntry = new ZipEntry(fileName);
            zipOutputStream.putNextEntry(zipEntry);
            
            // Dosya içeriğini zip'e yaz
            try (java.io.InputStream inputStream = url.openStream()) {
                int length;
                while ((length = inputStream.read(buffer)) > 0) {
                    zipOutputStream.write(buffer, 0, length);
                }
            }
            
            zipOutputStream.closeEntry();
        } catch (IOException e) {
            System.err.println("Failed to add file to zip: " + fileName + " - " + e.getMessage());
            // Hata durumunda dosyayı atla ve devam et
        }
    }

    /**
     * Zip indirme için HTTP başlıklarını oluşturur
     *
     * @param zipFileName Zip dosyasının adı
     * @return HTTP başlıkları
     */
    public HttpHeaders createZipHeaders(String zipFileName) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", zipFileName);
        return headers;
    }
} 