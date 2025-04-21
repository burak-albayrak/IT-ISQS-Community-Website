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
  const [commentsLoading, setCommentsLoading] = useState(false); // Add loading state for comments
  const [commentError, setCommentError] = useState(null); // Add error state for comments
  const [newComment, setNewComment] = useState('');
  const [forumPosts, setForumPosts] = useState([]); // For popular posts sidebar
  const [savedForumPosts, setSavedForumPosts] = useState([]); // For saved posts sidebar

  // New function to fetch comments
  const fetchComments = async (currentPostId) => {
    setCommentsLoading(true);
    setCommentError(null);
    try {
      // Assuming the backend endpoint for getting comments by post ID is like this
      const response = await axios.get(`http://localhost:8080/api/v1/forum-comments/post/${currentPostId}`);
      if (response && response.data) {
        // Format comments based on backend response structure
        const formattedComments = response.data.map(comment => ({
          id: comment.commentID, // Adjust based on actual backend response field name (e.g., commentId)
          content: comment.description,
          createdAt: comment.createdAt,
          timeAgo: getTimeAgo(comment.createdAt),
          userName: comment.creatorName || 'Anonymous', // Adjust based on backend response
          userProfilePic: comment.creatorProfilePic || defaultProfilePic, // Adjust based on backend response
          replies: comment.replies ? comment.replies.map(/* Need to format replies if backend sends them nested */) : [] // Handle replies if needed
        }));
        setComments(formattedComments);
      } else {
        setComments([]);
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
      setCommentError('Failed to load comments.');
    } finally {
      setCommentsLoading(false);
    }
  };

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
            media: postData.mediaList || [], // Assuming media is in mediaList
            likesCount: postData.likesCount || 0,
            commentCount: postData.commentCount || 0, // Use comment count from post if available
            createdBy: postData.createdBy,
            createdByType: postData.createdByType,
            createdAt: postData.createdAt,
            formattedDate: formatDate(postData.createdAt),
            timeAgo: getTimeAgo(postData.createdAt),
            updatedAt: postData.updatedAt,
            tags: postData.category ? [postData.category.name] : [], // Assuming category is an object with name
            userName: postData.creatorName || 'Anonymous', // Adjust if backend provides creator name
            userProfilePic: postData.creatorProfilePic || defaultProfilePic // Adjust if backend provides pic
          });
          
          // Fetch comments separately using the function
          fetchComments(postData.forumPostID || postId);
          
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
    // Check if post data is available
    if (!post) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login', { state: { from: `/forum/post/${postId}`, message: 'Please log in to like posts' } });
        return;
      }

      // Make the API call to toggle the like status
      await axios.post(
        `http://localhost:8080/api/v1/forum-posts/like/${postId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      // Update the post state to reflect the toggled like status
      setPost(prev => {
        if (!prev) return null; // Should not happen if post is checked above, but safe check
        const currentlyLiked = prev.isLiked || false; // Assume not liked if undefined
        const newLikesCount = currentlyLiked ? prev.likesCount - 1 : prev.likesCount + 1;
        return {
          ...prev,
          likesCount: newLikesCount < 0 ? 0 : newLikesCount, // Prevent negative likes
          isLiked: !currentlyLiked // Toggle the liked status
        };
      });

    } catch (err) {
      console.error('Error toggling like on post:', err);
      // Optional: Show an error message to the user
      // setError('Could not update like status. Please try again.');
    }
  };

  const handleSavePost = async () => {
    // Check if post data is available
    if (!post) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login', { state: { from: `/forum/post/${postId}`, message: 'Please log in to save posts' } });
        return;
      }

      // Make the API call to toggle the save status
      // Backend service saveOrUnsavePost returns a message
      const response = await axios.post(
        `http://localhost:8080/api/v1/forum-posts/${postId}/save`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log('Save/Unsave response:', response.data); // Log the message from backend

      // Update the post state to reflect the toggled save status
      setPost(prev => {
        if (!prev) return null;
        const currentlySaved = prev.isSaved || false; // Assume not saved if undefined
        return {
          ...prev,
          isSaved: !currentlySaved // Toggle the saved status
        };
      });

      // Optional: Show a success message to the user based on response.data.message

    } catch (err) {
      console.error('Error toggling save on post:', err);
      // Optional: Show an error message to the user
      // setError('Could not update save status. Please try again.');
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { from: `/forum/post/${postId}`, message: 'Please log in to comment' } });
      return;
    }
    setCommentError(null); // Clear previous errors

    try {
      // Make the API call to the backend comment endpoint
      const response = await axios.post(
        `http://localhost:8080/api/v1/forum-comments`,
        {
          forumPostID: parseInt(postId), // Ensure postId is passed correctly
          description: newComment,
          // parentCommentID: null // Explicitly null for main comments, handle replies later if needed
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Comment submitted successfully:', response.data);

      // Clear the input field
      setNewComment('');

      // Refresh the comments list to show the new comment
      fetchComments(postId);

      // Update post comment count locally for immediate UI feedback
      // Note: The backend might automatically update this, fetching comments might be enough
      setPost(prev => ({
        ...prev,
        commentCount: (prev.commentCount || 0) + 1
      }));

    } catch (err) {
      console.error('Error submitting comment:', err);
      if (err.response?.status === 401 || err.response?.status === 403) {
         setCommentError('Authentication error or insufficient permissions. Please log in again.');
      } else if (err.response) {
        setCommentError(`Error: ${err.response.data?.message || 'Failed to submit comment.'}`);
      }
      else {
         setCommentError('Failed to submit comment. Please check your connection and try again.');
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
                {/* Check if post.media is an array and has items */}
                {Array.isArray(post.media) && post.media.length > 0 && (
                  <MediaContainer>
                    {post.media.map((mediaUrl, index) => (
                      // Render img or video based on file type (simple check)
                      mediaUrl.match(/\.(jpeg|jpg|gif|png)$/) != null
                      ? <DetailedPostMedia key={index} src={mediaUrl} alt={`Post media ${index + 1}`} />
                      : mediaUrl.match(/\.(mp4|webm|ogg)$/) != null
                        ? <DetailedPostVideo key={index} src={mediaUrl} controls />
                        : null // Handle other types or show placeholder if needed
                    ))}
                  </MediaContainer>
                )}
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
                  <FiSend />
                </CommentSubmitButton>
              </CommentForm>
              {commentError && <ErrorMessage style={{marginTop: '10px'}}>{commentError}</ErrorMessage>}

              <CommentsTitle>Comments ({comments.length})</CommentsTitle>
              
              <CommentList>
                {commentsLoading ? (
                  <LoadingContainer><Spinner /></LoadingContainer>
                ) : comments.length > 0 ? (
                  comments.map((comment) => (
                    <CommentItem key={comment.id}>
                      <CommentAvatar src={comment.userProfilePic || defaultProfilePic} alt={comment.userName} />
                      <CommentContent>
                        <CommentAuthor>
                          <CommentAuthorName>{comment.userName}</CommentAuthorName>
                          <CommentTime>{comment.timeAgo}</CommentTime>
                        </CommentAuthor>
                        <CommentText>{comment.content}</CommentText>
                      </CommentContent>
                    </CommentItem>
                  ))
                ) : (
                  !commentError && <EmptyCommentsMessage>No comments yet. Be the first to comment!</EmptyCommentsMessage>
                )}
              </CommentList>
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
  display: block; // Ensure image takes its own line
`;

// Add styled component for video if needed
const DetailedPostVideo = styled.video`
  max-width: 100%;
  border-radius: 8px;
  margin-top: 10px;
  display: block; // Ensure video takes its own line
`;

// Container for multiple media items
const MediaContainer = styled.div`
  display: flex;
  flex-direction: column; // Display media vertically
  gap: 15px; // Add some space between media items
  margin-top: 20px;
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
  align-items: flex-start;
  margin-top: 20px;
  gap: 8px;
`;

const CommentInput = styled.textarea`
  flex-grow: 1;
  padding: 10px 15px;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 40px;
  &:focus {
    outline: none;
    border-color: #1570EF;
    box-shadow: 0 0 0 2px rgba(21, 112, 239, 0.2);
  }
`;

const CommentSubmitButton = styled.button`
  background: none;
  border: none;
  color: #1570EF;
  cursor: pointer;
  padding: 8px;
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  height: 40px;

  &:hover {
    color: #0d5ecb;
  }
`;

const CommentsTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #101828;
  margin: 0 0 20px 0;
`;

const CommentList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const CommentItem = styled.div`
  border: 1px solid #F2F4F7;
  border-radius: 8px;
  padding: 15px;
  background-color: #fff;
  display: flex;
  gap: 12px;
`;

const CommentAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CommentContent = styled.div`
  flex-grow: 1;
`;

const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  gap: 8px;
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

const CommentText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #344054;
  line-height: 1.5;
`;

const EmptyCommentsMessage = styled.div`
  text-align: center;
  padding: 30px 0;
  color: #667085;
  font-size: 14px;
  border: 1px dashed #E4E7EC;
  border-radius: 8px;
`;

const EmptyStateMessage = styled.p`
  color: #667085;
  text-align: center;
  padding: 20px 0;
  font-style: italic;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #E4E7EC;
  border-top: 4px solid #1570EF;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: #d92d20;
  background-color: #fef3f2;
  border: 1px solid #fecdca;
  padding: 10px 15px;
  border-radius: 8px;
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
`;

const BackButton = styled.button`
  background-color: #1570EF;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 15px;

  &:hover {
    background-color: #0d5ecb;
  }
`;

export default SelectedForumPage;