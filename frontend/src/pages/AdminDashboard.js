import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getCurrentAdmin, 
  isAdminAuthenticated, 
  adminLogout, 
  getAllUsers,
  updateUserBlockStatus,
  updateUserActiveStatus,
  updateUserProfile,
  resetUserPassword,
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog
} from '../services/adminService';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  margin-bottom: 30px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
`;

const AdminInfo = styled.div`
  display: flex;
  align-items: center;
`;

const WelcomeText = styled.h3`
  margin: 0;
  color: #333;
  font-size: 18px;
`;

const LogoutButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: #d32f2f;
  }
`;

const PageTitle = styled.h2`
  color: #333;
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 20px;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #e0e0e0;
  margin-bottom: 20px;
`;

const Tab = styled.button`
  padding: 12px 24px;
  border: none;
  background: transparent;
  color: #333;
  font-size: 16px;
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${props => props.active ? '#4285F4' : 'transparent'};
  }
  
  &:hover {
    background: #f5f5f5;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 350px;
  padding: 12px 12px 12px 40px;
  border: 1px solid #e0e0e0;
  border-radius: 24px;
  font-size: 14px;
  background-color: #f5f5f5;
  
  &:focus {
    outline: none;
    border-color: #4285F4;
    background-color: #fff;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: #333;
  background-color: #f9f9f9;
  border-bottom: 1px solid #e0e0e0;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const TableCell = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  color: #333;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.color || '#4285F4'};
  margin-right: 8px;
  font-size: 18px;
  
  &:hover {
    opacity: 0.8;
  }
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
  padding: 24px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 500;
  margin-bottom: 6px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #4285F4;
  }
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #4285F4;
  }
`;

const Button = styled.button`
  padding: 10px 16px;
  background-color: ${props => props.secondary ? '#f5f5f5' : '#4285F4'};
  color: ${props => props.secondary ? '#333' : 'white'};
  border: ${props => props.secondary ? '1px solid #ddd' : 'none'};
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-left: ${props => props.marginLeft ? '8px' : '0'};
  
  &:hover {
    background-color: ${props => props.secondary ? '#e5e5e5' : '#3367d6'};
  }
  
  &:disabled {
    background-color: #9e9e9e;
    cursor: not-allowed;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
`;

