import React, { useState, useEffect, useCallback } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { FiHeart, FiBookmark, FiEye, FiMessageSquare, FiSend, FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import defaultProfilePic from '../assets/defaultpp.jpg';
import TextareaAutosize from 'react-textarea-autosize';

// Global style to ensure consistent page layout
const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    width: 100%;
  }
`;

// CommentItem bileşenini güncelleyelim
const CommentItem = ({ 
  comment, 
  replyingTo, 
  replyTexts, 
  handleReplyTextChange, 
  setReplyingTo, 
  handleSubmitReply, 
  defaultProfilePic,
  isReply = false
}) => (
  <CommentItemContainer $isReply={isReply}>
    <CommentMainContent>
      <CommentAvatar $isReply={isReply}>
        <img 
          src={comment.userProfilePic || defaultProfilePic} 
          alt={comment.userName} 
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = defaultProfilePic;
          }}
        />
      </CommentAvatar>
      <CommentContent>
        <CommentAuthor>
          <CommentAuthorName>{comment.userName}</CommentAuthorName>
          <CommentTime>{comment.timeAgo}</CommentTime>
        </CommentAuthor>
        <CommentText>{comment.content}</CommentText>
        <CommentActionsContainer>
          {!isReply && (
            <CommentReplyButton 
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              className={replyingTo === comment.id ? 'active' : ''}
            >
              <FiMessageSquare size={14} />
              <span>Reply</span>
            </CommentReplyButton>
          )}
        </CommentActionsContainer>
      </CommentContent>
    </CommentMainContent>

    {/* Yanıt formu */}
    {!isReply && replyingTo === comment.id && (
      <ReplyFormContainer>
        <CommentForm onSubmit={(e) => {
          e.preventDefault();
          handleSubmitReply(comment.id);
        }}>
          <CommentInput 
            placeholder="Write a reply..." 
            value={replyTexts[comment.id] || ''}
            onChange={(e) => handleReplyTextChange(comment.id, e.target.value)}
            minRows={1}
            maxRows={20}
            autoFocus
          />
          <CommentSubmitButton type="submit" disabled={!replyTexts[comment.id]?.trim()}>
            <FiSend />
          </CommentSubmitButton>
        </CommentForm>
      </ReplyFormContainer>
    )}

    {/* Yanıtları göster */}
    {comment.replies && comment.replies.length > 0 && (
      <RepliesContainer>
        {comment.replies.map((reply) => (
          <CommentItem 
            key={reply.id} 
            comment={reply} 
            replyingTo={replyingTo}
            replyTexts={replyTexts}
            handleReplyTextChange={handleReplyTextChange}
            setReplyingTo={setReplyingTo}
            handleSubmitReply={handleSubmitReply}
            defaultProfilePic={defaultProfilePic}
            isReply={true} // Reply olduğunu belirt
          />
        ))}
      </RepliesContainer>
    )}
  </CommentItemContainer>
);

const SelectedForumPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentError, setCommentError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [forumPosts, setForumPosts] = useState([]);
  const [categoryColorMap, setCategoryColorMap] = useState({});
  const [zoomedImageUrl, setZoomedImageUrl] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyTexts, setReplyTexts] = useState({});
  const [showLoginWarning, setShowLoginWarning] = useState(false);

  // New function to fetch comments
  const fetchComments = useCallback(async (postId) => {
    setCommentsLoading(true);
    setCommentError(null);
    try {
      console.log('Fetching comments for post:', currentPostId);
      const token = localStorage.getItem('token');
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      };
      
      // Add authorization header if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      // Doğru endpoint'i kullan
      const response = await axios.get(`http://localhost:8080/api/v1/forum-comments/post/${currentPostId}/all`, {
        headers: headers
      });
      
      console.log('Raw response:', response);
      if (response && response.data) {
        console.log('Comments data:', response.data);
        const formattedComments = response.data.map(comment => ({
          id: comment.commentId,
          content: comment.description,
          createdAt: comment.createdAt,
          timeAgo: getTimeAgo(comment.createdAt),
          userName: comment.creatorName || 'Anonymous',
          userProfilePic: comment.creatorPicture || defaultProfilePic,
          likes: comment.likes || 0,
          isLiked: comment.isLiked || false,
          replies: (comment.replies || []).map(reply => ({
            id: reply.commentId,
            content: reply.description,
            createdAt: reply.createdAt,
            timeAgo: getTimeAgo(reply.createdAt),
            userName: reply.creatorName || 'Anonymous',
            userProfilePic: reply.creatorPicture || defaultProfilePic,
            likes: reply.likes || 0,
            isLiked: reply.isLiked || false
          }))
        }));
        console.log('Formatted comments:', formattedComments);
        setComments(formattedComments);
      } else {
        console.log('No comments data in response');
        setComments([]);
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
      console.error('Error details:', {
        message: err.message,
        response: err.response,
        request: err.request
      });
      if (err.response?.status === 401 || err.response?.status === 403) {
        setCommentError('Please log in to view comments.');
      } else {
        setCommentError('Failed to load comments.');
      }
    } finally {
      setCommentsLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/forum-categories');
        if (response && response.data) {
          const colorMap = response.data.reduce((acc, category) => {
            if (category.name && category.color) {
              acc[category.name] = category.color;
            }
            return acc;
          }, {});
          setCategoryColorMap(colorMap);
        } else {
          setCategoryColorMap({});
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategoryColorMap({});
      }
    };

    const fetchPostData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log('Fetching post with ID:', postId);
        const response = await axios.get(`https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/forum-posts/${postId}`);
        console.log('Forum post response:', response);
        
        if (response && response.data) {
          const postData = response.data;
          console.log('Raw post data received from backend:', postData);
          
          setPost({
            id: postData.forumPostID,
            title: postData.title,
            description: postData.description,
            media: postData.mediaList || [],
            commentCount: postData.commentCount || 0,
            createdBy: postData.createdBy,
            createdByType: postData.createdByType,
            createdAt: postData.createdAt,
            formattedDate: formatDate(postData.createdAt),
            timeAgo: getTimeAgo(postData.createdAt),
            updatedAt: postData.updatedAt,
            tags: postData.category ? [postData.category.name] : [],
            userName: postData.creatorName || 'Anonymous',
            userProfilePic: postData.creatorProfilePic || defaultProfilePic
          });
          
          // Fetch comments separately using the function
          fetchComments(postData.forumPostID || postId);
          
          // Fetch popular posts for sidebar
          try {
            const allPostsResponse = await axios.get(`https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/forum-posts`);
            if (allPostsResponse && allPostsResponse.data) {
              const formattedPosts = allPostsResponse.data.map(post => ({
                id: post.forumPostID,
                title: post.title,
                description: post.description,
                commentCount: post.commentCount || 0,
                createdAt: post.createdAt,
                timeAgo: getTimeAgo(post.createdAt),
                userName: post.creatorName || 'Anonymous'
              }));
              
              // Get popular posts - Sort by comment count (highest to lowest)
              const popularPosts = [...formattedPosts]
                .sort((a, b) => b.commentCount - a.commentCount)
                .slice(0, 10) // Show up to 10 most commented posts
                .filter(post => post.id !== parseInt(postId)); // Remove current post from popular list
              
              setForumPosts(popularPosts);
            }
          } catch (postsErr) {
            console.error('Error fetching all posts:', postsErr);
          }
        } else {
          setError('No post data returned from server');
        }
      } catch (err) {
        console.error('Error fetching forum post:', err);
        if (err.response) {
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
          console.error('Error request:', err.request);
          setError('Could not connect to the server. Please check your internet connection.');
        } else {
          console.error('Error message:', err.message);
          setError('Failed to load the forum post. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
    fetchPostData();
  }, [postId, navigate]);
  
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setShowLoginWarning(true);
      return;
    }
    setCommentError(null);

    try {
      // Make the API call to the backend comment endpoint
      const response = await axios.post(
        `https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/forum-comments`,
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

  // Yanıt metnini güncelleyen fonksiyon
  const handleReplyTextChange = (commentId, text) => {
    setReplyTexts(prev => ({
      ...prev,
      [commentId]: text
    }));
  };

  // Yanıt gönderme fonksiyonu
  const handleSubmitReply = async (commentId) => {
    const replyText = replyTexts[commentId];
    if (!replyText?.trim()) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setShowLoginWarning(true);
      return;
    }
    setCommentError(null);

    try {
      await axios.post(
        `http://localhost:8080/api/v1/forum-comments`,
        {
          forumPostID: parseInt(postId),
          description: replyText,
          parentCommentID: commentId
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Yanıt alanını temizle ve kapat
      setReplyTexts(prev => ({
        ...prev,
        [commentId]: ''
      }));
      setReplyingTo(null);

      // Yorumları yenile
      fetchComments(postId);

    } catch (err) {
      console.error('Error submitting reply:', err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        setCommentError('Authentication error or insufficient permissions. Please log in again.');
      } else if (err.response) {
        setCommentError(`Error: ${err.response.data?.message || 'Failed to submit reply.'}`);
      } else {
        setCommentError('Failed to submit reply. Please check your connection and try again.');
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
                    $isActive={sidebarPost.id === parseInt(postId)}
                  >
                    <SidebarPostTitle>{sidebarPost.title}</SidebarPostTitle>
                    <SidebarPostAuthor>
                      {sidebarPost.userName}
                    </SidebarPostAuthor>
                    <SidebarPostStats>
                      <span>{sidebarPost.commentCount} comments</span>
                    </SidebarPostStats>
                  </SidebarPostItem>
                ))
              ) : (
                <EmptyStateMessage style={{ padding: '20px 0' }}>No popular posts yet</EmptyStateMessage>
              )}
            </SidebarPostsList>
          </LeftSidebar>

          <RightContent>
            <BackLink onClick={() => navigate('/forum')}><FiArrowLeft size={16} /> Back to Forum</BackLink>
            
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
                      <CategoryTag 
                        key={tagIndex} 
                        $categoryColor={categoryColorMap[tag] || null}
                      >
                        {tag}
                      </CategoryTag>
                    ))
                  ) : (
                    <CategoryTag>General</CategoryTag>
                  )}
                </DetailedPostTags>
              </DetailedPostHeader>
              
              <DetailedPostContent>
                <DetailedPostTitle>{post.title}</DetailedPostTitle>
                <DetailedPostText>{post.description}</DetailedPostText>
                {Array.isArray(post.media) && post.media.length > 0 && (
                  <MediaContainer>
                    {post.media.map((mediaUrl, index) => (
                      mediaUrl.match(/\.(jpeg|jpg|gif|png)$/) != null
                      ? <DetailedPostMedia 
                          key={index} 
                          src={mediaUrl} 
                          alt={`Post media ${index + 1}`} 
                          onClick={() => setZoomedImageUrl(mediaUrl)}
                        />
                      : mediaUrl.match(/\.(mp4|webm|ogg)$/) != null
                        ? <DetailedPostVideo key={index} src={mediaUrl} controls preload="none" />
                        : null
                    ))}
                  </MediaContainer>
                )}
              </DetailedPostContent>
              
              <DetailedPostFooter>
                <DetailedPostComments>
                  {post.commentCount} comment{post.commentCount !== 1 ? 's' : ''}
                </DetailedPostComments>
              </DetailedPostFooter>
            </DetailedPost>
            
            <CommentsSection>
              <CommentForm onSubmit={handleSubmitComment}>
                <CommentInput 
                  placeholder="Write a comment..." 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  minRows={1}
                  maxRows={20}
                />
                <CommentSubmitButton type="submit" disabled={!newComment.trim()}>
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
                    <CommentItem 
                      key={comment.id} 
                      comment={comment} 
                      replyingTo={replyingTo}
                      replyTexts={replyTexts}
                      handleReplyTextChange={handleReplyTextChange}
                      setReplyingTo={setReplyingTo}
                      handleSubmitReply={handleSubmitReply}
                      defaultProfilePic={defaultProfilePic}
                    />
                  ))
                ) : (
                  !commentError && <EmptyCommentsMessage><FiMessageSquare size={18} /> No comments yet. Be the first to comment!</EmptyCommentsMessage>
                )}
              </CommentList>
            </CommentsSection>
          </RightContent>
        </ForumContent>
      </ForumContainer>

      {/* Login Warning Modal */}
      {showLoginWarning && (
        <ModalOverlay onClick={() => setShowLoginWarning(false)}>
          <WarningModal onClick={e => e.stopPropagation()}>
            <WarningTitle>Sign in Required</WarningTitle>
            <WarningMessage>
              You need to be signed in to participate in discussions. Would you like to sign in or create an account?
            </WarningMessage>
            <WarningButtons>
              <CancelButton onClick={() => setShowLoginWarning(false)}>
                Cancel
              </CancelButton>
              <SignInButton onClick={() => navigate('/login', { state: { from: `/forum/post/${postId}`, message: 'Please log in to comment' } })}>
                Sign in / Sign up
              </SignInButton>
            </WarningButtons>
          </WarningModal>
        </ModalOverlay>
      )}

      {zoomedImageUrl && (
        <ZoomOverlay onClick={() => setZoomedImageUrl(null)}>
          <ZoomedImage src={zoomedImageUrl} alt="Zoomed post media" />
        </ZoomOverlay>
      )}
    </>
  );
};

