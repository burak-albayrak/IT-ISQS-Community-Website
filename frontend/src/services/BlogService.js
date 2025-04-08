import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

class BlogService {
  // Blog listesini getir
  getAllBlogs(page = 0, size = 10) {
    return axios.get(`${API_URL}/blogs?page=${page}&size=${size}`);
  }

  // Son eklenen blogları getir
  getRecentBlogs(limit = 3) {
    return axios.get(`${API_URL}/blogs/recent?limit=${limit}`);
  }

  // Belirli bir blogu ID'ye göre getir
  getBlogById(id) {
    return axios.get(`${API_URL}/blogs/${id}`);
  }

  // Kategorilere göre blogları filtrele
  getBlogsByCategory(category, page = 0, size = 10) {
    return axios.get(`${API_URL}/blogs/category/${category}?page=${page}&size=${size}`);
  }

  // Arama sorgusu ile blog ara
  searchBlogs(query, page = 0, size = 10) {
    return axios.get(`${API_URL}/blogs/search?query=${encodeURIComponent(query)}&page=${page}&size=${size}`);
  }

  // İlgili blogları getir
  getRelatedBlogs(blogId, limit = 3) {
    return axios.get(`${API_URL}/blogs/${blogId}/related?limit=${limit}`);
  }

  // Tüm kategorileri getir
  getAllCategories() {
    return axios.get(`${API_URL}/blogs/categories`);
  }
}

export default new BlogService(); 