package com.devEra.ws.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.devEra.ws.entity.Forum.ForumCategory;
import com.devEra.ws.repository.Forum.ForumCategoryRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ForumCategoryService {

    private final ForumCategoryRepository categoryRepository;
    
    /**
     * Tüm kategorileri listeler
     * 
     * @return Kategori listesi
     */
    public List<ForumCategory> getAllCategories() {
        return categoryRepository.findAll();
    }
    
    /**
     * ID'ye göre kategori getirir
     * 
     * @param categoryId Kategori ID
     * @return Kategori
     */
    public ForumCategory getCategoryById(int categoryId) {
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));
    }
    
    /**
     * İsme göre kategori getirir
     * 
     * @param name Kategori adı
     * @return Kategori
     */
    public ForumCategory getCategoryByName(String name) {
        return categoryRepository.findByName(name)
                .orElseThrow(() -> new EntityNotFoundException("Category not found: " + name));
    }
    
    /**
     * Yeni kategori oluşturur
     * 
     * @param category Kategori
     * @return Oluşturulan kategori
     */
    public ForumCategory createCategory(ForumCategory category) {
        return categoryRepository.save(category);
    }
    
    /**
     * Kategori günceller
     * 
     * @param categoryId Kategori ID
     * @param updatedCategory Güncellenmiş kategori
     * @return Güncellenmiş kategori
     */
    public ForumCategory updateCategory(int categoryId, ForumCategory updatedCategory) {
        ForumCategory existingCategory = getCategoryById(categoryId);
        
        existingCategory.setName(updatedCategory.getName());
        existingCategory.setColor(updatedCategory.getColor());
        
        return categoryRepository.save(existingCategory);
    }
    
    /**
     * Kategori siler
     * 
     * @param categoryId Kategori ID
     */
    public void deleteCategory(int categoryId) {
        ForumCategory category = getCategoryById(categoryId);
        categoryRepository.delete(category);
    }
} 