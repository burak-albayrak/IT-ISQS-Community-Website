package com.devEra.ws.dto.response.Forum;

import java.time.LocalDateTime;
import java.util.List;

import com.devEra.ws.core.enums.CreatorType;
import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ForumCommentResponse {
    
    private int commentId;
    private String description;
    private int likes;
    private boolean edited;
    private Integer parentCommentId;
    private int replyCount;
    private int createdBy;
    private CreatorType createdByType;
    private String creatorName; // Oluşturan kullanıcı/admin adı
    private String creatorPicture; // Oluşturan kullanıcı/admin resmi
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean isLiked; // Giriş yapan kullanıcının beğenip beğenmediği
    
    // İç içe yanıtları tutacak liste (sadece gerektiğinde doldurulacak)
    private List<ForumCommentResponse> replies;
} 