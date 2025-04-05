import api from './api';

// Login servisi
export const login = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    console.error('Login service error:', error);
    throw error;
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