package com.devEra.ws.service;

import com.devEra.ws.dto.request.Blog.CreateBlogRequest;
import com.devEra.ws.dto.request.Blog.UpdateBlogRequest;
import com.devEra.ws.entity.Admin;
import com.devEra.ws.entity.Blog;
import com.devEra.ws.repository.AdminRepository;
import com.devEra.ws.repository.BlogRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogRepository blogRepository;
    private final AdminRepository adminRepository;

    public Blog createBlog(CreateBlogRequest request, int adminId) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new EntityNotFoundException("Admin not found"));

        Blog blog = new Blog();
        blog.setTitle(request.getTitle());
        blog.setDescription(request.getDescription());
        blog.setMedia(request.getMedia());
        blog.setCategory(request.getCategory());
        blog.setNumberOfViews(0);

        String adminFullName = admin.getFirstName() + " " + admin.getLastName();
        blog.setCreatedBy(adminFullName);
        blog.setOwner(
                (request.getOwner() == null || request.getOwner().isBlank())
                        ? adminFullName
                        : request.getOwner());

        blog.setCreatedAt(LocalDateTime.now());
        blog.setUpdatedAt(LocalDateTime.now());

        return blogRepository.save(blog);
    }

    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    public Blog getBlogById(int id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Blog not found"));
        blog.setNumberOfViews(blog.getNumberOfViews() + 1);
        blog.setUpdatedAt(LocalDateTime.now());
        return blogRepository.save(blog);
    }

    public Blog updateBlog(int id, UpdateBlogRequest request, int adminId) {
        adminRepository.findById(adminId)
                .orElseThrow(() -> new EntityNotFoundException("Admin not found"));

        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Blog not found"));

        blog.setTitle(request.getTitle());
        blog.setDescription(request.getDescription());
        blog.setMedia(request.getMedia());
        blog.setCategory(request.getCategory());
        blog.setOwner(request.getOwner());
        blog.setUpdatedAt(LocalDateTime.now());

        return blogRepository.save(blog);
    }

    public void deleteBlog(int id, int adminId) {
        adminRepository.findById(adminId)
                .orElseThrow(() -> new EntityNotFoundException("Admin not found"));
    
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Blog not found"));
    
        blogRepository.delete(blog);
    }
}
