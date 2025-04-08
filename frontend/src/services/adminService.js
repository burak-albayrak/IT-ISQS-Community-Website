import api from './api';

// Admin login service
export const adminLogin = async (credentials) => {
  try {
    const response = await api.post('/admins/login', credentials);
    if (response.data && response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('admin', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    console.error('Admin login service error:', error);
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