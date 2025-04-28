package com.devEra.ws.dto;
 
 import lombok.AllArgsConstructor;
 import lombok.Data;
 import lombok.NoArgsConstructor;
 
 @Data
 @AllArgsConstructor
 @NoArgsConstructor
 public class ForumPostFeatureVector {
     private int forumPostID;
     private double[] features;
     private int categoryId;
     private int likesCount;
     private int commentCount;
 }