import api from './api';

// Login servisi
export const login = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      
      // Create a basic user object from credentials
      // Ideally, the backend would return user details in the token or response
      const basicUserInfo = {
        email: credentials.email,
        id: extractUserIdFromToken(response.data.token), // Try to extract user ID from token
        firstName: '',
        lastName: ''
      };
      
      // Store basic user info in localStorage
      localStorage.setItem('user', JSON.stringify(basicUserInfo));
      
      // Return both token and user info
      return {
        token: response.data.token,
        message: response.data.message,
        user: basicUserInfo
      };
    }
    return response.data;
  } catch (error) {
    console.error('Login service error:', error);
    throw error;
  }
};

// Function to extract user ID from JWT if possible
const extractUserIdFromToken = (token) => {
  try {
    // JWT tokens have three parts: header.payload.signature
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    // Decode the payload (middle part)
    const payload = JSON.parse(atob(parts[1]));
    
    // Return user ID if present in token payload
    return payload.id || payload.sub || null;
  } catch (error) {
    console.error('Error extracting user ID from token:', error);
    return null;
  }
};

// Register servisi
export const register = async (userData) => {
  try {
    console.log('Registering user with data:', userData);
    const response = await api.post('/users', userData);
    console.log('Register response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Register service error:', error);
    throw error;
  }
};

// Email doğrulama servisi
export const verifyEmail = async (code) => {
  try {
    const response = await api.post('/users/verify', { code });
    return response.data;
  } catch (error) {
    console.error('Verify email service error:', error);
    throw error;
  }
};

// Yeni doğrulama kodu gönderme servisi
export const resendVerificationCode = async (email) => {
  try {
    const response = await api.post('/users/resend-verification', { email });
    return response.data;
  } catch (error) {
    console.error('Resend code service error:', error);
    throw error;
  }
};

// Şifre sıfırlama için kod gönderme
export const forgotPassword = async (email) => {
  try {
    const response = await api.post('/users/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Şifre sıfırlama kodu doğrulama
export const verifyResetCode = async (code) => {
  try {
    const response = await api.post('/users/verify-reset-code', { code });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Şifre sıfırlama
export const resetPassword = async (code, newPassword) => {
  try {
    const response = await api.post('/users/reset-password', { code, newPassword });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Get user profile by ID
export const getUserProfile = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Get user profile error:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (userId, profileData) => {
  try {
    const response = await api.put(`/users/${userId}`, profileData);
    // Update local storage with new user data if needed
    const currentUser = getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...profileData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    return response.data;
  } catch (error) {
    console.error('Update profile service error:', error);
    throw error;
  }
};

// Update user password
export const updateUserPassword = async (userId, passwordData) => {
  try {
    const response = await api.put(`/users/${userId}/password`, passwordData);
    return response.data;
  } catch (error) {
    console.error('Update password service error:', error);
    throw error;
  }
};

// Kullanıcı çıkış servisi
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Oturum kontrolü
export const isAuthenticated = () => {
  try {
    const token = localStorage.getItem('token');
    return !!token;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

// Mevcut kullanıcı verisini getir
export const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error parsing user data:', error);
    // Hatalı veriyi temizle
    localStorage.removeItem('user');
    return null;
  }
}; 