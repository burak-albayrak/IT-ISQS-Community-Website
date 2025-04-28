import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axiosInstance from '../services/axiosConfig';
import mediaService from '../services/mediaService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 95%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding: 24px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0;
  color: #223A70;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #222;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #223A70;
    box-shadow: 0 0 0 2px rgba(34, 58, 112, 0.2);
  }
`;

const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: #223A70;
    box-shadow: 0 0 0 2px rgba(34, 58, 112, 0.2);
  }
`;

const TextArea = styled.textarea`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 200px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #223A70;
    box-shadow: 0 0 0 2px rgba(34, 58, 112, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const CancelButton = styled(Button)`
  background-color: #f1f1f1;
  color: #333;
  
  &:hover {
    background-color: #e1e1e1;
  }
`;

const SaveButton = styled(Button)`
  background-color: #223A70;
  color: white;
  
  &:hover {
    background-color: #192C54;
  }
`;

const MediaUploadContainer = styled.div`
  border: 2px dashed #ddd;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #223A70;
    background-color: rgba(34, 58, 112, 0.05);
  }
`;

const MediaPreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  border-radius: 4px;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.9rem;
  margin: 5px 0 0 0;
`;

// Blog kategorileri
const BLOG_CATEGORIES = [
  'ARVR',
  'Blockchain',
  'CloudComputing',
  'Cybersecurity',
  'DataScience',
  'DatabaseManagement',
  'DevOps',
  'EmbeddedSystems',
  'GameDevelopment',
  'MachineLearning',
  'MobileDevelopment',
  'OpenSource',
  'ProjectManagement',
  'QAStandards',
  'SoftwareArchitecture',
  'SoftwareTesting',
  'TestPlanning',
  'WebDevelopment'
];

const BlogEditModal = ({ blog, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    owner: '',
    media: ''
  });
  
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const fileInputRef = React.createRef();
  
  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || '',
        description: blog.description || '',
        category: blog.category || '',
        owner: blog.owner || '',
        media: blog.media || ''
      });
      
      if (blog.media) {
        setMediaPreview(blog.media);
      }
    }
  }, [blog]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Hata varsa temizle
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const handleMediaClick = () => {
    fileInputRef.current.click();
  };
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Dosya büyüklüğü kontrolü (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        media: 'Dosya boyutu 5MB\'dan küçük olmalıdır'
      }));
      return;
    }
    
    // Dosya tipi kontrolü
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setErrors(prev => ({
        ...prev,
        media: 'Sadece JPG, PNG, GIF ve WebP resim dosyaları kabul edilir'
      }));
      return;
    }
    
    setMediaFile(file);
    setMediaPreview(URL.createObjectURL(file));
    
    // Hata varsa temizle
    if (errors.media) {
      setErrors(prev => ({
        ...prev,
        media: null
      }));
    }
  };
  
  const handleRemoveMedia = () => {
    setMediaFile(null);
    setMediaPreview('');
    setFormData(prev => ({
      ...prev,
      media: ''
    }));
    fileInputRef.current.value = '';
  };
  
  const uploadMedia = async () => {
    if (!mediaFile) return null;
    
    setUploading(true);
    
    try {
      const response = await mediaService.uploadMedia(mediaFile);
      setUploading(false);
      return response.fileUrl;
    } catch (error) {
      setUploading(false);
      console.error('Media upload error:', error);
      setErrors(prev => ({
        ...prev,
        media: 'Medya yüklenirken hata oluştu. Lütfen tekrar deneyin.'
      }));
      return null;
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Başlık girilmelidir';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'İçerik girilmelidir';
    }
    
    if (!formData.category) {
      newErrors.category = 'Kategori seçilmelidir';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      let mediaUrl = formData.media;
      
      // Yeni medya yüklendiyse
      if (mediaFile) {
        mediaUrl = await uploadMedia();
        if (!mediaUrl) {
          setLoading(false);
          return;
        }
      }
      
      const blogData = {
        ...formData,
        media: mediaUrl
      };
      
      await onSave(blog ? blog.blogID : null, blogData);
      setLoading(false);
      onClose();
    } catch (error) {
      console.error('Save blog error:', error);
      setLoading(false);
      setErrors(prev => ({
        ...prev,
        form: 'Blog kaydedilirken hata oluştu. Lütfen tekrar deneyin.'
      }));
    }
  };
  
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <Title>{blog ? 'Edit Blog' : 'Create New Blog'}</Title>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
            />
            {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="category">Category</Label>
            <Select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              {BLOG_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </option>
              ))}
            </Select>
            {errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="owner">Author (Optional)</Label>
            <Input
              id="owner"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
              placeholder="Leave empty to use your name"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="media">Featured Image</Label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
              accept="image/jpeg,image/png,image/gif,image/webp"
            />
            
            {mediaPreview ? (
              <MediaPreview>
                <PreviewImage src={mediaPreview} alt="Preview" />
                <RemoveButton type="button" onClick={handleRemoveMedia}>
                  <FontAwesomeIcon icon={faTimesCircle} /> Remove Image
                </RemoveButton>
              </MediaPreview>
            ) : (
              <MediaUploadContainer onClick={handleMediaClick}>
                <FontAwesomeIcon icon={faImage} size="2x" style={{ color: '#777', marginBottom: '10px' }} />
                <p>Click to upload an image<br /><small>(JPG, PNG, GIF or WebP, max 5MB)</small></p>
              </MediaUploadContainer>
            )}
            {errors.media && <ErrorMessage>{errors.media}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="description">Content</Label>
            <TextArea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write your blog content here..."
            />
            {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
          </FormGroup>
          
          {errors.form && <ErrorMessage>{errors.form}</ErrorMessage>}
          
          <ButtonGroup>
            <CancelButton type="button" onClick={onClose} disabled={loading || uploading}>
              Cancel
            </CancelButton>
            <SaveButton type="submit" disabled={loading || uploading}>
              {(loading || uploading) ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin /> {uploading ? 'Uploading...' : 'Saving...'}
                </>
              ) : (
                'Save Blog'
              )}
            </SaveButton>
          </ButtonGroup>
        </Form>
      </ModalContainer>
    </Overlay>
  );
};

export default BlogEditModal; 