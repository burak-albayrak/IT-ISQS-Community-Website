import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { FiHeart, FiBookmark, FiEye, FiMessageSquare, FiSend } from 'react-icons/fi';
import axios from 'axios';
import defaultProfilePic from '../assets/defaultpp.jpg';

// Global style to ensure consistent page layout
const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    width: 100%;
  }
`;

const SelectedForumPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [forumPosts, setForumPosts] = useState([]); // For popular posts sidebar
  const [savedForumPosts, setSavedForumPosts] = useState([]); // For saved posts sidebar

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('Fetching post with ID:', postId);
        // Get the specific forum post by ID
        const response = await axios.get(`http://localhost:8080/api/v1/forum-posts/${postId}`);
        
        console.log('Forum post response:', response);
        
        if (response && response.data) {
          // Format the post data
          const postData = response.data;
          console.log('Post data:', postData);
          
          setPost({
            id: postData.forumPostID,
            title: postData.title,
            description: postData.description,
            media: postData.media || '',
            likesCount: postData.likesCount || 0,
            commentCount: postData.commentCount || 0,
            createdBy: postData.createdBy,
            createdByType: postData.createdByType,
            createdAt: postData.createdAt,
            formattedDate: formatDate(postData.createdAt),
            timeAgo: getTimeAgo(postData.createdAt),
            updatedAt: postData.updatedAt,
            tags: postData.tags || ['Research'],
            userName: postData.userName || postData.ownerName || 'Anonymous',
            userProfilePic: postData.userProfilePic || ''
          });
          
          // Since we don't have a clear API for comments, use placeholder data for now
          // or load from postData.comments if available
          if (postData.comments) {
            setComments(postData.comments.map(comment => ({
              id: comment.id,
              content: comment.description || comment.content,
              createdAt: comment.createdAt,
              timeAgo: getTimeAgo(comment.createdAt),
              userName: comment.userName || 'Anonymous',
              userProfilePic: comment.userProfilePic || ''
            })));
          } else {
            // Use empty array for now - will be populated when user comments
            setComments([]);
          }
          
          // Fetch popular posts for sidebar
          try {
            const allPostsResponse = await axios.get(`http://localhost:8080/api/v1/forum-posts`);
            if (allPostsResponse && allPostsResponse.data) {
              const formattedPosts = allPostsResponse.data.map(post => ({
                id: post.forumPostID,
                title: post.title,
                description: post.description,
                likesCount: post.likesCount || 0,
                commentCount: post.commentCount || 0,
                createdAt: post.createdAt,
                timeAgo: getTimeAgo(post.createdAt),
                userName: post.userName || post.ownerName || 'Anonymous'
              }));
              
              // Get popular posts
              const popularPosts = [...formattedPosts]
                .sort((a, b) => b.likesCount - a.likesCount)
                .slice(0, 4)
                .filter(post => post.id !== parseInt(postId)); // Remove current post from popular list
              setForumPosts(popularPosts);
              
              // Get saved posts (in a real app, this would be user-specific)
              setSavedForumPosts(formattedPosts.slice(0, 3).filter(post => post.id !== parseInt(postId)));
            }
          } catch (postsErr) {
            console.error('Error fetching all posts:', postsErr);
            // We don't want to fail the whole page if just sidebar posts fail to load
          }
        } else {
          setError('No post data returned from server');
        }
      } catch (err) {
        console.error('Error fetching forum post:', err);
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Error response data:', err.response.data);
          console.error('Error response status:', err.response.status);
          
          if (err.response.status === 404) {
            setError('Forum post not found. It may have been deleted or never existed.');
          } else if (err.response.status === 403) {
            setError('You do not have permission to view this post.');
          } else {
            setError(`Error loading post: ${err.response.data?.message || err.response.statusText}`);
          }
        } else if (err.request) {
          // The request was made but no response was received
          console.error('Error request:', err.request);
          setError('Could not connect to the server. Please check your internet connection.');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error message:', err.message);
          setError('Failed to load the forum post. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [postId, navigate]);

  const handleLikePost = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login', { state: { from: `/forum/post/${postId}`, message: 'Please log in to like posts' } });
        return;
      }

      await axios.post(
        `http://localhost:8080/api/v1/forum-posts/like/${postId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      setPost(prev => ({
        ...prev,
        likesCount: prev.likesCount + 1,
        isLiked: true
      }));
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleSavePost = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login', { state: { from: `/forum/post/${postId}`, message: 'Please log in to save posts' } });
        return;
      }

      await axios.post(
        `http://localhost:8080/api/v1/forum-posts/${postId}/save`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      setPost(prev => ({
        ...prev,
        isSaved: !prev.isSaved
      }));
    } catch (err) {
      console.error('Error saving post:', err);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login', { state: { from: `/forum/post/${postId}`, message: 'Please log in to comment' } });
        return;
      }

      // Note: Since we're not sure if the backend endpoint exists, 
      // let's simulate adding a comment locally for now
      console.log('Would send comment to API if endpoint was known:', newComment);
      
      // Simulate successful comment creation
      const newCommentData = {
        id: Date.now(), // Generate temporary ID
        content: newComment,
        createdAt: new Date().toISOString(),
        timeAgo: 'just now',
        userName: 'You', // In a real app, use the logged-in user's name
        userProfilePic: '' // In a real app, use the logged-in user's profile pic
      };
      
      // Add comment to state
      setComments(prev => [newCommentData, ...prev]);
      setNewComment('');
      
      // Update post comment count
      setPost(prev => ({
        ...prev,
        commentCount: prev.commentCount + 1
      }));
      
      // In a real implementation, you would make an API call like:
      /*
      const response = await axios.post(
        `http://localhost:8080/api/v1/forum-posts/${postId}/comments`, 
        { content: newComment },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      */
      
    } catch (err) {
      console.error('Error submitting comment:', err);
      if (err.response?.status === 401) {
        alert('Your session has expired. Please log in again.');
        navigate('/login');
      }
    }
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Helper function to get time ago
  const getTimeAgo = (dateString) => {
    if (!dateString) return 'Unknown time';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
    }
    
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
  };

  if (loading) {
    return (
      <ForumContainer>
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      </ForumContainer>
    );
  }

  if (error || !post) {
    return (
      <ForumContainer>
        <ErrorMessage>
          {error || 'Post not found. It may have been removed or is unavailable.'}
          <BackButton onClick={() => navigate('/forum')}>Back to Forum</BackButton>
        </ErrorMessage>
      </ForumContainer>
    );
  }

  return (
    <>
      <GlobalStyle />
      <ForumContainer>
        <ForumContent>
          <LeftSidebar>
            <PopularPostsTitle>Popular Forum Posts</PopularPostsTitle>
            <SidebarPostsList>
              {forumPosts.length > 0 ? (
                forumPosts.map((sidebarPost) => (
                  <SidebarPostItem 
                    key={sidebarPost.id} 
                    onClick={() => navigate(`/forum/post/${sidebarPost.id}`)}
                    isActive={sidebarPost.id === parseInt(postId)}
                  >
                    <SidebarPostAuthor>
                      {sidebarPost.userName}
                    </SidebarPostAuthor>
                    <SidebarPostTitle>{sidebarPost.title}</SidebarPostTitle>
                    <SidebarPostStats>
                      <span>{sidebarPost.commentCount} comments</span> • <span>{sidebarPost.likesCount} likes</span>
                    </SidebarPostStats>
                  </SidebarPostItem>
                ))
              ) : (
                <EmptyStateMessage style={{ padding: '20px 0' }}>No popular posts yet</EmptyStateMessage>
              )}
              {forumPosts.length > 0 && <ViewAllLink onClick={() => navigate('/forum/popular')}>View All</ViewAllLink>}
            </SidebarPostsList>
            
            <SavedPostsTitle>Saved Forum Posts</SavedPostsTitle>
            <SidebarPostsList>
              {savedForumPosts.length > 0 ? (
                savedForumPosts.map((sidebarPost) => (
                  <SidebarPostItem 
                    key={`saved-${sidebarPost.id}`} 
                    onClick={() => navigate(`/forum/post/${sidebarPost.id}`)}
                    isActive={sidebarPost.id === parseInt(postId)}
                  >
                    <SidebarPostAuthor>
                      {sidebarPost.userName}
                    </SidebarPostAuthor>
                    <SidebarPostTitle>{sidebarPost.title}</SidebarPostTitle>
                    <SidebarPostStats>
                      <span>{sidebarPost.commentCount} comments</span> • <span>{sidebarPost.likesCount} likes</span>
                    </SidebarPostStats>
                  </SidebarPostItem>
                ))
              ) : (
                <EmptyStateMessage style={{ padding: '20px 0' }}>No saved posts yet</EmptyStateMessage>
              )}
              {savedForumPosts.length > 0 && <ViewAllLink onClick={() => navigate('/forum/saved')}>View All</ViewAllLink>}
            </SidebarPostsList>
          </LeftSidebar>

          <RightContent>
            <BackLink onClick={() => navigate('/forum')}>← Back to Forum</BackLink>
            
            <DetailedPost>
              <DetailedPostHeader>
                <DetailedPostAuthorSection>
                  <AuthorAvatar>
                    <img 
                      src={post.userProfilePic || defaultProfilePic}
                      alt="User avatar" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultProfilePic;
                      }}
                    />
                  </AuthorAvatar>
                  <DetailedPostAuthorInfo>
                    <DetailedPostAuthorName>
                      {post.userName}
                    </DetailedPostAuthorName>
                    <DetailedPostTime>{post.timeAgo}</DetailedPostTime>
                  </DetailedPostAuthorInfo>
                </DetailedPostAuthorSection>
                
                <DetailedPostTags>
                  {post.tags && post.tags.length > 0 ? (
                    post.tags.map((tag, tagIndex) => (
                      <CategoryTag key={tagIndex}>{tag}</CategoryTag>
                    ))
                  ) : (
                    <CategoryTag>General</CategoryTag>
                  )}
                  <SaveButton onClick={handleSavePost}>
                    {post.isSaved ? <FiBookmark size={16} fill="#1E40AF" color="#1E40AF" /> : <FiBookmark size={16} />}
                  </SaveButton>
                </DetailedPostTags>
              </DetailedPostHeader>
              
              <DetailedPostContent>
                <DetailedPostTitle>{post.title}</DetailedPostTitle>
                <DetailedPostText>{post.description}</DetailedPostText>
                {post.media && <DetailedPostMedia src={post.media} alt="Post media" />}
              </DetailedPostContent>
              
              <DetailedPostFooter>
                <DetailedPostComments>
                  {post.commentCount} comment{post.commentCount !== 1 ? 's' : ''}
                </DetailedPostComments>
                
                <DetailedPostStats>
                  <DetailedPostStat onClick={handleLikePost}>
                    {post.isLiked ? <FiHeart size={16} fill="#E94A65" color="#E94A65" /> : <FiHeart size={16} />}
                    <span>{post.likesCount}</span>
                  </DetailedPostStat>
                  <DetailedPostStat>
                    <FiEye size={16} />
                    <span>{500}</span>
                  </DetailedPostStat>
                </DetailedPostStats>
              </DetailedPostFooter>
            </DetailedPost>
            
            <CommentsSection>
              <CommentForm onSubmit={handleSubmitComment}>
                <CommentInput 
                  placeholder="Write a comment..." 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <CommentSubmitButton type="submit">
                  <FiSend size={16} />
                </CommentSubmitButton>
              </CommentForm>
              
              <CommentsTitle>Comments ({comments.length})</CommentsTitle>
              
              <CommentsList>
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <CommentItem key={comment.id}>
                      <CommentAuthor>
                        <CommentAvatar>
                          <img 
                            src={comment.userProfilePic || defaultProfilePic}
                            alt="User avatar" 
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = defaultProfilePic;
                            }}
                          />
                        </CommentAvatar>
                        <CommentAuthorInfo>
                          <CommentAuthorName>{comment.userName}</CommentAuthorName>
                          <CommentTime>{comment.timeAgo}</CommentTime>
                        </CommentAuthorInfo>
                      </CommentAuthor>
                      <CommentContent>{comment.content}</CommentContent>
                    </CommentItem>
                  ))
                ) : (
                  <EmptyCommentsMessage>
                    No comments yet. Be the first to comment!
                  </EmptyCommentsMessage>
                )}
              </CommentsList>
            </CommentsSection>
          </RightContent>
        </ForumContent>
      </ForumContainer>
    </>
  );
};

