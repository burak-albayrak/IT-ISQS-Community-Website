import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FiSearch, FiArrowRight, FiFilter, FiChevronDown, FiMoreHorizontal, FiX, FiImage, FiSend, FiTag, FiHeart, FiEye, FiBookmark } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Forum.css';
import forumLogo from '../assets/forum.png';
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

const Forum = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [forumPosts, setForumPosts] = useState([]);
  const [recentForumPosts, setRecentForumPosts] = useState([]);
  const [savedForumPosts, setSavedForumPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]); // Store all posts for filtering
  const [categories, setCategories] = useState(['Research', 'Frameworks', 'Tools', 'Software Development']);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortOption, setSortOption] = useState('newest');
  const sortRef = useRef(null);
  const categoryRef = useRef(null);
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTags, setNewPostTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const modalRef = useRef(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Fetch forum data when page loads
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Get forum posts from backend
        const response = await axios.get(`http://localhost:8080/api/v1/forum-posts`);
        
        if (response && response.data) {
          const posts = response.data;
          
          if (posts.length > 0) {
            // Extract unique categories from posts
            const uniqueCategories = [...new Set(
              posts
                .filter(post => post.tags && post.tags.length > 0)
                .flatMap(post => post.tags)
            )];
            
            if (uniqueCategories.length > 0) {
              setCategories(uniqueCategories);
            }
            
            // Sort posts by creation date (newest first)
            const sortedPosts = [...posts].sort((a, b) => {
              const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
              const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
              return dateB - dateA;
            });
            
            // Format posts for display
            const formattedPosts = sortedPosts.map(post => ({
              id: post.forumPostID,
              title: post.title,
              description: post.description,
              media: post.media || '',
              likesCount: post.likesCount || 0,
              commentCount: post.commentCount || 0,
              createdBy: post.createdBy,
              createdByType: post.createdByType,
              createdAt: post.createdAt,
              formattedDate: formatDate(post.createdAt),
              timeAgo: getTimeAgo(post.createdAt),
              updatedAt: post.updatedAt,
              tags: post.tags || ['Research'], // Default to Research if no tags
              userName: post.userName || post.ownerName || 'Anonymous', // Use actual username if available
              userProfilePic: post.userProfilePic || '' // Store profile pic URL if available
            }));
            
            // Save all posts for filtering
            setAllPosts(formattedPosts);
            
            // Set recent posts
            setRecentForumPosts(formattedPosts.slice(0, 5));
            
            // Get popular posts for the Popular section
            const popularPosts = [...formattedPosts]
              .sort((a, b) => b.likesCount - a.likesCount)
              .slice(0, 4);
            setForumPosts(popularPosts);
            
            // Get saved posts for the current user
            // In a real app, this would be fetched from a separate endpoint
            setSavedForumPosts(formattedPosts.slice(0, 3));
            
            // Set pagination
            setTotalPages(Math.ceil(formattedPosts.length / 10));
          } else {
            // No posts found
            setAllPosts([]);
            setForumPosts([]);
            setRecentForumPosts([]);
            setSavedForumPosts([]);
            setError("No forum posts found.");
          }
        } else {
          throw new Error('Invalid response format');
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching forum posts:", err);
        setError("Failed to load forum posts. Please try again later.");
        setAllPosts([]);
        setForumPosts([]);
        setRecentForumPosts([]);
        setSavedForumPosts([]);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  // Format date to readable format (e.g., "Oct 15, 2023")
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Calculate time ago (e.g., "2 hours ago", "3 days ago")
  const getTimeAgo = (dateString) => {
    if (!dateString) return "Unknown time";
    
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return `${seconds} seconds ago`;
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;
    
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;
    
    const years = Math.floor(months / 12);
    return `${years} year${years === 1 ? '' : 's'} ago`;
  };

  // Handle clicks outside of sort dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSortDropdown(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortRef, categoryRef]);

  // Handle search functionality
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      // If search is empty, reset to show all posts
      setRecentForumPosts(allPosts.slice(0, 5));
      
      // Reset popular posts
      const popularPosts = [...allPosts]
        .sort((a, b) => b.likesCount - a.likesCount)
        .slice(0, 4);
      setForumPosts(popularPosts);
      
      return;
    }
    
    // Filter posts by search query
    const filteredPosts = allPosts.filter(post => {
      const searchLower = searchQuery.toLowerCase();
      return (
        (post.title && post.title.toLowerCase().includes(searchLower)) ||
        (post.description && post.description.toLowerCase().includes(searchLower))
      );
    });
    
    // Update recent posts with filtered results
    setRecentForumPosts(filteredPosts.slice(0, 5));
    
    // Update popular posts with filtered results
    const filteredPopular = [...filteredPosts]
      .sort((a, b) => b.likesCount - a.likesCount)
      .slice(0, 4);
    setForumPosts(filteredPopular);
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    
    if (!category) {
      // If no category selected, show all posts
      setRecentForumPosts(allPosts.slice(0, 5));
      
      // Reset popular posts
      const popularPosts = [...allPosts]
        .sort((a, b) => b.likesCount - a.likesCount)
        .slice(0, 4);
      setForumPosts(popularPosts);
      
      return;
    }
    
    // Filter posts by selected category
    const filteredPosts = allPosts.filter(post => 
      post.tags && post.tags.includes(category)
    );
    
    // Update recent posts with filtered results
    setRecentForumPosts(filteredPosts.slice(0, 5));
    
    // Update popular posts with filtered results
    const filteredPopular = [...filteredPosts]
      .sort((a, b) => b.likesCount - a.likesCount)
      .slice(0, 4);
    setForumPosts(filteredPopular);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    // Prevent going to negative pages or beyond the max
    if (newPage < 0 || newPage >= totalPages) {
      return;
    }
    
    setCurrentPage(newPage);
    
    // Update recent posts for the selected page
    const startIndex = newPage * 5;
    let postsToShow = [];
    
    // If filtering by category
    if (selectedCategory) {
      const filteredPosts = allPosts.filter(post => 
        post.tags && post.tags.includes(selectedCategory)
      );
      postsToShow = filteredPosts.slice(startIndex, startIndex + 5);
    } 
    // If filtering by search
    else if (searchQuery) {
      const filteredPosts = allPosts.filter(post => {
        const searchLower = searchQuery.toLowerCase();
        return (
          (post.title && post.title.toLowerCase().includes(searchLower)) ||
          (post.description && post.description.toLowerCase().includes(searchLower))
        );
      });
      postsToShow = filteredPosts.slice(startIndex, startIndex + 5);
    }
    // No filters, show all posts
    else {
      postsToShow = allPosts.slice(startIndex, startIndex + 5);
    }
    
    setRecentForumPosts(postsToShow);
  };

  // Handle sort change
  const handleSortChange = (option) => {
    setSortOption(option);
    setShowSortDropdown(false);
    
    // Create a copy of posts to sort
    let sortedRecentPosts = [...recentForumPosts];
    let sortedPopularPosts = [...forumPosts];
    
    // Apply sorting based on selected option
    switch (option) {
      case 'newest':
        sortedRecentPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        sortedPopularPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        sortedRecentPosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        sortedPopularPosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'most-liked':
        sortedRecentPosts.sort((a, b) => b.likesCount - a.likesCount);
        sortedPopularPosts.sort((a, b) => b.likesCount - a.likesCount);
        break;
      case 'most-commented':
        sortedRecentPosts.sort((a, b) => b.commentCount - a.commentCount);
        sortedPopularPosts.sort((a, b) => b.commentCount - a.commentCount);
        break;
      default:
        break;
    }
    
    // Update state with sorted posts
    setRecentForumPosts(sortedRecentPosts);
    setForumPosts(sortedPopularPosts);
  };

  // Handle outside click for modal
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowCreateModal(false);
      }
    }

    if (showCreateModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCreateModal, modalRef]);

  // Create a new forum post
  const handleCreatePost = () => {
    setShowCreateModal(true);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostTags([]);
    setSubmitError('');
  };

  // Handle tag selection
  const handleTagSelection = (tag) => {
    if (newPostTags.includes(tag)) {
      setNewPostTags(newPostTags.filter(t => t !== tag));
    } else {
      setNewPostTags([...newPostTags, tag]);
    }
  };

  // Submit new post
  const submitNewPost = async () => {
    // Validate post data
    if (!newPostTitle.trim()) {
      setSubmitError('Please enter a title for your post');
      return;
    }

    if (!newPostContent.trim()) {
      setSubmitError('Please enter content for your post');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Get token from local storage
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login', { state: { from: '/forum', message: 'Please log in to create a post' } });
        return;
      }

      // Create post data
      const postData = {
        title: newPostTitle,
        description: newPostContent,
        tags: newPostTags.length > 0 ? newPostTags : ['General']
      };

      // Send POST request to API
      const response = await axios.post(
        'http://localhost:8080/api/v1/forum-posts',
        postData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200 || response.status === 201) {
        // Close modal and refresh posts
        setShowCreateModal(false);
        
        // Add new post to state to avoid full refresh
        const newPost = {
          id: response.data.id || Date.now(), // Use returned ID or temporary one
          title: newPostTitle,
          description: newPostContent,
          likesCount: 0,
          commentCount: 0,
          createdBy: 'You', // This should come from the authenticated user
          createdByType: 'USER',
          createdAt: new Date().toISOString(),
          formattedDate: formatDate(new Date()),
          timeAgo: 'Just now',
          tags: newPostTags.length > 0 ? newPostTags : ['General']
        };

        // Update state
        setAllPosts([newPost, ...allPosts]);
        setRecentForumPosts([newPost, ...recentForumPosts.slice(0, 4)]);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setSubmitError(error.response?.data?.message || 'Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle like action
  const handleLikePost = async (postId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { from: '/forum', message: 'Please log in to like posts' } });
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/api/v1/forum-posts/like/${postId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      // Update liked post in state
      const updatePostInList = (postList) => {
        return postList.map(post => {
          if (post.id === postId) {
            // Toggle like state and count
            const isLiked = post.isLiked || false;
            return {
              ...post,
              isLiked: !isLiked,
              likesCount: isLiked ? post.likesCount - 1 : post.likesCount + 1
            };
          }
          return post;
        });
      };

      setAllPosts(updatePostInList(allPosts));
      setRecentForumPosts(updatePostInList(recentForumPosts));
      setForumPosts(updatePostInList(forumPosts));
      setSavedForumPosts(updatePostInList(savedForumPosts));

    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  // Handle save action
  const handleSavePost = async (postId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { from: '/forum', message: 'Please log in to save posts' } });
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/api/v1/forum-posts/${postId}/save`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      // Update saved post in state
      const updatePostInList = (postList) => {
        return postList.map(post => {
          if (post.id === postId) {
            // Toggle saved state
            const isSaved = post.isSaved || false;
            
            // If unsaving, remove from saved list
            if (isSaved) {
              setSavedForumPosts(savedForumPosts.filter(p => p.id !== postId));
            } else {
              // If saving, add to saved list if not already there
              if (!savedForumPosts.some(p => p.id === postId)) {
                setSavedForumPosts([...savedForumPosts, post]);
              }
            }
            
            return {
              ...post,
              isSaved: !isSaved
            };
          }
          return post;
        });
      };

      setAllPosts(updatePostInList(allPosts));
      setRecentForumPosts(updatePostInList(recentForumPosts));
      setForumPosts(updatePostInList(forumPosts));

    } catch (error) {
      console.error('Error saving post:', error);
    }
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

  return (
    <>
      <GlobalStyle />
      {/* Blue banner section from Blog page */}
      <FullWidthBanner>
        <ForumContainer>
          <BannerTitle>Welcome to Community Forum!</BannerTitle>
          <BannerDescription>
            Here you are free to ask questions, share your ideas and engage in thoughtful communications with our community.
          </BannerDescription>
          <ForumLogo src={forumLogo} alt="Forum Logo" />
        </ForumContainer>
      </FullWidthBanner>

      <ForumContainer style={{ marginTop: "30px" }}>
        <ForumContent>
          <LeftSidebar>
            <PopularPostsTitle>Popular Forum Posts</PopularPostsTitle>
            <SidebarPostsList>
              {forumPosts.length > 0 ? (
                forumPosts.map((post) => (
                  <SidebarPostItem key={post.id} onClick={() => navigate(`/forum/post/${post.id}`)}>
                    <SidebarPostAuthor>
                      {post.userName}
                    </SidebarPostAuthor>
                    <SidebarPostTitle>{post.title}</SidebarPostTitle>
                    <SidebarPostStats>
                      <span>{post.commentCount} comments</span> • <span>{post.likesCount} likes</span>
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
                savedForumPosts.map((post) => (
                  <SidebarPostItem key={`saved-${post.id}`} onClick={() => navigate(`/forum/post/${post.id}`)}>
                    <SidebarPostAuthor>
                      {post.userName}
                    </SidebarPostAuthor>
                    <SidebarPostTitle>{post.title}</SidebarPostTitle>
                    <SidebarPostStats>
                      <span>{post.commentCount} comments</span> • <span>{post.likesCount} likes</span>
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
            <ForumControls>
              <SearchFormContainer onSubmit={handleSearch}>
                <SearchIcon>
                  <FiSearch />
                </SearchIcon>
                <SearchInput 
                  type="text" 
                  placeholder="Search in Forum" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </SearchFormContainer>
              
              <SortButtonContainer ref={sortRef}>
                <SortButton onClick={() => setShowSortDropdown(!showSortDropdown)}>
                  <FiFilter size={16} />
                  <FiChevronDown size={16} />
                </SortButton>
                
                {showSortDropdown && (
                  <SortDropdown>
                    <SortOption 
                      selected={sortOption === 'newest'} 
                      onClick={() => handleSortChange('newest')}
                    >
                      Newest first
                    </SortOption>
                    <SortOption 
                      selected={sortOption === 'oldest'} 
                      onClick={() => handleSortChange('oldest')}
                    >
                      Oldest first
                    </SortOption>
                    <SortOption 
                      selected={sortOption === 'most-liked'} 
                      onClick={() => handleSortChange('most-liked')}
                    >
                      Most liked
                    </SortOption>
                    <SortOption 
                      selected={sortOption === 'most-commented'} 
                      onClick={() => handleSortChange('most-commented')}
                    >
                      Most commented
                    </SortOption>
                  </SortDropdown>
                )}
              </SortButtonContainer>
              
              <CategorySelectContainer ref={categoryRef}>
                <CategoryButton onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}>
                  <FiTag size={16} />
                  <FiChevronDown size={16} />
                </CategoryButton>
                
                {showCategoryDropdown && (
                  <CategoryDropdown>
                    <CategoryOption 
                      selected={selectedCategory === ''} 
                      onClick={() => handleCategoryChange({ target: { value: '' } })}
                    >
                      All Categories
                    </CategoryOption>
                    {categories.map((category, index) => (
                      <CategoryOption 
                        key={index} 
                        selected={selectedCategory === category}
                        onClick={() => handleCategoryChange({ target: { value: category } })}
                      >
                        {category}
                      </CategoryOption>
                    ))}
                  </CategoryDropdown>
                )}
              </CategorySelectContainer>
              
              <CreatePostButton onClick={handleCreatePost}>
                Create Forum Post
              </CreatePostButton>
            </ForumControls>

            <DetailedPostsTitle>Recently Forum Posts</DetailedPostsTitle>
            <DetailedPostsList>
              {recentForumPosts.length > 0 ? (
                recentForumPosts.map((post, index) => (
                  <DetailedPostItem 
                    key={`recent-${post.id}`} 
                    onClick={() => navigate(`/forum/post/${post.id}`)}
                  >
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
                        <SaveButton onClick={(e) => {
                          e.stopPropagation();
                          handleSavePost(post.id);
                        }}>
                          {post.isSaved ? <FiBookmark size={16} fill="#1E40AF" color="#1E40AF" /> : <FiBookmark size={16} />}
                        </SaveButton>
                      </DetailedPostTags>
                    </DetailedPostHeader>
                    
                    <DetailedPostContent>
                      <DetailedPostTitle>{post.title}</DetailedPostTitle>
                      <DetailedPostText>
                        {post.description.length > 300 
                          ? `${post.description.substring(0, 300)}...` 
                          : post.description
                        }
                      </DetailedPostText>
                    </DetailedPostContent>
                    
                    <DetailedPostFooter>
                      <DetailedPostComments>
                        {post.commentCount} comment{post.commentCount !== 1 ? 's' : ''}
                      </DetailedPostComments>
                      
                      <DetailedPostStats>
                        <DetailedPostStat onClick={(e) => {
                          e.stopPropagation();
                          handleLikePost(post.id);
                        }}>
                          {post.isLiked ? <FiHeart size={16} fill="#E94A65" color="#E94A65" /> : <FiHeart size={16} />}
                          <span>{post.likesCount}</span>
                        </DetailedPostStat>
                        <DetailedPostStat onClick={(e) => e.stopPropagation()}>
                          <FiEye size={16} />
                          <span>{100 + index * 20}</span>
                        </DetailedPostStat>
                      </DetailedPostStats>
                    </DetailedPostFooter>
                  </DetailedPostItem>
                ))
              ) : (
                <EmptyStateContainer>
                  <EmptyStateMessage>No forum posts available</EmptyStateMessage>
                  <CreatePostButton onClick={handleCreatePost}>
                    Create your first post
                  </CreatePostButton>
                </EmptyStateContainer>
              )}
            </DetailedPostsList>
            
            <Pagination>
              <PaginationLink 
                to="#" 
                className="prev" 
                onClick={() => handlePageChange(currentPage - 1)}
                style={{ visibility: currentPage > 0 ? 'visible' : 'hidden' }}
              >
                <FiArrowRight style={{ transform: 'rotate(180deg)', marginRight: '4px' }} /> Previous
              </PaginationLink>
              <PageNumbers>
                {[...Array(totalPages).keys()].map(page => (
                  <PageNumber 
                    key={page} 
                    to="#" 
                    className={currentPage === page ? 'active' : ''}
                    onClick={() => handlePageChange(page)}
                  >
                    {page + 1}
                  </PageNumber>
                ))}
              </PageNumbers>
              <PaginationLink 
                to="#" 
                className="next"
                onClick={() => handlePageChange(currentPage + 1)}
                style={{ visibility: currentPage < totalPages - 1 ? 'visible' : 'hidden' }}
              >
                Next <FiArrowRight style={{ marginLeft: '4px' }} />
              </PaginationLink>
            </Pagination>
          </RightContent>
        </ForumContent>
      </ForumContainer>

      {/* Create Post Modal */}
      {showCreateModal && (
        <ModalOverlay>
          <ModalContainer ref={modalRef}>
            <ModalHeader>
              <ModalTitle>Create a New Post</ModalTitle>
              <CloseButton onClick={() => setShowCreateModal(false)}>
                <FiX />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              <InputLabel>Title</InputLabel>
              <TitleInput 
                type="text" 
                placeholder="Enter a descriptive title" 
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
              />
              
              <InputLabel>Content</InputLabel>
              <ContentTextarea 
                placeholder="Share your thoughts, questions, or ideas..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />
              
              <InputLabel>Tags</InputLabel>
              <TagsContainer>
                {categories.map((tag, index) => (
                  <TagOption 
                    key={index} 
                    selected={newPostTags.includes(tag)}
                    onClick={() => handleTagSelection(tag)}
                  >
                    {tag}
                  </TagOption>
                ))}
              </TagsContainer>
              
              {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
            </ModalBody>
            <ModalFooter>
              <UploadButton>
                <FiImage />
                Add Image
              </UploadButton>
              <SubmitButton 
                onClick={submitNewPost}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Posting...' : 'Post'} <FiSend />
              </SubmitButton>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
};

// Styled Components
const ForumContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
`;

const FullWidthBanner = styled.div`
  background-color: #f5f7ff;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  padding: 40px 0;
  margin-top: -30px;
`;

const BannerTitle = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #101828;
  margin: 0 0 10px 0;
`;

const BannerDescription = styled.p`
  font-size: 16px;
  color: #475467;
  margin: 0;
  max-width: 1000px;
`;

const ForumControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    width: 100%;
  }
`;

const SearchFormContainer = styled.form`
  display: flex;
  align-items: center;
  background-color: #f2f4f7;
  border-radius: 25px;
  padding: 8px 16px;
  flex-grow: 1;
  max-width: 380px;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 8px 8px 10px;
  border: none;
  background: transparent;
  font-size: 15px;
  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled.div`
  color: #667085;
  font-size: 16px;
  display: flex;
  align-items: center;
`;

const SortButtonContainer = styled.div`
  position: relative;
  margin: 0 4px;
`;

const SortButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: #f2f4f7;
  border: none;
  border-radius: 25px;
  padding: 8px 10px;
  height: 35px;
  color: #667085;
  font-size: 15px;
  cursor: pointer;
  
  &:hover {
    background-color: #e4e7ec;
  }
`;

const SortDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 8px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
`;

const SortOption = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  
  ${({ selected }) => selected && `
    background-color: #EFF6FF;
    color: #1E40AF;
    font-weight: 500;
  `}
  
  &:hover:not(${({ selected }) => selected && '&'}) {
    background-color: #F2F4F7;
  }
`;

const CategorySelectContainer = styled.div`
  position: relative;
  margin: 0 4px;
`;

const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: #f2f4f7;
  border: none;
  border-radius: 25px;
  padding: 8px 10px;
  height: 35px;
  color: #667085;
  font-size: 15px;
  cursor: pointer;
  
  &:hover {
    background-color: #e4e7ec;
  }
`;

const CategoryDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 8px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
`;

const CategoryOption = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  
  ${({ selected }) => selected && `
    background-color: #EFF6FF;
    color: #1E40AF;
    font-weight: 500;
  `}
  
  &:hover:not(${({ selected }) => selected && '&'}) {
    background-color: #F2F4F7;
  }
`;

const CreatePostButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: linear-gradient(to right, #18325e, #1a3a7d, #2a4c8f);
  border: none;
  border-radius: 25px;
  padding: 8px 16px;
  height: 35px;
  color: white;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  margin-left: auto;
  
  &:hover {
    background-color: #0284C7;
  }
`;

const ForumContent = styled.div`
  display: flex;
  gap: 40px;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const LeftSidebar = styled.div`
  flex: 0 0 30%;
  display: flex;
  flex-direction: column;
  padding-top: 66px;
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

const DetailedPostsTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #101828;
  margin: 0 0 20px 0;
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
  background-color: #fff;
  
  &:hover {
    background-color: #F9FAFB;
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

const DetailedPostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DetailedPostItem = styled.div`
  border: 1px solid #E4E7EC;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(16, 24, 40, 0.1);
    transform: translateY(-2px);
  }
`;

const DetailedPostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 10px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const DetailedPostAuthorSection = styled.div`
  display: flex;
  gap: 10px;
`;

const AuthorAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DetailedPostAuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DetailedPostAuthorName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #344054;
`;

const DetailedPostTime = styled.div`
  font-size: 12px;
  color: #667085;
`;

const DetailedPostTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 4px;
`;

const DetailedPostContent = styled.div`
  margin-bottom: 15px;
`;

const DetailedPostTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #1849A9;
  margin: 0 0 10px 0;
`;

const DetailedPostText = styled.p`
  font-size: 14px;
  color: #475467;
  line-height: 1.5;
  margin: 0;
`;

const DetailedPostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

const DetailedPostComments = styled.div`
  font-size: 12px;
  color: #667085;
`;

const DetailedPostStats = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const DetailedPostStat = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #667085;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f2f4f7;
  }
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

const ViewAllLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1849A9;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  padding: 12px;
  border-top: 1px solid #F2F4F7;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #EFF6FF;
    color: #1E40AF;
  }
  
  &::after {
    content: '→';
    margin-left: 6px;
    transition: transform 0.2s ease;
  }
  
  &:hover::after {
    transform: translateX(3px);
  }
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background-color: #f8fafc;
  border-radius: 8px;
  border: 1px dashed #e4e7ec;
`;

const EmptyStateMessage = styled.p`
  font-size: 16px;
  color: #667085;
  margin-bottom: 20px;
  text-align: center;
`;

// Helper function to get readable sort label
const getSortLabel = (option) => {
  switch (option) {
    case 'newest':
      return 'Newest';
    case 'oldest':
      return 'Oldest';
    case 'most-liked':
      return 'Most Liked';
    case 'most-commented':
      return 'Most Commented';
    default:
      return 'Sort';
  }
};

// Modal styled components
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

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #E4E7EC;
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #101828;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #667085;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #344054;
  margin-bottom: 6px;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #D0D5DD;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 20px;
  
  &:focus {
    outline: none;
    border-color: #1849A9;
    box-shadow: 0 0 0 3px rgba(24, 73, 169, 0.1);
  }
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  height: 180px;
  padding: 10px 14px;
  border: 1px solid #D0D5DD;
  border-radius: 8px;
  font-size: 16px;
  resize: vertical;
  margin-bottom: 20px;
  
  &:focus {
    outline: none;
    border-color: #1849A9;
    box-shadow: 0 0 0 3px rgba(24, 73, 169, 0.1);
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
`;

const TagOption = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #1E40AF;
  background-color: #EFF4FF;
  padding: 4px 10px;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #DBE4FF;
    transform: translateY(-1px);
  }
`;

const ErrorMessage = styled.p`
  color: #D92D20;
  font-size: 14px;
  margin: 10px 0;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid #E4E7EC;
`;

const UploadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: white;
  border: 1px solid #D0D5DD;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #344054;
  cursor: pointer;
  
  &:hover {
    background-color: #F9FAFB;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background-color: #026AA2;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  cursor: pointer;
  
  &:hover {
    background-color: #0284C7;
  }
  
  &:disabled {
    background-color: #BAE6FD;
    cursor: not-allowed;
  }
`;

const ForumLogo = styled.img`
  height: 130px;
  margin-left: auto;
  margin-top: -90px;
  position: absolute;
  right: -15px;
  z-index: 0;
  
  @media (max-width: 768px) {
    margin: 5px auto;
    height: 150px;
    position: relative;
    right: auto;
  }
`;

const CategoryTag = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #1E40AF;
  background-color: #EFF4FF;
  padding: 4px 10px;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #DBE4FF;
    transform: translateY(-1px);
  }
`;

const SaveButton = styled.button`
  background: none;
  border: none;
  color: #667085;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  border-radius: 50%;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #F0F7FF;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 40px 0;
  padding: 4px;
  border-radius: 10px;
  max-width: fit-content;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 8px;
    padding: 8px;
    justify-content: center;
  }
`;

const PaginationLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  height: 36px;
  border-radius: 8px;
  color: #667085;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background-color: #F2F4F7;
    color: #1E40AF;
  }
  
  @media (max-width: 768px) {
    font-size: 13px;
    padding: 0 10px;
  }
`;

const PageNumbers = styled.div`
  display: flex;
  gap: 2px;
`;

const PageNumber = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  font-size: 14px;
  color: #667085;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &.active {
    background-color: #EFF6FF;
    color: #1E40AF;
    font-weight: 600;
  }
  
  &:hover:not(.active) {
    background-color: #F2F4F7;
  }
  
  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: 13px;
  }
`;

export default Forum; 