package com.devEra.ws.service;

import com.devEra.ws.dto.ForumPostFeatureVector;
import com.devEra.ws.dto.RecommendationResponse;
import com.devEra.ws.repository.Forum.*;
import com.devEra.ws.entity.Forum.ForumPost;
import com.devEra.ws.entity.Forum.ForumCategory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class KNNRecommendationService {
    private static final Logger logger = LoggerFactory.getLogger(KNNRecommendationService.class);
    private static final int MIN_INTERACTIONS = 30; // Cold start eşiği - test için 0'a düşürüldü
    private static final int K_NEIGHBORS = 5; // Kaç benzer gönderi önerilecek

    @Autowired
    private ForumPostRepository forumPostRepository;
    @Autowired
    private ForumPostLikeRepository forumPostLikeRepository;
    @Autowired
    private ForumCommentRepository forumCommentRepository;
    @Autowired
    private ForumCategoryRepository forumCategoryRepository;

    @Cacheable(value = "knnRecommendations", key = "'user_' + #userId")
    @Transactional(readOnly = true)
    public List<RecommendationResponse> getRecommendations(int userId) {
        logger.info("Generating KNN-based recommendations for user: {}", userId);

        // Cold start kontrolü
        long totalInteractions = forumPostLikeRepository.countByUserId(userId) +
                               forumCommentRepository.countByCreatedBy(userId);

        if (totalInteractions < MIN_INTERACTIONS) {
            logger.info("User {} has insufficient interactions ({}). Not showing recommendations.", 
                       userId, totalInteractions);
            // Cold start durumunda boş liste döndür, frontend'de uygun mesaj gösterilecek
            return Collections.emptyList();
        }

        try {
            // 1. Kullanıcının etkileşimde bulunduğu gönderileri al
            Set<Integer> interactedPostIds = getUserInteractions(userId);
            
            // 2. Tüm gönderileri özellik vektörlerine dönüştür
            List<ForumPostFeatureVector> allPosts = convertPostsToFeatureVectors();
            
            // 3. Kullanıcının etkileşimde bulunduğu ve bulunmadığı gönderileri ayır
            List<ForumPostFeatureVector> userPosts = allPosts.stream()
                .filter(p -> interactedPostIds.contains(p.getForumPostID()))
                .collect(Collectors.toList());

            List<ForumPostFeatureVector> candidatePosts = allPosts.stream()
                .filter(p -> !interactedPostIds.contains(p.getForumPostID()))
                .collect(Collectors.toList());

            if (userPosts.isEmpty() || candidatePosts.isEmpty()) {
                logger.warn("No user posts or candidate posts found for user: {}", userId);
                return getFallbackRecommendations();
            }

            // 4. Kullanıcı profilini oluştur (etkileşimde bulunduğu gönderilerin ortalaması)
            double[] userProfile = calculateUserProfile(userPosts);

            // 5. KNN ile en benzer gönderileri bul
            List<RecommendationResponse> recommendations = findNearestNeighbors(userProfile, candidatePosts);

            logger.info("Generated {} recommendations for user {}", recommendations.size(), userId);
            return recommendations;

        } catch (Exception e) {
            logger.error("Error generating recommendations for user {}: {}", userId, e.getMessage());
            return getFallbackRecommendations();
        }
    }

    private Set<Integer> getUserInteractions(int userId) {
        // Test kullanıcıları veya anonim kullanıcılar için (userId = 0) boş küme döndür
        if (userId == 0) {
            return new HashSet<>();
        }
        
        Set<Integer> likedPosts = new HashSet<>(forumPostLikeRepository.findForumPostIdByUserId(userId));
        Set<Integer> commentedPosts = new HashSet<>(forumCommentRepository.findForumPostIdByCreatedBy(userId));
        likedPosts.addAll(commentedPosts);
        return likedPosts;
    }

    @Transactional(readOnly = true)
    private List<ForumPostFeatureVector> convertPostsToFeatureVectors() {
        List<Integer> allCategories = forumCategoryRepository.findAllCategoryIds();
        int numCategories = allCategories.size();

        int maxLikes = forumPostRepository.findMaxLikesCount();
        int maxComments = forumPostRepository.findMaxCommentCount();

        return forumPostRepository.findAllWithCategoryAndCounts().stream()
            .map(post -> {
                double[] categoryFeatures = new double[numCategories];
                // Get the category if exists
                ForumCategory category = post.getCategory();
                int categoryIndex = category != null ? allCategories.indexOf(category.getCategoryId()) : -1;
                if (categoryIndex >= 0) {
                    categoryFeatures[categoryIndex] = 1.0;
                }

                double normalizedLikes = maxLikes > 0 ? post.getLikesCount() / (double) maxLikes : 0;
                double normalizedComments = maxComments > 0 ? post.getCommentCount() / (double) maxComments : 0;

                double[] features = new double[numCategories + 2];
                System.arraycopy(categoryFeatures, 0, features, 0, numCategories);
                features[numCategories] = normalizedLikes;
                features[numCategories + 1] = normalizedComments;

                return new ForumPostFeatureVector(
                    post.getForumPostID(),
                    features,
                    category != null ? category.getCategoryId() : 0,
                    post.getLikesCount(),
                    post.getCommentCount()
                );
            })
            .collect(Collectors.toList());
    }

    private double[] calculateUserProfile(List<ForumPostFeatureVector> userPosts) {
        int featureLength = userPosts.get(0).getFeatures().length;
        double[] profile = new double[featureLength];

        for (ForumPostFeatureVector post : userPosts) {
            double[] features = post.getFeatures();
            for (int i = 0; i < featureLength; i++) {
                profile[i] += features[i];
            }
        }

        // Ortalama al
        for (int i = 0; i < featureLength; i++) {
            profile[i] /= userPosts.size();
        }

        return profile;
    }

    private double calculateSimilarity(double[] vector1, double[] vector2) {
        if (vector1.length != vector2.length) {
            throw new IllegalArgumentException("Vectors must have the same length");
        }
        
        double sum = 0.0;
        for (int i = 0; i < vector1.length; i++) {
            double diff = vector1[i] - vector2[i];
            sum += diff * diff;
        }
        
        // Convert distance to similarity (closer to 1 means more similar)
        return 1.0 / (1.0 + Math.sqrt(sum));
    }

    private List<RecommendationResponse> findNearestNeighbors(
            double[] userProfile, 
            List<ForumPostFeatureVector> candidatePosts) {
        
        return candidatePosts.stream()
            .map(post -> {
                double similarity = calculateSimilarity(userProfile, post.getFeatures());
                return new RecommendationResponse(
                    post.getForumPostID(),
                    forumPostRepository.findTitleById(post.getForumPostID()),
                    post.getCategoryId(),
                    forumCategoryRepository.findNameById(post.getCategoryId()),
                    post.getLikesCount(),
                    post.getCommentCount(),
                    similarity
                );
            })
            .sorted(Comparator.comparingDouble(RecommendationResponse::getSimilarityScore).reversed())
            .limit(K_NEIGHBORS)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    private List<RecommendationResponse> getFallbackRecommendations() {
        // En popüler gönderileri döndür
        return forumPostRepository.findAllOrderByLikesAndCommentsDesc().stream()
            .limit(K_NEIGHBORS)
            .map(post -> {
                // Kategoriyi al (varsa)
                ForumCategory category = post.getCategory();
                return new RecommendationResponse(
                    post.getForumPostID(),
                    post.getTitle(),
                    category != null ? category.getCategoryId() : 0,
                    category != null ? category.getName() : "Uncategorized",
                    post.getLikesCount(),
                    post.getCommentCount(),
                    0.0 // Benzerlik skoru yok
                );
            })
            .collect(Collectors.toList());
    }
}