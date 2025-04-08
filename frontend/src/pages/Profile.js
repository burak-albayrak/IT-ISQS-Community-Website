import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, updateUserProfile, updateUserPassword } from '../services/authService';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  background: ${props => props.active ? '#3498db' : 'transparent'};
  color: ${props => props.active ? 'white' : '#333'};
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px 5px 0 0;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#3498db' : '#f1f1f1'};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #2980b9;
  }
  
  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  background-color: ${props => props.error ? '#e74c3c' : '#2ecc71'};
  color: white;
`;

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', error: false });
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  
  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    setUser(currentUser);
    setProfileForm({
      firstName: currentUser.firstName || '',
      lastName: currentUser.lastName || '',
      email: currentUser.email || ''
    });
  }, [navigate]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', error: false });
    
    try {
      await updateUserProfile(user.id, {
        firstName: profileForm.firstName,
        lastName: profileForm.lastName
      });
      
      setMessage({
        text: 'Profile updated successfully!',
        error: false
      });
    } catch (error) {
      setMessage({
        text: error.message || 'Failed to update profile. Please try again.',
        error: true
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', error: false });
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({
        text: 'New passwords do not match!',
        error: true
      });
      setLoading(false);
      return;
    }
    
    try {
      await updateUserPassword(user.id, {
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword
      });
      
      setMessage({
        text: 'Password updated successfully!',
        error: false
      });
      
      // Clear password form
      setPasswordForm({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      setMessage({
        text: error.message || 'Failed to update password. Please try again.',
        error: true
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading user information...</div>;
  }

  return (
    <ProfileContainer>
      <Title>My Profile</Title>
      
      <TabContainer>
        <Tab 
          active={activeTab === 'profile'} 
          onClick={() => setActiveTab('profile')}
        >
          Profile Info
        </Tab>
        <Tab 
          active={activeTab === 'password'} 
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
      
      {activeTab === 'profile' && (
        <Form onSubmit={handleProfileSubmit}>
          <FormGroup>
            <Label htmlFor="firstName">First Name</Label>
            <Input 
              type="text"
              id="firstName"
              name="firstName"
              value={profileForm.firstName}
              onChange={handleProfileChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              type="text"
              id="lastName"
              name="lastName"
              value={profileForm.lastName}
              onChange={handleProfileChange}
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input 
              type="email"
              id="email"
              name="email"
              value={profileForm.email}
              disabled
            />
            <small>Email cannot be changed</small>
          </FormGroup>
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
        </Form>
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
              minLength="6"
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
              minLength="6"
            />
          </FormGroup>
          
          <Button type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Password'}
          </Button>
        </Form>
      )}
    </ProfileContainer>
  );
};

export default Profile; 