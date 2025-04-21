package com.devEra.ws.dto.request.Forum;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateForumCommentRequest {

    @NotNull(message = "Forum post ID cannot be null.")
    private int forumPostID;

    @NotBlank(message = "Comment description cannot be blank.")
    private String description;
    
    // Reply yapılacak yorum ID (ana yorum olacaksa null olabilir)
    private Integer parentCommentID;
} 