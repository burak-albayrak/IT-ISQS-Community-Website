import api from './api';

// Admin login service
export const adminLogin = async (credentials) => {
  try {
    console.log('Admin login attempt with endpoint:', '/admins/login');
    // Doğru API endpoint'i '/admins/login' 
    const response = await api.post('/admins/login', credentials);
    
    console.log('Admin login response:', response.data);
    
    if (response.data && response.data.token) {
      // Token ve admin bilgilerini doğru şekilde kaydet
      localStorage.setItem('adminToken', response.data.token);
      
      // Response yapısına bağlı olarak admin bilgilerini kaydet
      if (response.data.user) {
        localStorage.setItem('admin', JSON.stringify(response.data.user));
      } else if (response.data.admin) {
        localStorage.setItem('admin', JSON.stringify(response.data.admin));
      } else {
        // Admin bilgisi yoksa default bir değer ayarla
        const defaultAdmin = { 
          id: 1, 
          firstName: 'Admin', 
          email: credentials.email 
        };
        localStorage.setItem('admin', JSON.stringify(defaultAdmin));
      }
    } else {
      throw new Error('Invalid response format from server.');
    }
    return response.data;
  } catch (error) {
    console.error('Admin login service error:', error);
    if (error.response) {
      console.error('Server response:', error.response);
    }
    throw error;
  }
};

// Admin password update service
export const updateAdminPassword = async (adminId, passwordData) => {
  try {
    const response = await api.put(`/admins/${adminId}/password`, passwordData);
    return response.data;
  } catch (error) {
    console.error('Update admin password service error:', error);
    throw error;
  }
};

// Admin logout service
export const adminLogout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('admin');
};

// Check if admin is authenticated
export const isAdminAuthenticated = () => {
  try {
    const token = localStorage.getItem('adminToken');
    return !!token;
  } catch (error) {
    console.error('Error checking admin authentication:', error);
    return false;
  }
};

// Get current admin data
export const getCurrentAdmin = () => {
  try {
    const adminStr = localStorage.getItem('admin');
    if (!adminStr) return null;
    return JSON.parse(adminStr);
  } catch (error) {
    console.error('Error parsing admin data:', error);
    localStorage.removeItem('admin');
    return null;
  }
};

// Fetch all users
export const getAllUsers = async () => {
  try {
    const response = await api.get('/admins/users');
    return response.data;
  } catch (error) {
    console.error('Get all users service error:', error);
    throw error;
  }
};

// Get specific user by ID
export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/admins/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Get user by ID service error:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (userId, profileData) => {
  try {
    const response = await api.put(`/admins/users/${userId}`, profileData);
    return response.data;
  } catch (error) {
    console.error('Update user profile service error:', error);
    throw error;
  }
};

// Activate/deactivate user
export const updateUserActiveStatus = async (userId, isActive) => {
  try {
    const response = await api.put(`/admins/users/${userId}/activate`, { isActive });
    return response.data;
  } catch (error) {
    console.error('Update user active status service error:', error);
    throw error;
  }
};

// Block/unblock user
export const updateUserBlockStatus = async (userId, isBlocked) => {
  try {
    const response = await api.put(`/admins/users/${userId}/block`, { isBlocked });
    return response.data;
  } catch (error) {
    console.error('Update user block status service error:', error);
    throw error;
  }
};

// Reset user password
export const resetUserPassword = async (userId, newPassword) => {
  try {
    const response = await api.put(`/admins/users/${userId}/reset-password`, { newPassword });
    return response.data;
  } catch (error) {
    console.error('Reset user password service error:', error);
    throw error;
  }
};

// --- Blog Yönetimi ---

// Tüm blogları getir
export const getAllBlogs = async () => {
  try {
    const response = await api.get('/blogs');
    return response.data;
  } catch (error) {
    console.error('Get all blogs service error:', error);
    throw error;
  }
};

// Belirli bir blogu ID'ye göre getir
export const getBlogById = async (blogId) => {
  try {
    const response = await api.get(`/blogs/${blogId}`);
    return response.data;
  } catch (error) {
    console.error('Get blog by ID service error:', error);
    throw error;
  }
};

// Yeni blog oluştur
export const createBlog = async (blogData) => {
  try {
    const response = await api.post('/blogs/create', blogData);
    return response.data;
  } catch (error) {
    console.error('Create blog service error:', error);
    throw error;
  }
};

// Blog güncelle
export const updateBlog = async (blogId, blogData) => {
  try {
    const response = await api.put(`/blogs/${blogId}`, blogData);
    return response.data;
  } catch (error) {
    console.error('Update blog service error:', error);
    throw error;
  }
};

// Blog sil
export const deleteBlog = async (blogId) => {
  try {
    const response = await api.delete(`/blogs/${blogId}`);
    return response.data;
  } catch (error) {
    console.error('Delete blog service error:', error);
    throw error;
  }
}; 