// Styled components
const ForumContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
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

  @media (max-width: 768px) {
    display: none;
  }
`;

const RightContent = styled.div`
  flex: 0 0 70%;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

const PopularPostsTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #101828;
  margin: 0 0 15px 0;
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
  background-color: ${props => props.$isActive ? '#F0F4FF' : '#fff'};
  
  &:hover {
    background-color: ${props => props.$isActive ? '#F0F4FF' : '#F9FAFB'};
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

const BackLink = styled.button`
  background: none;
  border: none;
  color: #1849A9;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  padding: 6px 10px;
  margin-bottom: 20px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 6px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #EFF6FF;
    color: #172554;
  }

  &:active {
      transform: translateY(1px);
  }

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 5px 8px;
    margin-bottom: 15px;
  }
`;

const DetailedPost = styled.div`
  border: 1px solid #E4E7EC;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding: 15px;
    margin-bottom: 15px;
  }
`;

const DetailedPostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
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
    loading: lazy;
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
  font-size: 12px;
  font-weight: 400;
  padding: 4px 10px;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s ease;
  white-space: nowrap;

  color: ${props => props.$categoryColor || '#475467'};
  background-color: ${props => 
    props.$categoryColor 
      ? props.$categoryColor + '33'
      : '#e9ecef'
  };

  &:hover {
    background-color: ${props => 
      props.$categoryColor 
        ? props.$categoryColor + '55'
        : '#d8dde1'
    };
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    font-size: 11px;
    padding: 3px 8px;
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

  @media (max-width: 768px) {
    font-size: 20px;
    margin: 0 0 12px 0;
  }
`;

const DetailedPostText = styled.div`
  font-size: 16px;
  color: #344054;
  line-height: 1.6;
  margin-bottom: 20px;
  white-space: pre-line;

  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 1.5;
    margin-bottom: 15px;
  }
`;

const DetailedPostMedia = styled.img.attrs({
  loading: 'lazy'
})`
  max-width: 70%;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px;
  margin-top: 10px;
  cursor: zoom-in;
  transition: transform 0.2s ease;

  @media (max-width: 768px) {
    max-width: 100%;
    margin-top: 8px;
  }
`;

// Add styled component for video if needed
const DetailedPostVideo = styled.video.attrs({
  preload: 'none'
})`
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
  justify-content: flex-start;
  align-items: center;
  border-top: 1px solid #F2F4F7;
  padding-top: 15px;
`;

const DetailedPostComments = styled.div`
  font-size: 14px;
  color: #667085;
`;

const CommentsSection = styled.div`
  margin-top: 40px;
  background: #FFFFFF;
  border: 1px solid #E4E7EC;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.1);

  @media (max-width: 768px) {
    margin-top: 20px;
    padding: 16px;
    border-radius: 8px;
  }
`;

const CommentForm = styled.form`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const CommentInput = styled(TextareaAutosize)`
  flex-grow: 1;
  padding: 12px 16px;
  border: 1px solid #E4E7EC;
  border-radius: 8px;
  font-size: 15px;
  resize: none;
  min-height: 44px;
  line-height: 1.5;
  background-color: #FFFFFF;

  &:focus {
    outline: none;
    border-color: #1570EF;
    box-shadow: 0 0 0 2px rgba(21, 112, 239, 0.1);
  }

  &::placeholder {
    color: #98A2B3;
  }

  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: 14px;
    min-height: 40px;
  }
`;

const CommentSubmitButton = styled.button`
  background: none;
  border: none;
  color: #1570EF;
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  height: 44px;
  width: 44px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    color: #0D5ECB;
    background-color: rgba(21, 112, 239, 0.08);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    color: #98A2B3;
    cursor: not-allowed;
  }
`;

const CommentsTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #101828;
  margin: 24px 0 24px 0;
  padding: 0 0 16px 0;
  border-bottom: 1px solid #E4E7EC;
`;

const CommentList = styled.div`
  margin-top: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CommentItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.$isReply ? '20px' : '24px'};
  padding: ${props => props.$isReply ? '0' : '32px 0'};
  border-bottom: ${props => props.$isReply ? 'none' : '1px solid #E4E7EC'};
  width: 100%;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    gap: ${props => props.$isReply ? '16px' : '20px'};
    padding: ${props => props.$isReply ? '0' : '24px 0'};
  }