const Message = styled.div`
  padding: 12px;
  margin: 16px 0;
  border-radius: 4px;
  background-color: ${props => props.error ? '#ffebee' : '#e8f5e9'};
  color: ${props => props.error ? '#c62828' : '#2e7d32'};
  border-left: 4px solid ${props => props.error ? '#c62828' : '#2e7d32'};
`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState('userManagement');
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState({ text: '', error: false });
  
  // User Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    institution: '',
    country: '',
    role: ''
  });
  const [newPassword, setNewPassword] = useState('');

  // Blog yönetimi için state'ler
  const [blogs, setBlogs] = useState([]);
  const [blogSearchTerm, setBlogSearchTerm] = useState('');
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    author: '',
    imageUrl: ''
  });

  useEffect(() => {
    // Check if admin is authenticated
    if (!isAdminAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    
    const currentAdmin = getCurrentAdmin();
    setAdmin(currentAdmin);
    
    // Load users
    fetchUsers();
    
    // Load blogs
    fetchBlogs();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Blog verilerini getiren fonksiyon
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getAllBlogs();
      setBlogs(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to load blogs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Blog arama
  const handleBlogSearch = (e) => {
    setBlogSearchTerm(e.target.value);
  };

  // Blog filtreleme
  const filteredBlogs = blogs.filter(blog => {
    const title = blog.title ? blog.title.toLowerCase() : '';
    const author = blog.author ? blog.author.toLowerCase() : '';
    const search = blogSearchTerm.toLowerCase();
    
    return title.includes(search) || author.includes(search);
  });

  // Blog düzenleme modalını açma
  const handleEditBlog = (blog) => {
    setSelectedBlog(blog);
    setBlogForm({
      title: blog.title || '',
      content: blog.content || '',
      author: blog.author || '',
      imageUrl: blog.imageUrl || ''
    });
    setShowBlogModal(true);
  };

  // Yeni blog oluşturma modalını açma
  const handleCreateBlog = () => {
    setSelectedBlog(null);
    setBlogForm({
      title: '',
      content: '',
      author: '',
      imageUrl: ''
    });
    setShowBlogModal(true);
  };

  // Blog form değişikliklerini ele alma
  const handleBlogFormChange = (e) => {
    const { name, value } = e.target;
    setBlogForm(prev => ({ ...prev, [name]: value }));
  };

  // Blog form gönderme
  const handleBlogFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (selectedBlog) {
        // Blog güncelleme
        await updateBlog(selectedBlog.id, blogForm);
        setBlogs(blogs.map(blog => 
          blog.id === selectedBlog.id ? { ...blog, ...blogForm } : blog
        ));
        setMessage({ text: 'Blog updated successfully.', error: false });
      } else {
        // Yeni blog oluşturma
        const newBlog = await createBlog(blogForm);
        setBlogs([...blogs, newBlog]);
        setMessage({ text: 'Blog created successfully.', error: false });
      }
      setShowBlogModal(false);
      setTimeout(() => setMessage({ text: '', error: false }), 3000);
    } catch (err) {
      console.error('Error saving blog:', err);
      setMessage({ 
        text: `Failed to ${selectedBlog ? 'update' : 'create'} blog.`, 
        error: true 
      });
    }
  };

  // Blog silme
  const handleDeleteBlog = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await deleteBlog(blogId);
        setBlogs(blogs.filter(blog => blog.id !== blogId));
        setMessage({ text: 'Blog deleted successfully.', error: false });
        setTimeout(() => setMessage({ text: '', error: false }), 3000);
      } catch (err) {
        console.error('Error deleting blog:', err);
        setMessage({ text: 'Failed to delete blog.', error: true });
      }
    }
  };

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const email = user.email.toLowerCase();
    const institution = (user.institution || '').toLowerCase();
    const country = (user.country || '').toLowerCase();
    const search = searchTerm.toLowerCase();
    
    return fullName.includes(search) || 
           email.includes(search) || 
           institution.includes(search) || 
           country.includes(search);
  });

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      institution: user.institution || '',
      country: user.country || '',
      role: user.role || ''
    });
    setShowEditModal(true);
  };

  const handleResetPassword = (user) => {
    setSelectedUser(user);
    setNewPassword('');
    setShowPasswordModal(true);
  };

  const handleBlockUser = async (userId, isBlocked) => {
    try {
      await updateUserBlockStatus(userId, !isBlocked);
      setUsers(users.map(user => 
        user.userID === userId ? { ...user, isBlocked: !isBlocked } : user
      ));
      setMessage({ 
        text: `User has been ${!isBlocked ? 'blocked' : 'unblocked'} successfully.`, 
        error: false 
      });
      setTimeout(() => setMessage({ text: '', error: false }), 3000);
    } catch (err) {
      console.error('Error updating user block status:', err);
      setMessage({ 
        text: `Failed to ${isBlocked ? 'unblock' : 'block'} user.`, 
        error: true 
      });
    }
  };

  const handleActivateUser = async (userId, isActive) => {
    try {
      await updateUserActiveStatus(userId, !isActive);
      setUsers(users.map(user => 
        user.userID === userId ? { ...user, isActive: !isActive } : user
      ));
      setMessage({ 
        text: `User has been ${!isActive ? 'activated' : 'deactivated'} successfully.`, 
        error: false 
      });
      setTimeout(() => setMessage({ text: '', error: false }), 3000);
    } catch (err) {
      console.error('Error updating user active status:', err);
      setMessage({ 
        text: `Failed to ${isActive ? 'deactivate' : 'activate'} user.`, 
        error: true 
      });
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await updateUserProfile(selectedUser.userID, editForm);
      
      // Update local state
      setUsers(users.map(user => 
        user.userID === selectedUser.userID ? { ...user, ...editForm } : user
      ));
      
      setShowEditModal(false);
      setMessage({ text: 'User updated successfully.', error: false });
      setTimeout(() => setMessage({ text: '', error: false }), 3000);
    } catch (err) {
      console.error('Error updating user:', err);
      setMessage({ text: 'Failed to update user.', error: true });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (!newPassword || newPassword.length < 8) {
      setMessage({ text: 'Password must be at least 8 characters long.', error: true });
      return;
    }
    
    try {
      await resetUserPassword(selectedUser.userID, newPassword);
      setShowPasswordModal(false);
      setMessage({ text: 'Password reset successfully.', error: false });
      setTimeout(() => setMessage({ text: '', error: false }), 3000);
    } catch (err) {
      console.error('Error resetting password:', err);
      setMessage({ text: 'Failed to reset password.', error: true });
    }
  };

  if (loading && !users.length) {
    return <div>Loading admin dashboard...</div>;
  }

  return (
    <DashboardContainer>
      <Header>
        <AdminInfo>
          <WelcomeText>
            Welcome, {admin?.firstName || 'Admin'} | Admin Dashboard
          </WelcomeText>
        </AdminInfo>
        <LogoutButton onClick={handleLogout}>
          Logout
        </LogoutButton>
      </Header>
      
      <TabContainer>
        <Tab 
          active={activeTab === 'userManagement'} 
          onClick={() => setActiveTab('userManagement')}
        >
          User Management
        </Tab>
        <Tab 
          active={activeTab === 'blogPosts'} 
          onClick={() => setActiveTab('blogPosts')}
        >
          Blog Posts
        </Tab>
        <Tab 
          active={activeTab === 'reportedUsers'} 
          onClick={() => setActiveTab('reportedUsers')}
        >
          Reported Users
        </Tab>
      </TabContainer>
      
      {message.text && (
        <Message error={message.error}>
          {message.text}
        </Message>
      )}
      
      {activeTab === 'userManagement' && (
        <div>
          <SearchContainer>
            <SearchIcon>🔍</SearchIcon>
            <SearchInput 
              type="text" 
              placeholder="Search User" 
              value={searchTerm}
              onChange={handleSearch}
            />
          </SearchContainer>
          
          <Table>
            <thead>
              <tr>
                <TableHeader>Name Surname</TableHeader>
                <TableHeader>E-Mail</TableHeader>
                <TableHeader>Country</TableHeader>
                <TableHeader>Institution</TableHeader>
                <TableHeader>Role</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <TableRow key={user.userID}>
                  <TableCell>{user.firstName} {user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.country || 'Not specified'}</TableCell>
                  <TableCell>{user.institution || 'Not specified'}</TableCell>
                  <TableCell>{user.role || 'Student'}</TableCell>
                  <TableCell>
                    <ActionButton 
                      title="Edit User" 
                      onClick={() => handleEditUser(user)}
                    >
                      ✏️
                    </ActionButton>
                    <ActionButton 
                      title={user.isBlocked ? "Unblock User" : "Block User"}
                      color={user.isBlocked ? "#4285F4" : "#f44336"}
                      onClick={() => handleBlockUser(user.userID, user.isBlocked)}
                    >
                      {user.isBlocked ? "🔓" : "🔒"}
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                    No users found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </tbody>
          </Table>
        </div>
      )}
      
      {activeTab === 'blogPosts' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <SearchContainer>
              <SearchIcon>🔍</SearchIcon>
              <SearchInput 
                type="text" 
                placeholder="Search in Blogs" 
                value={blogSearchTerm}
                onChange={handleBlogSearch}
              />
            </SearchContainer>

            <Button onClick={handleCreateBlog}>
              Create New Blog <span style={{ marginLeft: '5px', fontSize: '18px' }}>+</span>
            </Button>
          </div>
          
          <Table>
            <thead>
              <tr>
                <TableHeader>Owner</TableHeader>
                <TableHeader>Title</TableHeader>
                <TableHeader>Date</TableHeader>
                <TableHeader>Actions</TableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.map(blog => (
                <TableRow key={blog.id}>
                  <TableCell>{blog.author || 'Anonymous'}</TableCell>
                  <TableCell>{blog.title || 'Untitled'}</TableCell>
                  <TableCell>
                    {blog.createdAt 
                      ? new Date(blog.createdAt).toLocaleDateString() 
                      : new Date().toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <ActionButton 
                      title="Edit Blog" 
                      onClick={() => handleEditBlog(blog)}
                    >
                      ✏️
                    </ActionButton>
                    <ActionButton 
                      title="Delete Blog"
                      color="#f44336"
                      onClick={() => handleDeleteBlog(blog.id)}
                    >
                      🗑️
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))}
              {filteredBlogs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: 'center' }}>
                    No blogs found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </tbody>
          </Table>
        </div>
      )}
      
      {activeTab === 'reportedUsers' && (
        <div>
          <PageTitle>Reported Users</PageTitle>
          <p>Reported users functionality will be implemented here.</p>
        </div>
      )}
      
      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Edit User</ModalTitle>
              <CloseButton onClick={() => setShowEditModal(false)}>×</CloseButton>
            </ModalHeader>
            
            <Form onSubmit={handleEditFormSubmit}>
              <FormGroup>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={editForm.firstName}
                  onChange={handleEditFormChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={editForm.lastName}
                  onChange={handleEditFormChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={editForm.email}
                  onChange={handleEditFormChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="institution">Institution</Label>
                <Input
                  id="institution"
                  name="institution"
                  value={editForm.institution}
                  onChange={handleEditFormChange}
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={editForm.country}
                  onChange={handleEditFormChange}
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="role">Role</Label>
                <Select
                  id="role"
                  name="role"
                  value={editForm.role}
                  onChange={handleEditFormChange}
                >
                  <option value="STUDENT">Student</option>
                  <option value="PROFESSOR">Professor</option>
                  <option value="OTHER">Other</option>
                </Select>
              </FormGroup>
              
              <ButtonContainer>
                <Button secondary type="button" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Save Changes
                </Button>
                <Button 
                  type="button" 
                  onClick={() => {
                    setShowEditModal(false);
                    handleResetPassword(selectedUser);
                  }}
                >
                  Reset Password
                </Button>
              </ButtonContainer>
            </Form>
          </ModalContent>
        </Modal>
      )}
      
      {/* Reset Password Modal */}
      {showPasswordModal && selectedUser && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Reset Password for {selectedUser.firstName} {selectedUser.lastName}</ModalTitle>
              <CloseButton onClick={() => setShowPasswordModal(false)}>×</CloseButton>
            </ModalHeader>
            
            <Form onSubmit={handlePasswordSubmit}>
              <FormGroup>
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </FormGroup>
              
              <ButtonContainer>
                <Button secondary type="button" onClick={() => setShowPasswordModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Reset Password
                </Button>
              </ButtonContainer>
            </Form>
          </ModalContent>
        </Modal>
      )}
      
      {/* Blog Edit/Create Modal */}
      {showBlogModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{selectedBlog ? 'Edit Blog' : 'Create New Blog'}</ModalTitle>
              <CloseButton onClick={() => setShowBlogModal(false)}>×</CloseButton>
            </ModalHeader>
            
            <Form onSubmit={handleBlogFormSubmit}>
              <FormGroup>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={blogForm.title}
                  onChange={handleBlogFormChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  name="author"
                  value={blogForm.author}
                  onChange={handleBlogFormChange}
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  value={blogForm.imageUrl}
                  onChange={handleBlogFormChange}
                  placeholder="https://example.com/image.jpg"
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="content">Content</Label>
                <textarea
                  id="content"
                  name="content"
                  value={blogForm.content}
                  onChange={handleBlogFormChange}
                  required
                  style={{
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px',
                    minHeight: '200px',
                    width: '100%',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </FormGroup>
              
              <ButtonContainer>
                <Button secondary type="button" onClick={() => setShowBlogModal(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {selectedBlog ? 'Update Blog' : 'Create Blog'}
                </Button>
              </ButtonContainer>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </DashboardContainer>
  );
};

export default AdminDashboard; 