import axiosInstance from './axiosConfig';

/**
 * Media upload service for handling file uploads
 */
const mediaService = {
  /**
   * Upload a media file
   * @param {File} file - The file to upload
   * @returns {Promise<Object>} - The response containing the file URL
   */
  uploadMedia: async (file) => {
    if (!file) {
      throw new Error('No file provided');
    }
    
    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size must be less than 5MB');
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Only JPG, PNG, GIF, and WebP images are allowed');
    }
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await axiosInstance.post('/media/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error uploading media:', error);
      throw error.response?.data?.error || error.message || 'Upload failed';
    }
  },
  
  /**
   * Delete a media file
   * @param {string} fileUrl - URL of the file to delete
   * @returns {Promise<Object>} - The response
   */
  deleteMedia: async (fileUrl) => {
    if (!fileUrl) {
      throw new Error('No file URL provided');
    }
    
    try {
      const response = await axiosInstance.delete(`/media/delete?url=${encodeURIComponent(fileUrl)}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting media:', error);
      throw error.response?.data?.error || error.message || 'Delete failed';
    }
  }
};

export default mediaService; 