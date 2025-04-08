import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentAdmin, isAdminAuthenticated, adminLogout, updateAdminPassword } from '../services/adminService';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin: 0;
`;

const LogoutButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: #c0392b;
  }
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
  max-width: 500px;
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

const AdminInfo = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 30px;
`;

const AdminDetail = styled.p`
  margin: 8px 0;
  font-size: 16px;
`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', error: false });
  
  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Check if admin is authenticated
    if (!isAdminAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    
    const currentAdmin = getCurrentAdmin();
    setAdmin(currentAdmin);
  }, [navigate]);

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
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
      await updateAdminPassword(admin.id, {
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

  if (!admin) {
    return <div>Loading admin information...</div>;
  }

  return (
    <DashboardContainer>
      <Header>
        <Title>Admin Dashboard</Title>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Header>
      
      <TabContainer>
        <Tab 
          active={activeTab === 'overview'} 
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </Tab>
        <Tab 
          active={activeTab === 'settings'} 
          onClick={() => setActiveTab('settings')}
        >
          Account Settings
        </Tab>
        {/* Additional tabs can be added here as needed */}
      </TabContainer>
      
      {message.text && (
        <Message error={message.error}>
          {message.text}
        </Message>
      )}
      
      {activeTab === 'overview' && (
        <div>
          <h2>Welcome, {admin.firstName}</h2>
          <AdminInfo>
            <h3>Admin Information</h3>
            <AdminDetail><strong>Name:</strong> {admin.firstName} {admin.lastName}</AdminDetail>
            <AdminDetail><strong>Email:</strong> {admin.email}</AdminDetail>
            <AdminDetail><strong>Role:</strong> Administrator</AdminDetail>
          </AdminInfo>
          
          <h3>Quick Actions</h3>
          {/* Quick action buttons can be added here */}
        </div>
      )}
      
      {activeTab === 'settings' && (
        <div>
          <h2>Account Settings</h2>
          
          <h3>Change Password</h3>
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
        </div>
      )}
    </DashboardContainer>
  );
};

export default AdminDashboard; 