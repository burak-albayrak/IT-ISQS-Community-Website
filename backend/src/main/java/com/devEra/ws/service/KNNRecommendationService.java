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
    private static final int MIN_INTERACTIONS = 15; // Cold start eşiği - yorum bazlı olduğu için düşürüldü
    private static final int K_NEIGHBORS = 5; // Kaç benzer gönderi önerilecek

    @Autowired
    private ForumPostRepository forumPostRepository;
    @Autowired
    private ForumCommentRepository forumCommentRepository;
    @Autowired
    private ForumCategoryRepository forumCategoryRepository;

    @Cacheable(value = "knnRecommendations", key = "'user_' + #userId")
    @Transactional(readOnly = true)
    public List<RecommendationResponse> getRecommendations(int userId) {
        logger.info("Generating KNN-based recommendations for user: {}", userId);

        // Cold start kontrolü - sadece yorum sayısına göre
        long totalInteractions = forumCommentRepository.countByCreatedBy(userId);

        if (totalInteractions < MIN_INTERACTIONS) {
            logger.info("User {} has insufficient interactions ({}). Not showing recommendations.", 
                       userId, totalInteractions);
            return Collections.emptyList();
        }

        try {
            // 1. Kullanıcının yorum yaptığı gönderileri al
            Set<Integer> commentedPostIds = new HashSet<>(forumCommentRepository.findForumPostIdByCreatedBy(userId));
            
            // 2. Tüm gönderileri özellik vektörlerine dönüştür
            List<ForumPostFeatureVector> allPosts = convertPostsToFeatureVectors();
            
            // 3. Kullanıcının yorum yaptığı ve yapmadığı gönderileri ayır
            List<ForumPostFeatureVector> userPosts = allPosts.stream()
                .filter(p -> commentedPostIds.contains(p.getForumPostID()))
                .collect(Collectors.toList());

            List<ForumPostFeatureVector> candidatePosts = allPosts.stream()
                .filter(p -> !commentedPostIds.contains(p.getForumPostID()))
                .collect(Collectors.toList());

            if (userPosts.isEmpty() || candidatePosts.isEmpty()) {
                logger.warn("No user posts or candidate posts found for user: {}", userId);
                return getFallbackRecommendations();
            }

            // 4. Kullanıcı profilini oluştur (yorum yaptığı gönderilerin ortalaması)
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

    @Transactional(readOnly = true)
    private List<ForumPostFeatureVector> convertPostsToFeatureVectors() {
        List<Integer> allCategories = forumCategoryRepository.findAllCategoryIds();
        int numCategories = allCategories.size();

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

                double normalizedComments = maxComments > 0 ? post.getCommentCount() / (double) maxComments : 0;

                double[] features = new double[numCategories + 1]; // +1 for comment count
                System.arraycopy(categoryFeatures, 0, features, 0, numCategories);
                features[numCategories] = normalizedComments;

                return new ForumPostFeatureVector(
                    post.getForumPostID(),
                    features,
                    category != null ? category.getCategoryId() : 0,
                    0, // likes artık kullanılmıyor
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
                    0, // likes artık kullanılmıyor
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
        // En çok yorum alan gönderileri döndür
        return forumPostRepository.findAllOrderByCommentsDesc().stream()
            .limit(K_NEIGHBORS)
            .map(post -> {
                ForumCategory category = post.getCategory();
                return new RecommendationResponse(
                    post.getForumPostID(),
                    post.getTitle(),
                    category != null ? category.getCategoryId() : 0,
                    category != null ? category.getName() : "Uncategorized",
                    0, // likes artık kullanılmıyor
                    post.getCommentCount(),
                    0.0 // Benzerlik skoru yok
                );
            })
            .collect(Collectors.toList());
    }
}