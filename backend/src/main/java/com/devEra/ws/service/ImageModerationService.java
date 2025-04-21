package com.devEra.ws.service;

import com.google.api.gax.core.CredentialsProvider;
import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.vision.v1.*;
import com.google.protobuf.ByteString;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

@Service
public class ImageModerationService {

    private static final Logger logger = LoggerFactory.getLogger(ImageModerationService.class);
    private static final String CREDENTIALS_PATH = "src/main/resources/vision-key.json";

    // Define likelihood levels considered unsafe
    private static final List<Likelihood> UNSAFE_LEVELS = Arrays.asList(
            Likelihood.LIKELY,
            Likelihood.VERY_LIKELY
    );

    private ImageAnnotatorClient createVisionClient() throws IOException {
        // Check if credentials file exists
        if (!Files.exists(Paths.get(CREDENTIALS_PATH))) {
             logger.error("Google Cloud Vision credentials file not found at: {}. Cannot create client.", CREDENTIALS_PATH);
             throw new IOException("Credentials file not found: " + CREDENTIALS_PATH);
        }
        
        logger.info("Loading credentials from: {}", CREDENTIALS_PATH);
        try (FileInputStream credentialsStream = new FileInputStream(CREDENTIALS_PATH)) {
            GoogleCredentials credentials = GoogleCredentials.fromStream(credentialsStream);
            CredentialsProvider credentialsProvider = FixedCredentialsProvider.create(credentials);
            
            ImageAnnotatorSettings settings = ImageAnnotatorSettings.newBuilder()
                .setCredentialsProvider(credentialsProvider)
                .build();
            
            logger.info("Creating ImageAnnotatorClient with explicit credentials.");
            return ImageAnnotatorClient.create(settings);
        } catch (IOException e) {
            logger.error("Failed to load credentials or create Vision API client: {}", e.getMessage());
            throw e;
        }
    }

    public boolean isImageSafe(byte[] imageData) throws IOException {
        logger.info("Starting SafeSearch analysis for image...");
        // Initialize client with explicit credentials
        try (ImageAnnotatorClient vision = createVisionClient()) {

            // Builds the image annotation request
            ByteString imgBytes = ByteString.copyFrom(imageData);
            Image img = Image.newBuilder().setContent(imgBytes).build();
            Feature feat = Feature.newBuilder().setType(Feature.Type.SAFE_SEARCH_DETECTION).build();
            AnnotateImageRequest request = AnnotateImageRequest.newBuilder()
                    .addFeatures(feat)
                    .setImage(img)
                    .build();

            // Performs detection on the image file
            BatchAnnotateImagesResponse response = vision.batchAnnotateImages(Arrays.asList(request));
            List<AnnotateImageResponse> responses = response.getResponsesList();

            if (responses.isEmpty()) {
                logger.warn("Received empty response from Vision API.");
                return false;
            }

            AnnotateImageResponse res = responses.get(0);
            if (res.hasError()) {
                logger.error("Vision API Error: {}", res.getError().getMessage());
                throw new IOException("Vision API Error: " + res.getError().getMessage());
            }

            SafeSearchAnnotation safeSearch = res.getSafeSearchAnnotation();

            // Check the likelihood of unsafe categories
            boolean adult = UNSAFE_LEVELS.contains(safeSearch.getAdult());
            boolean medical = UNSAFE_LEVELS.contains(safeSearch.getMedical()); 
            boolean spoof = UNSAFE_LEVELS.contains(safeSearch.getSpoof());     
            boolean violence = UNSAFE_LEVELS.contains(safeSearch.getViolence());
            boolean racy = UNSAFE_LEVELS.contains(safeSearch.getRacy());

            logger.info("SafeSearch Results - Adult: {}, Medical: {}, Spoof: {}, Violence: {}, Racy: {}",
                    safeSearch.getAdult(), safeSearch.getMedical(), safeSearch.getSpoof(),
                    safeSearch.getViolence(), safeSearch.getRacy());

            boolean isUnsafe = adult || violence || racy || spoof;

            logger.info("Image analysis complete. Is unsafe? {}", isUnsafe);
            return !isUnsafe; // Return true if safe

        } catch (IOException e) {
            // Logged in createVisionClient or during API call
            throw e;
        } catch (Exception e) {
            logger.error("An unexpected error occurred during image moderation: {}", e.getMessage(), e);
            throw new IOException("Unexpected error during image moderation", e);
        }
    }
} 