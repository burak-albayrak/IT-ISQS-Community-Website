package com.devEra.ws.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import lombok.RequiredArgsConstructor;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class MediaService {

    private final S3Service s3Service;
    
    /**
     * Dosyayı yükler ve URL'sini döndürür
     * 
     * @param file Yüklenecek dosya
     * @param folder Dosyanın yükleneceği klasör
     * @return Yüklenen dosyanın URL'si
     * @throws IOException Dosya yükleme hatası
     */
    public String uploadMedia(MultipartFile file, String folder) throws IOException {
        String fileKey = folder + "/" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
        return s3Service.uploadFile(file, fileKey);
    }
} 