`;

const CommentMainContent = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;

const CommentAvatar = styled.div`
  width: ${props => props.$isReply ? '36px' : '40px'};
  height: ${props => props.$isReply ? '36px' : '40px'};
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    loading: lazy;
  }
`;

const CommentContent = styled.div`
  flex-grow: 1;
  min-width: 0;
  padding-right: 16px;
`;

const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
`;

const CommentAuthorName = styled.div`
  font-weight: 600;
  color: #101828;
  font-size: 15px;
`;

const CommentTime = styled.div`
  font-size: 13px;
  color: #667085;
`;

const CommentText = styled.p`
  margin: 0;
  font-size: 15px;
  color: #344054;
  line-height: 1.6;
  white-space: pre-line;
  word-wrap: break-word;
  padding: 4px 0;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.5;
  }
`;

const CommentActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 12px;
  margin-left: -10px;
`;

const CommentLikeButton = styled.button`
  background: none;
  border: none;
  color: #667085;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: 16px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  svg {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    z-index: 2;
  }

  span {
    position: relative;
    z-index: 2;
  }

  &:hover {
    color: #E94A65;
    background-color: rgba(233, 74, 101, 0.08);
  }

  &:active {
    transform: scale(0.95);
  }

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background-color: rgba(233, 74, 101, 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    transition: width 0.4s ease-out, height 0.4s ease-out;
  }

  &:active:before {
    width: 150%;
    height: 150%;
  }

  &.liked {
    color: #E94A65;
    background-color: rgba(233, 74, 101, 0.08);
    font-weight: 600;

    svg {
      transform: scale(1.1);
    }
  }
