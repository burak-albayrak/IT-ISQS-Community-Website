import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, updateUserPassword, getUserProfile, updateUserProfile, getUserByEmail } from '../services/authService';
import styled from 'styled-components';
import { FaEdit, FaEnvelope, FaUniversity, FaGlobe, FaUserTag, FaBirthdayCake, FaUser, FaSave, FaTimes, FaTimesCircle } from 'react-icons/fa';
import defaultAvatar from '../assets/defaultpp.jpg';
import ProfilePictureUpload from '../components/ProfilePictureUpload';

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  padding-bottom: 100px;
  min-height: 80vh;
  background-color: #FFF;
  position: relative;
  display: flex;
`;

const ProfileLeft = styled.div`
  width: 250px;
  padding-right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileRight = styled.div`
  flex: 1;
  padding-left: 30px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 470px;
    width: 1px;
    background-color: #f1f1f1;
  }
`;

const UserAvatar = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
  border: 1px solid #eaeaea;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PhotoButton = styled.button`
  background-color: #223A70;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #192C54;
  }
`;

const UserName = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin: 1px 0;
  text-align: center;
  color: #223A70;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #f1f1f1;
  margin-bottom: 15px;
  position: relative;
`;

const Tab = styled.button`
  padding: 10px 15px;
  margin-right: 20px;
  border: none;
  background: transparent;
  color: ${props => props.active === "true" ? '#0056b3' : '#333'};
  font-size: 16px;
  font-weight: ${props => props.active === "true" ? '700' : '600'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  position: relative;
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: color 0.3s, background-color 0.3s;
  border-radius: 4px;
  
  &:hover {
    color: ${props => props.active === "true" ? '#0056b3' : '#666'};
    background-color: ${props => props.disabled ? 'transparent' : '#f0f0f0'};
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 3px;
    background-color: #0056b3;
    bottom: -2px;
    left: 0;
    transform: scaleX(${props => props.active === "true" ? '1' : '0'});
    transform-origin: center;
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const ProfileContent = styled.div`
  padding: 20px 0;
`;

const InfoSection = styled.div`
  background-color: #fff;
  border-radius: 8px;
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 20px;
  align-items: center;
  padding: 10px 0;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f9f9f9;
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }
`;

const InfoLabel = styled.div`
  width: 150px;
  font-weight: 500;
  color: #666;
  display: flex;
  align-items: center;
  gap: 10px;
  
  svg {
    color: #223A70;
    font-size: 18px;
  }
`;

const InfoValue = styled.div`
  flex: 1;
  color: #333;
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
  font-size: 16px;
`;

const EditButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  background-color: #223A70;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 20px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background-color: #192C54;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 8px;
  color: #555;
  display: none;
`;

const Input = styled.input`
  padding: 12px 15px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  background-color: #f1f1f1;
  
  &:focus {
    outline: none;
    background-color: #e9e9e9;
  }
  
  &::placeholder {
    color: #666;
  }
`;

const Button = styled.button`
  padding: 12px 25px;
  background-color: #f1f1f1;
  color: #333;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-self: flex-end;
  
  &:hover {
    background-color: #e1e1e1;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  padding: 15px;
  margin: 20px 0;
  border-radius: 8px;
  background-color: ${props => props.error ? '#ffebee' : '#e8f5e9'};
  color: ${props => props.error ? '#c62828' : '#2e7d32'};
  border-left: 5px solid ${props => props.error ? '#c62828' : '#2e7d32'};
`;

const EditInput = styled.input`
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 16px;
  background-color: #fff;
  width: 100%;
  max-width: 300px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  &:focus {
    outline: none;
    border-color: #223A70;
    box-shadow: 0 0 0 2px rgba(34, 58, 112, 0.2);
  }
  
  &:hover {
    border-color: #223A70;
    background-color: #f8f9fa;
  }
`;

const EditSelect = styled.select`
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 16px;
  background-color: #fff;
  width: 100%;
  max-width: 300px;
  transition: all 0.2s ease;
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23223A70%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 15px top 50%;
  background-size: 12px auto;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  &:focus {
    outline: none;
    border-color: #223A70;
    box-shadow: 0 0 0 2px rgba(34, 58, 112, 0.2);
  }
  
  &:hover {
    border-color: #223A70;
    background-color: #f8f9fa;
  }
  
  option {
    padding: 10px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  padding: 8px 15px;
  background-color: #f1f1f1;
  color: #333;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    background-color: #e1e1e1;
  }
`;

