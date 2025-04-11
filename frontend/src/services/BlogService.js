import axios from 'axios';

const API_URL = 'http://localhost:8080';
const API_PATH = '/api/v1/blogs';

class BlogService {
  // Blog listesini getir
  getAllBlogs(page = 0, size = 10) {
    return axios.get(`${API_URL}${API_PATH}`);
  }

  // Son eklenen blogları getir
  getRecentBlogs(limit = 3) {
    // Backend doesn't currently support this so we'll just get all and filter
    return axios.get(`${API_URL}${API_PATH}`);
  }

  // Belirli bir blogu ID'ye göre getir
  getBlogById(id) {
    return axios.get(`${API_URL}${API_PATH}/${id}`);
  }

  // Kategorilere göre blogları filtrele
  getBlogsByCategory(category, page = 0, size = 10) {
    // Backend doesn't currently support this, use getAllBlogs and filter
    return axios.get(`${API_URL}${API_PATH}`);
  }

  // Arama sorgusu ile blog ara
  searchBlogs(query, page = 0, size = 10) {
    // Backend doesn't currently support this, use getAllBlogs and filter
    return axios.get(`${API_URL}${API_PATH}`);
  }

  // İlgili blogları getir
  getRelatedBlogs(blogId, limit = 3) {
    // Backend doesn't currently support this, use getAllBlogs and filter
    return axios.get(`${API_URL}${API_PATH}`);
  }

  // Tüm kategorileri getir
  getAllCategories() {
    // Backend doesn't currently support this, use getAllBlogs and extract categories
    return axios.get(`${API_URL}${API_PATH}`);
  }
  
  // Admin - Yeni blog oluştur
  createBlog(blogData) {
    return axios.post(`${API_URL}${API_PATH}/create`, blogData);
  }
  
  // Admin - Blog güncelle
  updateBlog(id, blogData) {
    return axios.put(`${API_URL}${API_PATH}/${id}`, blogData);
  }
  
  // Admin - Blog sil
  deleteBlog(id) {
    return axios.delete(`${API_URL}${API_PATH}/${id}`);
  }
}

export default new BlogService(); 