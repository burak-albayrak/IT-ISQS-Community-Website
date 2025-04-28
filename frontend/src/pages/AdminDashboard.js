import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdminAuthenticated, adminLogout } from '../services/adminService';
import styled from 'styled-components';
import axiosInstance from '../services/axiosConfig';
import Popup from '../components/Popup';
import UserEditModal from '../components/UserEditModal';
import BlogEditModal from '../components/BlogEditModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faEdit, 
  faBan, 
  faUnlock, 
  faTrash, 
  faPlus 
} from '@fortawesome/free-solid-svg-icons';

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
  padding: 12px 20px;
  border: none;
  background: ${props => props.active ? '#223A70' : 'transparent'};
  color: ${props => props.active ? 'white' : '#333'};
  font-size: 16px;
  cursor: pointer;
  border-bottom: 3px solid ${props => props.active ? '#223A70' : 'transparent'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  transition: background 0.3s, color 0.3s, border-bottom 0.3s;

  &:hover {
    background: ${props => props.active ? '#223A70' : '#f5f5f5'};
    border-bottom: 3px solid ${props => props.active ? '#223A70' : '#ddd'};
  }
`;

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 45px 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f9f9f9;

  &:focus {
    outline: none;
    border-color: #223A70;
    box-shadow: 0 0 0 2px rgba(34, 58, 112, 0.2);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #777;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e1e5ee;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const Th = styled.th`
  background-color: #f5f7fa;
  color: #333;
  font-weight: 600;
  padding: 15px;
  text-align: left;
  border-bottom: 2px solid #e1e5ee;
`;

const Td = styled.td`
  padding: 15px;
  border-bottom: 1px solid #e1e5ee;
  color: #333;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.color || '#223A70'};
  color: white;
  cursor: pointer;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #777;
  font-style: italic;
`;

// Add new styles for blog management
const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: #223A70;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-left: auto;
  
  &:hover {
    background-color: #192C54;
    transform: translateY(-2px);
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const BlogDate = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('success');
  const [loading, setLoading] = useState(true);
  
  // Kullanıcı düzenleme için state
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Blog düzenleme için state
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showBlogModal, setShowBlogModal] = useState(false);

  useEffect(() => {
    // Check if admin is authenticated
    if (!isAdminAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    
    if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'blogPosts') {
      fetchBlogs();
    }
  }, [navigate, activeTab]);

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/admins/users');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      showMessage('Failed to fetch users', 'error');
      setLoading(false);
    }
  };
  
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/blogs');
      setBlogs(response.data);
      setLoading(false);
    } catch (error) {
      showMessage('Failed to fetch blogs', 'error');
      setLoading(false);
    }
  };

  const handleBlockUser = async (userId, currentlyBlocked) => {
    try {
      await axiosInstance.put(`/admins/users/${userId}/block`, {
        blocked: !currentlyBlocked
      });
      showMessage(`User ${currentlyBlocked ? 'unblocked' : 'blocked'} successfully`, 'success');
      fetchUsers();
    } catch (error) {
      showMessage('Failed to update user status', 'error');
    }
  };

  // Kullanıcı düzenleme
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };
  
  // Kullanıcı güncelleme
  const handleSaveUser = async (userId, userData) => {
    try {
      // Rol güncellemesi için ayrı istek
      if (userData.role !== selectedUser.role) {
        await axiosInstance.put(`/admins/users/${userId}/role`, {
          role: userData.role
        });
      }
      
      // Profil bilgileri güncellemesi
      await axiosInstance.put(`/users/${userId}`, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        institution: userData.institution,
        country: userData.country
      });
      
      showMessage('User updated successfully', 'success');
      setShowEditModal(false);
      fetchUsers();
    } catch (error) {
      showMessage('Failed to update user', 'error');
    }
  };
  
  // Blog oluşturma/düzenleme modalını aç
  const handleCreateBlog = () => {
    setSelectedBlog(null);
    setShowBlogModal(true);
  };
  
  // Blog düzenleme
  const handleEditBlog = (blog) => {
    setSelectedBlog(blog);
    setShowBlogModal(true);
  };
  
  // Blog silme
  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) {
      return;
    }
    
    try {
      await axiosInstance.delete(`/blogs/${blogId}`);
      showMessage('Blog deleted successfully', 'success');
      fetchBlogs();
    } catch (error) {
      showMessage('Failed to delete blog', 'error');
    }
  };
  
  // Blog kaydetme
  const handleSaveBlog = async (blogId, blogData) => {
    try {
      if (blogId) {
        // Blog güncelleme
        await axiosInstance.put(`/blogs/${blogId}`, blogData);
        showMessage('Blog updated successfully', 'success');
      } else {
        // Yeni blog oluşturma
        await axiosInstance.post('/blogs/create', blogData);
        showMessage('Blog created successfully', 'success');
      }
      fetchBlogs();
    } catch (error) {
      showMessage('Failed to save blog', 'error');
      throw error; // Hata modal içinde işlensin diye hatayı yeniden fırlat
    }
  };
  
  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(null), 3000);
  };

  const filteredUsers = users.filter(user => 
    user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredBlogs = blogs.filter(blog => 
    blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.owner?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date to DD.MM.YYYY
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading...</div>;
  }

  return (
    <DashboardContainer>
      <Header>
        <Title>Admin Dashboard</Title>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Header>
      
      <TabContainer>
        <Tab active={activeTab === 'users'} onClick={() => setActiveTab('users')}>
          User Management
        </Tab>
        <Tab active={activeTab === 'blogPosts'} onClick={() => setActiveTab('blogPosts')}>
          Blog Posts
        </Tab>
        <Tab active={activeTab === 'reportedUsers'} onClick={() => setActiveTab('reportedUsers')}>
          Reported Users
        </Tab>
      </TabContainer>
      
      {message && (
        <Popup
          message={message}
          type={messageType}
          onClose={() => setMessage(null)}
        />
      )}
      
      {activeTab === 'users' && (
        <>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search User"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon>
              <FontAwesomeIcon icon={faSearch} />
            </SearchIcon>
          </SearchContainer>

          <Table>
            <thead>
              <tr>
                <Th>Name Surname</Th>
                <Th>E-Mail</Th>
                <Th>Country</Th>
                <Th>Intitution</Th>
                <Th>Role</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user.userID}>
                    <Td>{`${user.firstName || ''} ${user.lastName || ''}`}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.country || '-'}</Td>
                    <Td>{user.institution || '-'}</Td>
                    <Td>{user.role || '-'}</Td>
                    <Td>
                      <ActionButtonsContainer>
                        <ActionButton 
                          color="#3498db"
                          onClick={() => handleEditUser(user)}
                          title="Edit User"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </ActionButton>
                        <ActionButton
                          color={user.isBlocked ? "#27ae60" : "#e74c3c"}
                          onClick={() => handleBlockUser(user.userID, user.isBlocked)}
                          title={user.isBlocked ? "Unblock User" : "Block User"}
                        >
                          <FontAwesomeIcon icon={user.isBlocked ? faUnlock : faBan} />
                        </ActionButton>
                      </ActionButtonsContainer>
                    </Td>
                  </tr>
                ))
              ) : (
                <tr>
                  <Td colSpan="6">
                    <EmptyMessage>No users found</EmptyMessage>
                  </Td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      )}
      
      {activeTab === 'blogPosts' && (
        <>
          <HeaderRow>
            <SearchContainer style={{ flex: 1, marginBottom: 0 }}>
              <SearchInput
                type="text"
                placeholder="Search in Blogs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon>
                <FontAwesomeIcon icon={faSearch} />
              </SearchIcon>
            </SearchContainer>
            <AddButton onClick={handleCreateBlog}>
              <FontAwesomeIcon icon={faPlus} /> Create New Blog
            </AddButton>
          </HeaderRow>

          <Table>
            <thead>
              <tr>
                <Th>Owner</Th>
                <Th>Title</Th>
                <Th>Date</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map(blog => (
                  <tr key={blog.blogID}>
                    <Td>{blog.owner || '-'}</Td>
                    <Td>{blog.title}</Td>
                    <Td>
                      <BlogDate>
                        {formatDate(blog.createdAt)}
                      </BlogDate>
                    </Td>
                    <Td>
                      <ActionButtonsContainer>
                        <ActionButton 
                          color="#3498db"
                          onClick={() => handleEditBlog(blog)}
                          title="Edit Blog"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </ActionButton>
                        <ActionButton
                          color="#e74c3c"
                          onClick={() => handleDeleteBlog(blog.blogID)}
                          title="Delete Blog"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </ActionButton>
                      </ActionButtonsContainer>
                    </Td>
                  </tr>
                ))
              ) : (
                <tr>
                  <Td colSpan="4">
                    <EmptyMessage>No blogs found</EmptyMessage>
                  </Td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      )}
      
      {activeTab === 'reportedUsers' && (
        <div>
          <h2>Reported Users</h2>
          {/* Reported users content will be implemented here */}
        </div>
      )}
      
      {showEditModal && selectedUser && (
        <UserEditModal 
          user={selectedUser}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveUser}
        />
      )}
      
      {showBlogModal && (
        <BlogEditModal
          blog={selectedBlog}
          onClose={() => setShowBlogModal(false)}
          onSave={handleSaveBlog}
        />
      )}
    </DashboardContainer>
  );
};

export default AdminDashboard; 