const SaveButton = styled.button`
  padding: 8px 15px;
  background-color: #223A70;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    background-color: #192C54;
  }
`;

// Yükleme animasyonu için stiller
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  padding: 40px;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #E4E7EC;
  border-top: 4px solid #223A70;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  font-size: 16px;
  color: #667085;
  margin-top: 16px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 480px;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f1f1f1;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: #223A70;
  font-size: 1.5rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #666;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #f1f1f1;
    color: #333;
  }
  
  &:focus {
    outline: none;
  }
`;

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', error: false });
  const [editMode, setEditMode] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  
  const [editData, setEditData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    institution: '',
    country: '',
    role: '',
    age: '',
    gender: ''
  });
  
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [userProfile, setUserProfile] = useState({
    userID: 0,
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    institution: '',
    country: '',
    age: 0,
    gender: '',
    picture: ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const currentUser = getCurrentUser();
        if (!currentUser) {
          navigate('/login');
          return;
        }
        
        try {
          const userId = currentUser.userID || currentUser.id;
          console.log("Current user from localStorage:", currentUser);
          console.log("Extracted user ID:", userId);
          
          if (userId) {
            try {
              const userProfileData = await getUserProfile(userId);
              console.log("API response - user profile data:", userProfileData);
              
              if (userProfileData) {
                const userData = {
                  ...currentUser,
                  ...userProfileData,
                  id: userId
                };
                
                console.log("Final user data after merging:", userData);
                
                setUser(userData);
                setEditData({
                  firstName: userData.firstName || '',
                  lastName: userData.lastName || '',
                  email: userData.email || '',
                  institution: userData.institution || '',
                  country: userData.country || '',
                  role: userData.role || '',
                  age: userData.age?.toString() || '',
                  gender: userData.gender || ''
                });
                
                localStorage.setItem('user', JSON.stringify(userData));
                
                setUserProfile({
                  userID: userData.userID,
                  firstName: userData.firstName,
                  lastName: userData.lastName,
                  email: userData.email,
                  institution: userData.institution || '',
                  country: userData.country || '',
                  role: userData.role || '',
                  age: userData.age || 0,
                  gender: userData.gender || '',
                  picture: userData.picture || ''
                });
                
                setLoading(false);
                return;
              }
            } catch (idError) {
              console.error('Error fetching user profile by ID:', idError);
            }
          }
          
          if (currentUser.email) {
            try {
              const userByEmail = await getUserByEmail(currentUser.email);
              console.log("API response - user by email:", userByEmail);
              
              if (userByEmail) {
                const userData = {
                  ...currentUser,
                  ...userByEmail,
                  id: userByEmail.userID,
                  userID: userByEmail.userID 
                };
                
                console.log("Final user data after merging with email data:", userData);
                
                setUser(userData);
                setEditData({
                  firstName: userData.firstName || '',
                  lastName: userData.lastName || '',
                  email: userData.email || '',
                  institution: userData.institution || '',
                  country: userData.country || '',
                  role: userData.role || '',
                  age: userData.age?.toString() || '',
                  gender: userData.gender || ''
                });
                
                localStorage.setItem('user', JSON.stringify(userData));
                
                setUserProfile({
                  userID: userData.userID,
                  firstName: userData.firstName,
                  lastName: userData.lastName,
                  email: userData.email,
                  institution: userData.institution || '',
                  country: userData.country || '',
                  role: userData.role || '',
                  age: userData.age || 0,
                  gender: userData.gender || '',
                  picture: userData.picture || ''
                });
                
                setLoading(false);
                return;
              }
            } catch (emailError) {
              console.error('Error fetching user profile by email:', emailError);
              setMessage({
                text: 'Profil bilgileri yüklenemedi. Lütfen çıkış yapıp tekrar giriş yapın.',
                error: true
              });
            }
          }
        } catch (error) {
          console.error('Error fetching user profile from API:', error);
          setMessage({
            text: 'Profil bilgileri yüklenemedi. Lütfen çıkış yapıp tekrar giriş yapın.',
            error: true
          });
        }
        
        if (currentUser) {
          setUser(currentUser);
          setEditData({
            firstName: currentUser.firstName || '',
            lastName: currentUser.lastName || '',
            email: currentUser.email || '',
            institution: currentUser.institution || '',
            country: currentUser.country || '',
            role: currentUser.role || '',
            age: currentUser.age?.toString() || '',
            gender: currentUser.gender || ''
          });
        } else {
          setMessage({
            text: 'Oturum bilgileriniz bulunamadı. Lütfen tekrar giriş yapın.',
            error: true
          });
          setTimeout(() => navigate('/login'), 2000);
        }
      } catch (error) {
        console.error('Error in profile component:', error);
        setMessage({
          text: 'Bir hata oluştu. Lütfen çıkış yapıp tekrar giriş yapın.',
          error: true
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [navigate]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    setLoading(true);
    setMessage({ text: '', error: false });
    
    try {
      const userId = user.userID || user.id;
      
      if (!userId) {
        throw new Error('User ID is missing. Please log in again.');
      }
      
      const updatedProfile = {
        firstName: editData.firstName,
        lastName: editData.lastName,
        institution: editData.institution,
        country: editData.country,
        role: editData.role?.toUpperCase(),
        age: editData.age ? parseInt(editData.age) : null,
        gender: editData.gender?.toUpperCase(),
        picture: user.picture
      };
      
      console.log("Current user data:", user);
      console.log("Sending profile update data with picture:", updatedProfile);
      
      await updateUserProfile(userId, updatedProfile);
      
      setUser(prevUser => ({
        ...prevUser,
        ...updatedProfile,
        role: editData.role, 
        gender: editData.gender,
        picture: prevUser.picture
      }));
      
      setUserProfile(prevProfile => ({
        ...prevProfile,
        ...updatedProfile,
        role: editData.role,
        gender: editData.gender,
        picture: prevProfile.picture
      }));
      
      setMessage({
        text: 'Profile updated successfully!',
        error: false
      });
      
      setEditMode(false);
    } catch (error) {
      console.error("Profile update error:", error);
      setMessage({
        text: error.message || 'Failed to update profile. Please try again.',
        error: true
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', error: false });
    
    // Confirm password validation
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({
        text: 'New passwords do not match!',
        error: true
      });
      setLoading(false);
      return;
    }
    
    // Password strength validation
    if (passwordForm.newPassword.length < 8) {
      setMessage({
        text: 'New password must be at least 8 characters long',
        error: true
      });
      setLoading(false);
      return;
    }
    
    // Check if password contains at least one uppercase, one lowercase and one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordRegex.test(passwordForm.newPassword)) {
      setMessage({
        text: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        error: true
      });
      setLoading(false);
      return;
    }
    
    // Check if new password is same as old password
    if (passwordForm.oldPassword === passwordForm.newPassword) {
      setMessage({
        text: 'New password cannot be the same as the current password',
        error: true
      });
      setLoading(false);
      return;
    }
    
    try {
      // Use userID or id - consistent with profile update
      const userId = user.userID || user.id;
      
      if (!userId) {
        throw new Error('User ID is missing. Please log in again.');
      }
      
      console.log("Sending password update request for user ID:", userId);
      
      const response = await updateUserPassword(userId, {
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword
      });
      
      console.log("Password update response:", response);
      
      setMessage({
        text: 'Password updated successfully!',
        error: false
      });
      
      setPasswordForm({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error("Password update error:", error);
      
      // Handle specific error cases
      if (error.message && error.message.includes("incorrect")) {
        setMessage({
          text: 'Current password is incorrect',
          error: true
        });
      } else {
        setMessage({
          text: error.message || 'Failed to update password. Please try again.',
          error: true
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePictureUpdate = (pictureUrl) => {
    console.log('handlePictureUpdate called with pictureUrl:', pictureUrl);
    
    setUserProfile(prev => {
      console.log('Previous userProfile:', prev);
      const updated = {
        ...prev,
        picture: pictureUrl
      };
      console.log('Updated userProfile:', updated);
      return updated;
    });
    
    // Ayrıca ana user state'ini de güncelle
    setUser(prevUser => {
      console.log('Previous user state:', prevUser);
      const updated = {
        ...prevUser,
        picture: pictureUrl
      };
      console.log('Updated user state:', updated);
      return updated;
    });
    
    // Update the user data in localStorage to persist the change
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        console.log('Updating localStorage user data with new picture URL');
        const updatedUser = {
          ...storedUser,
          picture: pictureUrl
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Error updating user data in localStorage:', error);
    }
    
    // Güncelleme başarılı mesajı
    setMessage({
      text: 'Profile picture successfully updated!',
      error: false
    });
    
    // Modalı kapat
    setShowPhotoModal(false);
  };

  if (loading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  }

  const toggleEditMode = () => {
    if (editMode) {
      setEditData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        institution: user.institution || '',
        country: user.country || '',
        role: user.role || '',
        age: user.age?.toString() || '',
        gender: user.gender || ''
      });
    }
    setEditMode(!editMode);
  };

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", 
    "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", 
    "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", 
    "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", 
    "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", 
    "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "England", "Equatorial Guinea", "Eritrea", "Estonia", 
    "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", 
    "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", 
    "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", 
    "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", 
    "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", 
    "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", 
    "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", 
    "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", 
    "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", 
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", 
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", 
    "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", 
    "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", 
    "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", 
    "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  const roles = ["STUDENT", "ACADEMIC", "INDUSTRY_PROFESSIONAL", "OTHER"];
  
  const formatRole = (role) => {
    if (!role) return "";
    
    switch(role) {
      case "STUDENT": return "Student";
      case "ACADEMIC": return "Academic";
      case "INDUSTRY_PROFESSIONAL": return "Industry Professional";
      case "OTHER": return "Other";
      default: 
        if (role === role.toUpperCase()) {
          return role.charAt(0) + role.slice(1).toLowerCase().replace(/_/g, ' ');
        }
        return role;
    }
  };
  
  const genders = ["MALE", "FEMALE", "OTHER"];
  
  const formatGender = (gender) => {
    if (!gender) return "";
    
    switch(gender) {
      case "MALE": return "Male";
      case "FEMALE": return "Female";
      case "OTHER": return "Other";
      default: 
        if (gender === gender.toUpperCase()) {
          return gender.charAt(0) + gender.slice(1).toLowerCase();
        }
        return gender;
    }
  };

  // Ülke adı formatlaması
  const formatCountry = (country) => {
    if (!country) return "";
    
    // Tüm ülkelerin listesinde varsa doğru yazılışını kullan
    const foundCountry = countries.find(c => 
      c.toLowerCase() === country.toLowerCase()
    );
    
    if (foundCountry) return foundCountry;
    
    // Listede yoksa ilk harfi büyük yap
    return country.charAt(0).toUpperCase() + country.slice(1).toLowerCase();
  };

  return (
    <ProfileContainer>
      <ProfileLeft>
        <UserAvatar>
          <img src={userProfile.picture || defaultAvatar} alt={`${userProfile.firstName}'s avatar`} />
        </UserAvatar>
        {editMode && (
          <PhotoButton onClick={() => setShowPhotoModal(true)}>
            <FaEdit /> Change Profile Picture
          </PhotoButton>
        )}
        <UserName>{`${userProfile.firstName} ${userProfile.lastName}`}</UserName>
      </ProfileLeft>
      
      <ProfileRight>
        <TabContainer>
          <Tab 
            active={activeTab === 'about' ? "true" : "false"} 
            onClick={() => setActiveTab('about')}
          >
            About
          </Tab>
          <Tab 
            disabled={true} 
            onClick={() => {}}
          >
            My Forum Posts
          </Tab>
          <Tab 
            active={activeTab === 'password' ? "true" : "false"} 
            onClick={() => setActiveTab('password')}
          >
            Change Password
          </Tab>
        </TabContainer>
        
        {message.text && (
          <Message error={message.error}>
            {message.text}
          </Message>
        )}
        
        <ProfileContent>
          {activeTab === 'about' && (
            <>
              <InfoSection>
                <InfoRow>
                  <InfoLabel><FaEnvelope /> E-mail:</InfoLabel>
                  <InfoValue>{user?.email || <span style={{color: '#999', fontStyle: 'italic'}}>Not specified</span>}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel><FaUniversity /> Institution:</InfoLabel>
                  {editMode ? (
                    <EditInput 
                      type="text"
                      name="institution"
                      value={editData.institution}
                      onChange={handleEditChange}
                    />
                  ) : (
                    <InfoValue>{user?.institution || <span style={{color: '#999', fontStyle: 'italic'}}>Not specified</span>}</InfoValue>
                  )}
                </InfoRow>
                <InfoRow>
                  <InfoLabel><FaGlobe /> Country:</InfoLabel>
                  {editMode ? (
                    <EditSelect
                      name="country"
                      value={editData.country}
                      onChange={handleEditChange}
                    >
                      <option value="">Select Country</option>
                      {countries.map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </EditSelect>
                  ) : (
                    <InfoValue>
                      {user?.country ? 
                        (typeof user.country === 'string' ? 
                          formatCountry(user.country) : 
                          user.country) : 
                        <span style={{color: '#999', fontStyle: 'italic'}}>Not specified</span>}
                    </InfoValue>
                  )}
                </InfoRow>
                <InfoRow>
                  <InfoLabel><FaUserTag /> Role:</InfoLabel>
                  {editMode ? (
                    <EditSelect
                      name="role"
                      value={editData.role}
                      onChange={handleEditChange}
                    >
                      <option value="">Select Role</option>
                      {roles.map((role, index) => (
                        <option key={index} value={role}>
                          {formatRole(role)}
                        </option>
                      ))}
                    </EditSelect>
                  ) : (
                    <InfoValue>
                      {user?.role ? 
                        (typeof user.role === 'string' ? 
                          formatRole(user.role) : 
                          user.role) : 
                        <span style={{color: '#999', fontStyle: 'italic'}}>Not specified</span>}
                    </InfoValue>
                  )}
                </InfoRow>
                <InfoRow>
                  <InfoLabel><FaBirthdayCake /> Age:</InfoLabel>
                  {editMode ? (
                    <EditInput 
                      type="number"
                      name="age"
                      min="1"
                      max="120"
                      value={editData.age}
                      onChange={handleEditChange}
                    />
                  ) : (
                    <InfoValue>{user?.age !== null && user?.age !== undefined ? user.age : <span style={{color: '#999', fontStyle: 'italic'}}>Not specified</span>}</InfoValue>
                  )}
                </InfoRow>
                <InfoRow>
                  <InfoLabel><FaUser /> Gender:</InfoLabel>
                  {editMode ? (
                    <EditSelect
                      name="gender"
                      value={editData.gender}
                      onChange={handleEditChange}
                    >
                      <option value="">Select Gender</option>
                      {genders.map((gender, index) => (
                        <option key={index} value={gender}>
                          {formatGender(gender)}
                        </option>
                      ))}
                    </EditSelect>
                  ) : (
                    <InfoValue>{user?.gender ? 
                      (typeof user.gender === 'string' ? 
                        formatGender(user.gender) : 
                        user.gender) : 
                      <span style={{color: '#999', fontStyle: 'italic'}}>Not specified</span>}</InfoValue>
                  )}
                </InfoRow>
              </InfoSection>
              
              {editMode && (
                <ButtonGroup>
                  <CancelButton onClick={toggleEditMode}>
                    <FaTimes /> Cancel
                  </CancelButton>
                  <SaveButton onClick={handleEditSubmit}>
                    <FaSave /> Save
                  </SaveButton>
                </ButtonGroup>
              )}
            </>
          )}
          
          {activeTab === 'password' && (
            <Form onSubmit={handlePasswordSubmit}>
              <FormGroup>
                <Label htmlFor="oldPassword">Current Password</Label>
                <Input 
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  value={passwordForm.oldPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Current Password"
                  minLength="8"
                  maxLength="64"
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="newPassword">New Password</Label>
                <Input 
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="New Password"
                  minLength="8"
                  maxLength="64"
                  title="Must contain at least one number, one uppercase and lowercase letter, and at least 8 characters"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input 
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Confirm New Password"
                  minLength="8"
                  maxLength="64"
                />
                {passwordForm.confirmPassword && passwordForm.newPassword && 
                  passwordForm.confirmPassword !== passwordForm.newPassword && (
                  <small style={{ color: '#c62828', fontSize: '12px', marginTop: '5px' }}>
                    Passwords do not match
                  </small>
                )}
              </FormGroup>
              
              <Button 
                type="submit" 
                disabled={
                  loading || 
                  (passwordForm.confirmPassword && passwordForm.newPassword && 
                  passwordForm.confirmPassword !== passwordForm.newPassword)
                }
              >
                {loading ? 'Processing...' : 'Change Password'}
              </Button>
            </Form>
          )}
        </ProfileContent>
      </ProfileRight>
      
      <EditButton onClick={toggleEditMode}>
        <FaEdit /> {editMode ? 'Cancel Edit' : 'Edit Profile'}
      </EditButton>
      
      {/* Profil Resmi Güncelleme Modal */}
      {showPhotoModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Update Profile Picture</ModalTitle>
              <CloseButton onClick={() => setShowPhotoModal(false)}>
                <span style={{ fontSize: '24px', fontWeight: 'bold' }}>×</span>
              </CloseButton>
            </ModalHeader>
            <ProfilePictureUpload 
              userId={userProfile.userID}
              currentPicture={userProfile.picture}
              onPictureUpdated={handlePictureUpdate}
            />
          </ModalContent>
        </Modal>
      )}
    </ProfileContainer>
  );
};

export default Profile; 