import React, { useState, useRef } from 'react';
import api from '../services/api';
import defaultAvatar from '../assets/defaultpp.jpg';
import { FaUpload, FaExclamationTriangle, FaCheckCircle, FaSpinner, FaTrashAlt } from 'react-icons/fa';

function ProfilePictureUpload({ userId, currentPicture, onPictureUpdated }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);
  
  // Triggers file selection
  function handleImageClick() {
    console.log('handleImageClick triggered');
    console.log('fileInputRef.current:', fileInputRef.current);
    
    // Add visual feedback (temporarily change border color)
    if (imgRef.current) {
      const originalBorder = imgRef.current.style.border;
      imgRef.current.style.border = '3px solid #223A70'; 
      console.log('Image border changed');
      setTimeout(() => {
        if(imgRef.current) imgRef.current.style.border = originalBorder;
        console.log('Image border reverted');
      }, 300);
    }

    if (fileInputRef.current) {
      fileInputRef.current.click();
      console.log('fileInputRef.current.click() called');
    } else {
      console.error('fileInputRef.current is null or undefined');
    }
  }
  
  // Handles removing the profile picture
  async function handleRemoveImage() {
    if (!window.confirm('Are you sure you want to remove your profile picture?')) {
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      const response = await api.post(
        `/users/${userId}/remove-profile-picture`
      );
      
      console.log('Profile picture removed:', response.data);
      
      if (onPictureUpdated) {
        onPictureUpdated(null); // Pass null to indicate picture removal
      }
      
      setSuccess(true);
    } catch (error) {
      console.error('Remove picture error:', error);
      // Enhanced error handling to account for different error formats
      let errorMessage = 'An error occurred while removing the profile picture';
      
      if (error.response && error.response.data) {
        // Standard axios error with response data
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.message) {
        // API service might return error directly as message
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        // If the error is returned as a string
        errorMessage = error;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }
  
  // Runs when a file is selected
  async function handleFileChange(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    console.log("File selected:", file.name);
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size exceeds 5MB limit. Please choose a smaller file.');
      return;
    }
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Please use JPEG, PNG, GIF or WEBP formats.');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess(false);
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await api.post(
        `/users/${userId}/profile-picture`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      console.log('Profile picture uploaded:', response.data);
      
      if (onPictureUpdated) {
        onPictureUpdated(response.data.pictureUrl);
      }
      
      setSuccess(true);
    } catch (error) {
      console.error('Upload error:', error);
      // Enhanced error handling to account for different error formats
      let errorMessage = 'An error occurred while uploading the image';
      
      if (error.response && error.response.data) {
        // Standard axios error with response data
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.message) {
        // API service might return error directly as message
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        // If the error is returned as a string
        errorMessage = error;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{ marginBottom: '15px', color: '#666', fontSize: '14px' }}>
        Click on the image or the button to select a new profile picture
      </p>
      
      {/* Profile Image */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img 
          ref={imgRef}
          src={currentPicture || defaultAvatar} 
          alt="Profile Picture"
          onClick={handleImageClick}
          style={{ 
            width: '180px', 
            height: '180px', 
            borderRadius: '50%',
            objectFit: 'cover',
            border: '3px solid #ccc',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.1s ease-in-out',
            margin: '0 auto',
            display: 'block'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
          }}
        />
      </div>
      
      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        marginBottom: '15px'
      }}>
        {/* Remove Image button - only show if there's a current picture */}
        {currentPicture && (
          <button
            onClick={handleRemoveImage}
            style={{
              padding: '8px 20px',
              backgroundColor: '#c62828',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#b71c1c';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#c62828';
            }}
          >
            <FaTrashAlt /> Remove Image
          </button>
        )}
        
        {/* Image Selection Button */}
        <button
          onClick={handleImageClick}
          style={{
            padding: '8px 20px',
            backgroundColor: '#223A70',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#192C54';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#223A70';
          }}
        >
          <FaUpload /> Select New Image
        </button>
      </div>
      
      {/* Requirements List */}
      <div style={{ 
        textAlign: 'left', 
        fontSize: '13px', 
        color: '#666', 
        backgroundColor: '#f8f9fa', 
        padding: '12px',
        borderRadius: '8px',
        marginBottom: '15px',
        maxWidth: '400px',
        margin: '0 auto 15px'
      }}>
        <p style={{ fontWeight: 'bold', marginBottom: '8px', color: '#444' }}>Image Requirements:</p>
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          <li>File format: JPEG, PNG, GIF, or WEBP</li>
          <li>Maximum file size: 5MB</li>
          <li>Recommended resolution: 400x400 pixels</li>
          <li>Square images work best</li>
        </ul>
      </div>
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg, image/png, image/gif, image/webp"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      
      {/* Status Messages */}
      {loading && (
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          color: '#666', 
          fontSize: '14px', 
          marginTop: '10px' 
        }}>
          <FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> {currentPicture ? 'Processing...' : 'Uploading...'}
        </div>
      )}
      {error && (
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          color: '#d32f2f', 
          fontSize: '14px', 
          marginTop: '10px', 
          padding: '8px', 
          backgroundColor: '#ffebee', 
          borderRadius: '4px' 
        }}>
          <FaExclamationTriangle /> {error}
        </div>
      )}
      {success && (
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          color: '#2e7d32', 
          fontSize: '14px', 
          marginTop: '10px', 
          padding: '8px', 
          backgroundColor: '#e8f5e9', 
          borderRadius: '4px' 
        }}>
          <FaCheckCircle /> {currentPicture ? 'Profile picture successfully removed!' : 'Profile picture successfully updated!'}
        </div>
      )}
      
      {/* İnline CSS ile animasyon tanımlama */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}

export default ProfilePictureUpload; 