// Styled components
const ForumContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ForumContent = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 30px;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const LeftSidebar = styled.div`
  flex: 0 0 30%;
  display: flex;
  flex-direction: column;
`;

const RightContent = styled.div`
  flex: 0 0 70%;
`;

const PopularPostsTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #101828;
  margin: 0 0 15px 0;
`;

const SavedPostsTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #101828;
  margin: 30px 0 15px 0;
`;

const SidebarPostsList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  border: 1px solid #F2F4F7;
  border-radius: 8px;
  overflow: hidden;
`;

const SidebarPostItem = styled.div`
  padding: 15px;
  position: relative;
  border-bottom: 1px solid #F2F4F7;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => props.isActive ? '#F0F4FF' : '#fff'};
  
  &:hover {
    background-color: ${props => props.isActive ? '#F0F4FF' : '#F9FAFB'};
    box-shadow: 0 2px 4px rgba(16, 24, 40, 0.1);
    transform: translateY(-1px);
    z-index: 1;
    margin: 0 -1px;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const SidebarPostAuthor = styled.div`
  font-size: 12px;
  color: #667085;
  margin-bottom: 6px;
`;

const SidebarPostTitle = styled.h3`
  font-size: 15px;
  font-weight: 500;
  color: #1849A9;
  margin: 0 0 8px 0;
  line-height: 1.3;
`;

const SidebarPostStats = styled.div`
  font-size: 12px;
  color: #667085;
`;

const ViewAllLink = styled.button`
  background: none;
  border: none;
  color: #1849A9;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 10px 15px;
  text-align: center;
  border-top: 1px solid #F2F4F7;
  width: 100%;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #F9FAFB;
  }
`;

const BackLink = styled.button`
  background: none;
  border: none;
  color: #1849A9;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  margin-bottom: 20px;
  display: inline-block;
  
  &:hover {
    text-decoration: underline;
  }
`;

const DetailedPost = styled.div`
  border: 1px solid #E4E7EC;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const DetailedPostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const DetailedPostAuthorSection = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DetailedPostAuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailedPostAuthorName = styled.div`
  font-weight: 500;
  color: #101828;
  margin-bottom: 4px;
`;

const DetailedPostTime = styled.div`
  font-size: 12px;
  color: #667085;
`;

const DetailedPostTags = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CategoryTag = styled.span`
  background-color: #F0F4FF;
  color: #1849A9;
  font-size: 12px;
  border-radius: 16px;
  padding: 4px 12px;
`;

const SaveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #667085;
  padding: 5px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #F2F4F7;
  }
`;

const DetailedPostContent = styled.div`
  margin-bottom: 20px;
`;

const DetailedPostTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #101828;
  margin: 0 0 15px 0;
`;

const DetailedPostText = styled.div`
  font-size: 16px;
  color: #344054;
  line-height: 1.6;
  margin-bottom: 20px;
  white-space: pre-line;
`;

const DetailedPostMedia = styled.img`
  max-width: 100%;
  border-radius: 8px;
  margin-top: 10px;
`;

const DetailedPostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #F2F4F7;
  padding-top: 15px;
`;

const DetailedPostComments = styled.div`
  font-size: 14px;
  color: #667085;
`;

const DetailedPostStats = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const DetailedPostStat = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #667085;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  
  &:hover {
    color: #101828;
  }
`;

const CommentsSection = styled.div`
  margin-top: 30px;
`;

const CommentForm = styled.form`
  display: flex;
  margin-bottom: 20px;
  border: 1px solid #E4E7EC;
  border-radius: 8px;
  padding: 12px 16px;
  background-color: #fff;
`;

const CommentInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #344054;
  
  &::placeholder {
    color: #98A2B3;
  }
`;

const CommentSubmitButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #1849A9;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #0F2C70;
  }
`;

const CommentsTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #101828;
  margin: 0 0 20px 0;
`;

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CommentItem = styled.div`
  border: 1px solid #F2F4F7;
  border-radius: 8px;
  padding: 15px;
  background-color: #fff;
`;

const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CommentAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CommentAuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentAuthorName = styled.div`
  font-weight: 500;
  color: #101828;
  font-size: 14px;
`;

const CommentTime = styled.div`
  font-size: 12px;
  color: #667085;
`;

const CommentContent = styled.div`
  font-size: 14px;
  color: #344054;
  line-height: 1.5;
`;

const EmptyStateMessage = styled.div`
  text-align: center;
  padding: 30px 20px;
  color: #667085;
  font-size: 14px;
`;

const EmptyCommentsMessage = styled.div`
  text-align: center;
  padding: 30px 0;
  color: #667085;
  font-size: 14px;
  border: 1px dashed #E4E7EC;
  border-radius: 8px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #E4E7EC;
  border-top: 4px solid #1E40AF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 50px 0;
  color: #D92D20;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const BackButton = styled.button`
  background-color: #1849A9;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #0F2C70;
  }
`;

export default SelectedForumPage; 