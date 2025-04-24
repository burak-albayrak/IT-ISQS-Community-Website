import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false // CORS için credentials göndermeyi kapatıyoruz, JWT token header'da gönderilecek
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    // Önce adminToken için kontrol et, eğer yoksa normal token'ı kontrol et
    const adminToken = localStorage.getItem('adminToken');
    const userToken = localStorage.getItem('token');
    
    // Admin token varsa onu kullan, yoksa user token'ı kullan
    if (adminToken) {
      config.headers['Authorization'] = `Bearer ${adminToken}`;
    } else if (userToken) {
      config.headers['Authorization'] = `Bearer ${userToken}`;
    }
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors
    if (!error.response) {
      console.error('Network Error:', error.message);
      return Promise.reject({ message: 'Network error. Please check your connection and try again.' });
    }
    
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // URL'e göre token temizleme
      if (error.config.url.includes('/admins/')) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('admin');
      } else {
        localStorage.removeItem('token');
      }
      // Redirect to login page can be implemented here
    }
    
    // Return standardized error
    return Promise.reject(error.response ? error.response.data : error.message);
  }
);

export default api; 