`;

const CommentReplyButton = styled.button`
  background: none;
  border: none;
  color: #667085;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: 16px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  svg {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    z-index: 2;
  }

  span {
    position: relative;
    z-index: 2;
  }

  &:hover, &.active {
    color: #1570EF;
    background-color: rgba(21, 112, 239, 0.08);
  }

  &:active {
    transform: scale(0.95);
  }

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background-color: rgba(21, 112, 239, 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    transition: width 0.4s ease-out, height 0.4s ease-out;
  }

  &:active:before {
    width: 150%;
    height: 150%;
  }

  &.active {
    font-weight: 600;

    svg {
      transform: scale(1.1);
    }
  }
`;

const ReplyFormContainer = styled.div`
  margin-left: 56px;
  margin-top: 12px;
  margin-bottom: 16px;
  position: relative;
  width: calc(100% - 56px);
  background-color: #F9FAFB;
  border-radius: 8px;
  padding: 16px;
`;

const RepliesContainer = styled.div`
  margin-left: 56px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  padding-left: 28px;
  width: calc(100% - 56px);

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 16px;
    width: 2px;
    background-color: #E4E7EC;
  }

  @media (max-width: 768px) {
    margin-left: 40px;
    padding-left: 20px;
    width: calc(100% - 40px);
    gap: 16px;
  }
