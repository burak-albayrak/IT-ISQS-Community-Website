import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, updateUserPassword, getUserProfile, updateUserProfile } from '../services/authService';
import styled from 'styled-components';
import { FaEdit, FaEnvelope, FaUniversity, FaGlobe, FaUserTag, FaBirthdayCake, FaUser, FaSave, FaTimes } from 'react-icons/fa';
import defaultLogo from '../assets/jenny.png';

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
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
  border: 1px solid #eaeaea;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
  color: ${props => props.active ? '#0056b3' : '#333'};
  font-size: 16px;
  font-weight: ${props => props.active ? '700' : '600'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  position: relative;
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: color 0.3s, background-color 0.3s;
  border-radius: 4px;
  
  &:hover {
    color: ${props => props.active ? '#0056b3' : '#666'};
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
    transform: scaleX(${props => props.active ? '1' : '0'});
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
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  background-color: #fff;
  width: 100%;
  max-width: 300px;
  
  &:focus {
    outline: none;
    border-color: #0056b3;
    box-shadow: 0 0 0 2px rgba(0, 86, 179, 0.1);
  }
`;

const EditSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  background-color: #fff;
  width: 100%;
  max-width: 300px;
  
  &:focus {
    outline: none;
    border-color: #0056b3;
    box-shadow: 0 0 0 2px rgba(0, 86, 179, 0.1);
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

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', error: false });
  const [editMode, setEditMode] = useState(false);
  
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

  const mockUser = {
    firstName: 'Jenny',
    lastName: 'Wilson',
    email: 'jennywilson@example.com',
    institution: 'Example University',
    country: 'England',
    role: 'Student',
    age: 24,
    gender: 'Female',
    avatarUrl: 'https://via.placeholder.com/200'
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const currentUser = getCurrentUser();
        if (!currentUser) {
          navigate('/login');
          return;
        }
        
        try {
          if (currentUser.id) {
            const userProfileData = await getUserProfile(currentUser.id);
            if (userProfileData) {
              const userData = {
                ...userProfileData,
                avatarUrl: userProfileData.avatarUrl || defaultLogo
              };
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
              setLoading(false);
              return;
            }
          }
        } catch (error) {
          console.error('Error fetching user profile from API:', error);
        }
        
        const userData = {
          ...mockUser,
          ...currentUser,
          avatarUrl: currentUser.avatarUrl || defaultLogo
        };
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
      } catch (error) {
        console.error('Error in profile component:', error);
        const userData = {
          ...mockUser,
          avatarUrl: defaultLogo
        };
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
      if (!user.id) {
        throw new Error('User ID is missing. Please log in again.');
      }
      
      const updatedProfile = {
        ...editData,
        age: editData.age ? parseInt(editData.age) : null,
      };
      
      delete updatedProfile.email;
      
      await updateUserProfile(user.id, updatedProfile);
      
      setUser(prevUser => ({
        ...prevUser,
        ...updatedProfile
      }));
      
      setMessage({
        text: 'Profile updated successfully!',
        error: false
      });
      
      setEditMode(false);
    } catch (error) {
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
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage({
        text: 'New passwords do not match!',
        error: true
      });
      setLoading(false);
      return;
    }
    
    try {
      if (!user.id) {
        throw new Error('User ID is missing. Please log in again.');
      }
      
      await updateUserPassword(user.id, {
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword
      });
      
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
      setMessage({
        text: error.message || 'Failed to update password. Please try again.',
        error: true
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading user information...</div>;
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

  const roles = ["Student", "Professor", "Researcher", "Professional", "Other"];

  return (
    <ProfileContainer>
      <ProfileLeft>
        <UserAvatar>
          <img 
            src={user?.avatarUrl || '/logo192.png'} 
            alt={`${user?.firstName} ${user?.lastName}`} 
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = '/logo192.png';
            }}
          />
        </UserAvatar>
        <UserName>{user.firstName ? `${user.firstName} ${user.lastName}` : 'Jenny Wilson'}</UserName>
      </ProfileLeft>
      
      <ProfileRight>
        <TabContainer>
          <Tab 
            active={activeTab === 'about'} 
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
        
        <ProfileContent>
          {activeTab === 'about' && (
            <>
              <InfoSection>
                <InfoRow>
                  <InfoLabel><FaEnvelope /> E-mail:</InfoLabel>
                  <InfoValue>{user?.email}</InfoValue>
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
                    <InfoValue>{user?.institution}</InfoValue>
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
                    <InfoValue>{user?.country}</InfoValue>
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
                          {role}
                        </option>
                      ))}
                    </EditSelect>
                  ) : (
                    <InfoValue>{user?.role}</InfoValue>
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
                    <InfoValue>{user?.age}</InfoValue>
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
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </EditSelect>
                  ) : (
                    <InfoValue>{user?.gender}</InfoValue>
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
                />
              </FormGroup>
              
              <Button type="submit" disabled={loading}>
                Done
              </Button>
            </Form>
          )}
        </ProfileContent>
      </ProfileRight>
      
      <EditButton onClick={toggleEditMode}>
        <FaEdit /> {editMode ? 'Cancel Edit' : 'Edit Profile'}
      </EditButton>
    </ProfileContainer>
  );
};

export default Profile; 