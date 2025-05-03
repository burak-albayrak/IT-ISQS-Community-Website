import api from './api'; // Import the configured axios instance

// Remove hardcoded API_URL and API_PATH
// const API_URL = 'https://closed-merola-deveracankaya-2f4e22df.koyeb.app';
// const API_PATH = '/api/v1/blogs';

class BlogService {
  // Blog listesini getir
  getAllBlogs(page = 0, size = 10) {
    // Use 'api' instance and relative path
    return api.get('/blogs'); 
  }

  // Son eklenen blogları getir
  getRecentBlogs(limit = 3) {
    // Backend doesn't currently support this so we'll just get all and filter
    // Use 'api' instance and relative path
    return api.get('/blogs'); 
  }

  // Belirli bir blogu ID'ye göre getir
  getBlogById(id) {
    // Use 'api' instance and relative path
    return api.get(`/blogs/${id}`); 
  }

  // Kategorilere göre blogları filtrele
  getBlogsByCategory(category, page = 0, size = 10) {
    // Backend doesn't currently support this, use getAllBlogs and filter
    // Use 'api' instance and relative path
    return api.get('/blogs'); 
  }

  // Arama sorgusu ile blog ara
  searchBlogs(query, page = 0, size = 10) {
    // Backend doesn't currently support this, use getAllBlogs and filter
    // Use 'api' instance and relative path
    return api.get('/blogs'); 
  }

  // İlgili blogları getir
  getRelatedBlogs(blogId, limit = 3) {
    // Backend doesn't currently support this, use getAllBlogs and filter
    // Use 'api' instance and relative path
    return api.get('/blogs'); 
  }

  // Tüm kategorileri getir
  getAllCategories() {
    // Backend doesn't currently support this, use getAllBlogs and extract categories
    // Use 'api' instance and relative path
    return api.get('/blogs'); 
  }
  
  // Admin - Yeni blog oluştur
  createBlog(blogData) {
    // Use 'api' instance and relative path
    return api.post('/blogs/create', blogData); 
  }
  
  // Admin - Blog güncelle
  updateBlog(id, blogData) {
    // Use 'api' instance and relative path
    return api.put(`/blogs/${id}`, blogData); 
  }
  
  // Admin - Blog sil
  deleteBlog(id) {
    // Use 'api' instance and relative path
    return api.delete(`/blogs/${id}`); 
  }
}

export default new BlogService(); 