`;

const EmptyCommentsMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  text-align: center;
  padding: 30px 0;
  color: #667085;
  font-size: 14px;
  font-weight: 500;
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

// --- Add styles for Image Zoom Modal ---
const ZoomOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100; // Ensure it's above other elements
  cursor: pointer;
`;

const ZoomedImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  cursor: default; // Prevent overlay cursor on the image itself
`;
// --- End of Image Zoom Modal styles ---

// Add new styled components for the warning modal
const WarningModal = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  position: relative;
  animation: modalAppear 0.3s ease-out;

  @media (max-width: 768px) {
    padding: 20px;
    width: 85%;
  }

  @keyframes modalAppear {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const WarningTitle = styled.h3`
  margin: 0 0 12px 0;
  color: #101828;
  font-size: 18px;
  font-weight: 600;
`;

const WarningMessage = styled.p`
  margin: 0 0 24px 0;
  color: #475467;
  font-size: 14px;
  line-height: 1.5;
`;

const WarningButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const CancelButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #D0D5DD;
  background: white;
  color: #344054;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #F9FAFB;
    border-color: #98A2B3;
  }
`;

const SignInButton = styled.button`
  padding: 8px 16px;
  border: none;
  background: #1849A9;
  color: white;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #1237A3;
  }
`;

// Add new styled components for the warning modal
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export default SelectedForumPage;