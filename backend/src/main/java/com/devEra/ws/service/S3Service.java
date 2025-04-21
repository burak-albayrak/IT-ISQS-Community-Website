package com.devEra.ws.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Service
public class S3Service {

    private final S3Client s3Client;

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    @Value("${aws.s3.folderName}")
    private String folderName;

    public S3Service(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    /**
     * Resmi S3 bucket'a yükler ve URL'ini döndürür
     * 
     * @param file Yüklenecek resim dosyası
     * @param userId Kullanıcı ID'si
     * @return Yüklenen resmin URL'i
     * @throws IOException dosya işleme hatası durumunda
     */
    public String uploadProfilePicture(MultipartFile file, int userId) throws IOException {
        // Dosya boyutunu kontrol et (5MB'dan küçük olmalı)
        if (file.getSize() > 5 * 1024 * 1024) {
            throw new IllegalArgumentException("File size exceeds maximum limit of 5MB");
        }

        // Dosya tipini kontrol et (sadece resim dosyaları)
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("Only image files are allowed");
        }

        // Dosya adını benzersiz yap ve kullanıcı ID'si ile birleştir
        String fileExtension = getFileExtension(file.getOriginalFilename());
        String fileName = folderName + "/" + userId + "_" + UUID.randomUUID() + fileExtension;

        // S3'e dosyayı yükle
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .contentType(contentType)
                .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));

        // Dosyanın S3 URL'ini döndür
        return "https://" + bucketName + ".s3.amazonaws.com/" + fileName;
    }
    
    /**
     * Herhangi bir dosyayı S3 bucket'a yükler ve URL'ini döndürür
     * 
     * @param file Yüklenecek dosya
     * @param key S3'de kullanılacak dosya anahtarı (key)
     * @return Yüklenen dosyanın URL'i
     * @throws IOException dosya işleme hatası durumunda
     */
    public String uploadFile(MultipartFile file, String key) throws IOException {
        // Dosya boyutunu kontrol et (10MB'dan küçük olmalı)
        if (file.getSize() > 10 * 1024 * 1024) {
            throw new IllegalArgumentException("File size exceeds maximum limit of 10MB");
        }

        // S3'e dosyayı yükle
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentType(file.getContentType())
                .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));

        // Dosyanın S3 URL'ini döndür
        return "https://" + bucketName + ".s3.amazonaws.com/" + key;
    }
    
    /**
     * S3'ten dosya siler
     * 
     * @param key Silinecek dosyanın S3 anahtarı
     */
    public void deleteFile(String key) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();
                
        s3Client.deleteObject(deleteObjectRequest);
    }

    private String getFileExtension(String fileName) {
        if (fileName == null) {
            return ".jpg";
        }
        int lastIndexOf = fileName.lastIndexOf(".");
        if (lastIndexOf == -1) {
            return ".jpg";
        }
        return fileName.substring(lastIndexOf);
    }
} 