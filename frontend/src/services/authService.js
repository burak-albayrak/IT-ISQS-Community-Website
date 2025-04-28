import api from './api';
import axios from 'axios';

// Login servisi
export const login = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    if (response.data && response.data.token) {
      const token = response.data.token;
      localStorage.setItem('token', token);
      
      // Token'dan kullanıcı ID'sini çıkar
      const userId = extractUserIdFromToken(token);
      console.log("Extracted user ID from token:", userId);
      
      // Temel kullanıcı bilgilerini oluştur
      let userInfo = {
        email: credentials.email,
        id: userId,
        userID: userId  // Her iki alan adını da kullan
      };
      
      try {
        // Kullanıcının tam profilini getir
        if (userId) {
          // ID ile profil getir
          const profileResponse = await getUserProfile(userId);
          console.log("Profile response from API:", profileResponse);
          
          if (profileResponse) {
            userInfo = {
              ...userInfo,
              ...profileResponse,
              id: userId, // ID'yi koru
              userID: userId // UserID'yi de koru
            };
          }
        } else {
          // Email ile profil getir
          const emailProfileResponse = await getUserByEmail(credentials.email);
          console.log("Profile by email response:", emailProfileResponse);
          
          if (emailProfileResponse) {
            const backendUserId = emailProfileResponse.userID;
            userInfo = {
              ...userInfo,
              ...emailProfileResponse,
              id: backendUserId, // Her iki alanı da güncelleyelim
              userID: backendUserId // Backend'den gelen ID'yi kullan
            };
          }
        }
      } catch (profileError) {
        console.warn('Could not fetch complete profile:', profileError);
        // Profil getirilemese bile login devam etmeli
      }
      
      // LocalStorage'a güncel kullanıcı bilgilerini kaydet
      console.log("Final user info to be stored:", userInfo);
      localStorage.setItem('user', JSON.stringify(userInfo));
      
      return {
        token: token,
        message: response.data.message || 'Login successful',
        user: userInfo
      };
    }
    return response.data;
  } catch (error) {
    console.error('Login service error:', error);
    
    // İsBlocked kontrolü için özel hata mesajı
    if (error.response && error.response.status === 403) {
      if (error.response.data && error.response.data.message) {
        if (error.response.data.message.includes('blocked')) {
          // Kullanıcının engellendiği durumda özel hata
          // eslint-disable-next-line no-throw-literal
          throw {
            message: error.response.data.message || 'Your account has been blocked. Please contact the administrator.',
            status: 403,
            isBlocked: true
          };
        }
      }
    }
    
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
    const decoded = atob(parts[1]);
    const payload = JSON.parse(decoded);
    
    console.log("JWT payload:", payload);
    
    // Return user ID if present in token payload
    // Backend'de userID veya sub alanlarını kontrol et
    const extractedId = payload.userID || payload.id || payload.sub || null;
    console.log("Extracted ID:", extractedId);
    return extractedId;
  } catch (error) {
    console.error('Error extracting user ID from token:', error);
    return null;
  }
};

// Register servisi
export const register = async (userData) => {
  try {
    console.log('Registering user with data:', userData);
    const response = await api.post('/users/register', userData);
    console.log('Registration successful:', response.data);
    
    // Başarılı kayıt durumunda token ve kullanıcı bilgilerini sakla
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      
      // Temel kullanıcı bilgilerini oluştur ve sakla
      const userInfo = {
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        institution: userData.institution || '',
        country: userData.country,
        role: userData.role
      };
      localStorage.setItem('user', JSON.stringify(userInfo));
    }
    
    return response.data;
  } catch (error) {
    console.error('Register service error:', error);
    
    if (error.response) {
      // API'den gelen hata
      console.error('API error response:', error.response.data);
      // eslint-disable-next-line no-throw-literal
      throw {
        message: error.response.data.message || 'Registration failed. Please try again.',
        status: error.response.status
      };
    } else if (error.request) {
      // İstek yapıldı ama yanıt alınamadı
      console.error('No response received:', error.request);
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'No response from server. Please check your connection.',
        status: 0
      };
    } else {
      // İstek oluşturulurken hata oluştu
      console.error('Request error:', error.message);
      // eslint-disable-next-line no-throw-literal
      throw {
        message: 'Failed to create request. Please try again.',
        status: 0
      };
    }
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

// Resend reset code for password reset
export const resendResetCode = async (email) => {
  try {
    const response = await api.post('/users/resend-reset-code', { email });
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

// Get user profile by email
export const getUserByEmail = async (email) => {
  try {
    const response = await api.get(`/users/email?email=${encodeURIComponent(email)}`);
    return response.data;
  } catch (error) {
    console.error('Get user by email error:', error);
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
    console.log(`Sending password update request to: /users/${userId}/password`);
    
    const response = await api.put(`/users/${userId}/password`, passwordData);
    
    // Başarılı cevap döndüyse
    if (response.data) {
      console.log("Password update successful:", response.data);
      return response.data;
    }
    
    return { message: "Password updated successfully" };
  } catch (error) {
    console.error('Update password service error:', error);
    
    // Spesifik hata durumlarını kontrol et
    if (error.status === 400 || 
        (error.message && error.message.toLowerCase().includes("password"))) {
      throw new Error("Old password is incorrect");
    }
    
    // Diğer hataları işle
    throw error.message ? error : new Error("Failed to update password");
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