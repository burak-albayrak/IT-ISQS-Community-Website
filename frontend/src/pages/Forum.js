import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FiSearch, FiArrowRight, FiFilter, FiChevronDown, FiMoreHorizontal, FiX, FiImage, FiSend, FiTag, FiEye } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../services/api';
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
  const [newPostCategoryId, setNewPostCategoryId] = useState('');
  const [backendCategories, setBackendCategories] = useState([]); // State for ALL categories fetched from backend
  const [categoryColorMap, setCategoryColorMap] = useState({}); // <-- Add state for category color map
  const [displayCategories, setDisplayCategories] = useState([]); // State for filtered categories to display in dropdown
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const modalRef = useRef(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // State to trigger data refresh
  const [submitSuccess, setSubmitSuccess] = useState(''); // State for success message
  const [recommendedPosts, setRecommendedPosts] = useState([]);
  const [isBelowColdStart, setIsBelowColdStart] = useState(true);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewModalType, setReviewModalType] = useState("loading");
  const [reviewModalMessage, setReviewModalMessage] = useState("Checking post...");

  // Define the allowed category names (alphabetically sorted)
  const allowedCategoryNames = [
    'ARVR',
    'Blockchain',
    'CloudComputing',
    'Cybersecurity',
    'DataScience',
    'DatabaseManagement',
    'DevOps',
    'EmbeddedSystems',
    'GameDevelopment',
    'MachineLearning',
    'MobileDevelopment',
    'OpenSource',
    'ProjectManagement',
    'QAStandards',
    'SoftwareArchitecture',
    'SoftwareTesting',
    'TestPlanning',
    'WebDevelopment'
  ];

  // Check cold start status when component mounts
  useEffect(() => {
    const checkColdStart = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsBelowColdStart(true);
          return;
        }

        const response = await api.get('/user/interaction-count');

        // Assuming the cold start limit is 5 interactions
        setIsBelowColdStart(response.data.interactionCount < 5);
        
        if (response.data.interactionCount >= 5) {
          fetchRecommendedPosts();
        }
      } catch (err) {
        console.error('Error checking cold start:', err);
        setIsBelowColdStart(true);
      }
    };

    checkColdStart();
  }, []);

  // Fetch recommended posts
  const fetchRecommendedPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await api.get('/recommendations/forum-posts');

      if (response && response.data) {
        const formattedRecommendations = response.data.map(post => ({
          id: post.forumPostId,
          title: post.title,
          categoryName: post.categoryName,
          commentCount: post.commentCount || 0,
          similarityScore: post.similarityScore
        }));
        
        setRecommendedPosts(formattedRecommendations);
      }
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setRecommendedPosts([]);
    }
  };

  // Fetch forum data when page loads or refreshKey changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await api.get('/forum-posts');
        
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
              media: post.mediaList || [], // Use mediaList if available
              likesCount: post.likesCount || 0,
              commentCount: post.commentCount || 0,
              createdBy: post.createdBy,
              createdByType: post.createdByType,
              createdAt: post.createdAt,
              formattedDate: formatDate(post.createdAt),
              timeAgo: getTimeAgo(post.createdAt),
              updatedAt: post.updatedAt,
              // Use category object if available from backend
              tags: post.category ? [post.category.name] : ['General'], 
              // Use creatorName and creatorProfilePic if available from backend
              userName: post.creatorName || 'Anonymous',
              userProfilePic: post.creatorProfilePic || defaultProfilePic
            }));
            
            // Save all posts for filtering
            setAllPosts(formattedPosts);
            
            // Set recent posts
            setRecentForumPosts(formattedPosts.slice(0, 5));
            
            // Get popular posts - Sort by comment count (highest to lowest) for 'Popular' section
            // This will be independent from category and sort filters
            const popularPosts = [...formattedPosts]
              .sort((a, b) => b.commentCount - a.commentCount)
              .slice(0, 10); // Show up to 10 most commented posts
            
            setForumPosts(popularPosts);
            
            // Set pagination
            setTotalPages(Math.ceil(formattedPosts.length / 10));
          } else {
            // No posts found
            setAllPosts([]);
            setForumPosts([]);
            setRecentForumPosts([]);
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
        setLoading(false);
      }
    };

    fetchData();
    // Add refreshKey to dependency array
  }, [currentPage, refreshKey]);
  // Fetch categories from backend and filter them
  useEffect(() => {
    const fetchAndFilterCategories = async () => {
      try {
        const response = await api.get('/forum-categories');
        let fetchedCategories = [];
        if (response && response.data) {
          fetchedCategories = response.data; // Assuming response.data is an array of { categoryId, name, color, ... }
          setBackendCategories(fetchedCategories);

          // <-- Create the category color map here
          const colorMap = fetchedCategories.reduce((acc, category) => {
            if (category.name && category.color) {
              acc[category.name] = category.color;
            }
            return acc;
          }, {});
          setCategoryColorMap(colorMap);
          // --> End of color map creation

        } else {
          setBackendCategories([]);
          setCategoryColorMap({}); // <-- Reset map if fetch fails
        }

        // Filter fetched categories based on the allowed names
        const filtered = fetchedCategories.filter(category =>
          allowedCategoryNames.includes(category.name)
        );

        // Sort the filtered categories alphabetically by name for display
        filtered.sort((a, b) => a.name.localeCompare(b.name));

        setDisplayCategories(filtered);

      } catch (error) {
        console.error('Error fetching or filtering categories:', error);
        setBackendCategories([]);
        setDisplayCategories([]); // Set empty on error
        setCategoryColorMap({}); // <-- Reset map on error
      }
    };

    fetchAndFilterCategories();
  }, []); // Fetch categories once when component mounts

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
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    
    if (!category) {
      // If no category selected, show all posts
      setRecentForumPosts(allPosts.slice(0, 5));
      return;
    }
    
    // Filter posts by selected category
    const filteredPosts = allPosts.filter(post => 
      post.tags && post.tags.includes(category)
    );
    
    // Update recent posts with filtered results
    setRecentForumPosts(filteredPosts.slice(0, 5));
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
    
    // Apply sorting based on selected option
    switch (option) {
      case 'newest':
        sortedRecentPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        sortedRecentPosts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'most-commented':
        sortedRecentPosts.sort((a, b) => b.commentCount - a.commentCount);
        break;
      default:
        break;
    }
    
    // Update state with sorted posts
    setRecentForumPosts(sortedRecentPosts);
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

  // Create a new forum post - Open Modal
  const handleCreatePost = () => {
    setShowCreateModal(true);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostCategoryId('');
    setSelectedFiles([]);
    setSubmitError('');
  };

  // Handle category selection from dropdown
  const handleCategorySelect = (event) => {
    setNewPostCategoryId(event.target.value);
  };

  // Trigger hidden file input click
  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    // Limit to 10 files as per backend constraint (adjust if needed)
    if (selectedFiles.length + files.length > 10) {
      setSubmitError('You can upload a maximum of 10 media files.');
      return;
    }
    setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    setSubmitError(''); // Clear error if successful
    // Reset file input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Remove a selected file
  const handleRemoveFile = (fileName) => {
    setSelectedFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
  };

  // Submit new post
  const submitNewPost = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { from: '/forum', message: 'Please log in to create a post' } });
      return;
    }

    if (!newPostTitle.trim() || !newPostContent.trim() || !newPostCategoryId) {
      setSubmitError('Please fill in title, content, and select a category.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Create FormData object
      const formData = new FormData();
      
      // Append text fields as form parameters
      formData.append('title', newPostTitle);
      formData.append('description', newPostContent);
      formData.append('categoryId', newPostCategoryId);
      
      // Append media files if any
      if (selectedFiles.length > 0) {
        selectedFiles.forEach(file => {
          formData.append('mediaFiles', file);
        });
      }

      // Make the API call with FormData - content type is handled by the interceptor
      const response = await api.post('/forum-posts/with-media', formData);
      console.log('Post created successfully:', response.data);

      // Reset form and close modal
      setShowCreateModal(false);
      setIsSubmitting(false);
      setSubmitSuccess('Forum post published successfully!');
      setTimeout(() => {
        setSubmitSuccess('');
      }, 5000);

      // Refresh the posts list by incrementing the refreshKey
      setRefreshKey(prev => prev + 1);
    } catch (err) {
      console.error('Error creating forum post:', err);
      
      setIsSubmitting(false);
      setReviewModalType("error");
      setReviewModalOpen(true);
      
      if (err.message?.includes("toxic")) {
        setReviewModalMessage("Your post contains inappropriate content. Please revise and try again.");
        setSubmitError('Please ensure your content follows community guidelines.');
      } else if (err.status === 401 || err.status === 403) {
        setReviewModalMessage("Authentication error. Please log in again.");
        setSubmitError('Authentication error. Please log in again.');
      } else {
        setReviewModalMessage("Failed to submit post. Please try again.");
        setSubmitError(`Failed to submit post: ${err.message || 'Unknown error'}`);
      }
      
      setTimeout(() => {
        setReviewModalOpen(false);
      }, 3000);
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
        {/* Display Success Message */} 
        {submitSuccess && <SuccessMessage>{submitSuccess}</SuccessMessage>}
        {/* Display Error Message (if any general errors occur) */}
        {error && <GeneralErrorMessage>{error}</GeneralErrorMessage>}

        <ForumContent>
          <LeftSidebar>
            <RecommendationsTitle>Recommendations</RecommendationsTitle>
            {isBelowColdStart ? (
              <RecommendationsMessage>
                You can see suggested posts by commenting and liking the posts.
              </RecommendationsMessage>
            ) : recommendedPosts.length > 0 ? (
              <SidebarPostsList>
                {recommendedPosts.map((post) => (
                  <SidebarPostItem 
                    key={post.id} 
                    onClick={() => navigate(`/forum/post/${post.id}`)}
                  >
                    <SidebarPostTitle>{post.title}</SidebarPostTitle>
                    {post.categoryName && (
                      <CategoryTag 
                        $categoryColor={categoryColorMap[post.categoryName] || null}
                      >
                        {post.categoryName}
                      </CategoryTag>
                    )}
                    <SidebarPostStats>
                      <span>{post.commentCount} comments</span>
                    </SidebarPostStats>
                  </SidebarPostItem>
                ))}
              </SidebarPostsList>
            ) : (
              <RecommendationsMessage>
                No recommendations available at the moment.
              </RecommendationsMessage>
            )}
            <PopularPostsTitle>Popular Forum Posts</PopularPostsTitle>
            <SidebarPostsList>
              {forumPosts.length > 0 ? (
                forumPosts.map((post) => (
                  <SidebarPostItem key={post.id} onClick={() => navigate(`/forum/post/${post.id}`)}>
                    <SidebarPostTitle>{post.title}</SidebarPostTitle>
                    <SidebarPostAuthor>
                      {post.userName}
                    </SidebarPostAuthor>
                    <SidebarPostStats>
                      <span>{post.commentCount} comments</span>
                    </SidebarPostStats>
                  </SidebarPostItem>
                ))
              ) : (
                <EmptyStateMessage style={{ padding: '20px 0' }}>No popular posts yet</EmptyStateMessage>
              )}
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
                    {displayCategories.map((category) => (
                      <CategoryOption 
                        key={category.categoryId} 
                        selected={selectedCategory === category.name}
                        onClick={() => handleCategoryChange({ target: { value: category.name } })}
                      >
                        {category.name}
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
                            src={post.userProfilePic}
                            alt="User avatar"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = defaultProfilePic;
                            }}
                            loading="lazy"
                          />
                        </AuthorAvatar>
                        <DetailedPostAuthorInfo>
                          <DetailedPostAuthorName>
                            {post.userName}
                          </DetailedPostAuthorName>
                          <DetailedPostTime>{post.timeAgo}</DetailedPostTime>
                        </DetailedPostAuthorInfo>
                      </DetailedPostAuthorSection>
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
                      {/* NEW: Container for stats (comments only) */}
                      <PostStatsContainer>
                        {/* Comments count */}
                        <DetailedPostComments>
                          {post.commentCount} comment{post.commentCount !== 1 ? 's' : ''}
                        </DetailedPostComments>
                      </PostStatsContainer>
                      
                      {/* Tags remain on the right */}
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
                    </DetailedPostFooter>
                  </DetailedPostItem>
                ))
              ) : (
                <EmptyStateContainer>
                  <EmptyStateMessage>No forum posts available</EmptyStateMessage>
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
              
              <InputLabel>Category</InputLabel>
              <CategorySelect value={newPostCategoryId} onChange={handleCategorySelect}>
                <option value="" disabled>Select a category</option>
                {displayCategories.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>
                    {category.name}
                  </option>
                ))}
              </CategorySelect>
              
              <InputLabel>Content</InputLabel>
              <ContentTextarea 
                placeholder="Share your thoughts, questions, or ideas..."
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
              />

              {/* Hidden File Input */}
              <input
                type="file"
                multiple
                accept="image/*,video/*" // Adjust accepted file types if needed
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              {/* Display Selected Files */}
              {selectedFiles.length > 0 && (
                <SelectedFilesPreview>
                  <InputLabel style={{ marginBottom: '5px' }}>Selected Files ({selectedFiles.length}/10):</InputLabel>
                  <FileList>
                    {selectedFiles.map((file, index) => (
                      <FileItem key={index}>
                        <FileName>{file.name} ({ (file.size / 1024).toFixed(1) } KB)</FileName>
                        <RemoveFileButton onClick={() => handleRemoveFile(file.name)}>
                          <FiX size={14} />
                        </RemoveFileButton>
                      </FileItem>
                    ))}
                  </FileList>
                </SelectedFilesPreview>
              )}

              {submitError && <ModalErrorMessage>{submitError}</ModalErrorMessage>}
            </ModalBody>
            <ModalFooter>
              <UploadButton onClick={handleUploadButtonClick} disabled={isSubmitting}>
                <FiImage />
                Add Media (Max 5)
              </UploadButton>
              <SubmitButton
                onClick={submitNewPost}
                disabled={isSubmitting}
              >
                {isSubmitting ? <ButtonSpinner /> : (<>Post <FiSend /></>) }
              </SubmitButton>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      )}

      {/* Review Modal */}
      {reviewModalOpen && (
        <ModalOverlay>
          <ReviewModal>
            {reviewModalType === "loading" ? (
              <>
                <ReviewSpinner />
                <ReviewText>Under review</ReviewText>
              </>
            ) : (
              <>
                <ReviewErrorIcon>⚠️</ReviewErrorIcon>
                <ReviewText type="error">{reviewModalMessage}</ReviewText>
              </>
            )}
          </ReviewModal>
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

  @media (max-width: 768px) {
    padding: 0 15px;
  }
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

  @media (max-width: 768px) {
    font-size: 22px;
    margin-bottom: 8px;
  }
`;

const BannerDescription = styled.p`
  font-size: 16px;
  color: #475467;
  margin: 0;
  max-width: 1000px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
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
    margin-bottom: 20px;

    & > form {
      width: 100%;
      margin-bottom: 8px;
    }

    & > div:not(:last-child) {
      display: flex;
      gap: 8px;
      margin-bottom: 8px;
    }

    & > button:last-child {
      width: 100%;
    }
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

  @media (max-width: 768px) {
    flex: 1;
    margin: 0;
  }
`;

const SortButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: #f2f4f7;
  border: none;
  border-radius: 25px;
  padding: 8px 16px;
  height: 35px;
  color: #667085;
  font-size: 15px;
  cursor: pointer;
  
  &:hover {
    background-color: #e4e7ec;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 45px;
    font-size: 14px;
    padding: 8px 12px;
    gap: 6px;
  }
`;

const SortDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 180px;
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
  white-space: nowrap;

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

  @media (max-width: 768px) {
    flex: 1;
    margin: 0;
  }
`;

const CategoryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: #f2f4f7;
  border: none;
  border-radius: 25px;
  padding: 8px 16px;
  height: 35px;
  color: #667085;
  font-size: 15px;
  cursor: pointer;
  
  &:hover {
    background-color: #e4e7ec;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 45px;
    font-size: 14px;
    padding: 8px 12px;
    gap: 6px;
  }
`;

const CategoryDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 180px;
  margin-top: 8px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
  max-height: 310px;
  overflow-y: auto;
`;

const CategoryOption = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;

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

  @media (max-width: 768px) {
    margin: 0;
    width: 100%;
    height: 45px;
    font-size: 14px;
    padding: 8px 20px;
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

const RecommendationsTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #101828;
  margin: 0 0 15px 0;
`;

const RecommendationsMessage = styled.div`
  color: #667085;
  font-size: 14px;
  text-align: center;
  padding: 20px;
  background: #F9FAFB;
  border: 1px solid #F2F4F7;
  border-radius: 8px;
  margin-bottom: 30px;
  line-height: 1.5;
`;

const PopularPostsTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #101828;
  margin: 0 0 15px 0;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 12px;
  }
`;

const DetailedPostsTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #101828;
  margin: 0 0 20px 0;

  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 15px;
  }
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

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const SidebarPostTitle = styled.h3`
  font-size: 15px;
  font-weight: 500;
  color: #1849A9;
  margin: 0 0 8px 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 6px;
  }
`;

const SidebarPostAuthor = styled.div`
  font-size: 12px;
  color: #667085;
  margin-bottom: 6px;
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

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const DetailedPostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;
    gap: 10px;
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
    loading: lazy;
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

const DetailedPostContent = styled.div`
  margin-bottom: 15px;
`;

const DetailedPostTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #1849A9;
  margin: 0 0 10px 0;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

const DetailedPostText = styled.p`
  font-size: 14px;
  color: #475467;
  line-height: 1.5;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 13px;
    line-height: 1.4;
  }
`;

const DetailedPostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  flex-wrap: wrap;
  gap: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const PostStatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: #667085;

  @media (max-width: 768px) {
    font-size: 11px;
    gap: 8px;
  }
`;

const DetailedPostComments = styled.div`
  /* Styles moved to PostStatsContainer, keep specific overrides if needed */
`;

const DetailedPostTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;

  @media (max-width: 768px) {
    gap: 4px;
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
  text-align: center;
  font-style: italic;
`;

// Helper function to get readable sort label
const getSortLabel = (option) => {
  switch (option) {
    case 'newest':
      return 'Newest';
    case 'oldest':
      return 'Oldest';
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
  border-radius: 30px;
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
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
  font-size: 24px;
  color: #667085;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f2f4f7;
  }
`;

const ModalBody = styled.div`
  padding: 24px 30px;
  flex-grow: 1;
  overflow-y: auto;
`;

const InputLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #555;
  margin-bottom: 8px;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #D0D5DD;
  border-radius: 30px;
  font-size: 1rem;
  margin-bottom: 20px;
  
  &:focus {
    outline: none;
    border-color: #223A70;
  }
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 10px 15px;
  border: 1px solid #d0d5dd;
  border-radius: 30px;
  font-size: 1rem;
  resize: none;
  margin-bottom: 15px;
  &:focus {
    outline: none;
    border-color: #223A70;
  }
`;

const CategorySelect = styled.select`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 1rem;
  margin-bottom: 15px;
  background-color: white;
  cursor: pointer;
  color: ${props => props.value === "" ? '#98a2b3' : '#101828'};
  appearance: none;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 15px top 50%;
  background-size: 12px auto;

  option:disabled {
    color: #98a2b3;
  }

  option {
    color: #223A70;
  }

  &:focus {
    outline: none;
    border-color: #223A70;
  }
`;

const SelectedFilesPreview = styled.div`
  margin-bottom: 15px;
`;

const FileList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 100px; // Limit height for many files
  overflow-y: auto; // Add scroll if needed
  border: 1px solid #e4e7ec;
  border-radius: 8px;
  padding: 8px;
`;

const FileItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #475467;
  padding: 4px 8px;
  background-color: #f9fafb;
  border-radius: 4px;
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FileName = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 10px;
`;

const RemoveFileButton = styled.button`
  background: none;
  border: none;
  color: #98a2b3;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;

  &:hover {
    color: #d92d20;
  }
`;

const ModalErrorMessage = styled.div`
  color: #d92d20;
  font-size: 13px;
  margin-top: 10px;
  text-align: center;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 30px;
  border-top: 1px solid #E4E7EC;
`;

const UploadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background-color: #f1f1f1;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e1e1e1;
  }

  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background-color: #223A70;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #192C54;
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const ForumLogo = styled.img.attrs({
  loading: 'lazy'
})`
  height: 130px;
  margin-left: auto;
  margin-top: -90px;
  position: absolute;
  right: -15px;
  z-index: 0;
  
  @media (max-width: 768px) {
    display: none;
  }
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

const ButtonSpinner = styled(Spinner)`
  width: 20px;
  height: 20px;
  border-width: 2px;
  border-top-color: white;
  border-left-color: white;
  border-bottom-color: white;
  margin: 0;
`;

// Add styles for success and general error messages
const SuccessMessage = styled.div`
  background-color: #e8f5e9; // Light green background
  color: #2e7d32; // Dark green text
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border-left: 5px solid #4caf50;
  font-weight: 500;
`;

const GeneralErrorMessage = styled(SuccessMessage)`
  background-color: #ffebee; // Light red background
  color: #c62828; // Dark red text
  border-left-color: #f44336;
`;

// Add new styled components for Review Modal
const ReviewModal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  min-width: 300px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const ReviewSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #1849A9;
  border-radius: 50%;
  animation: spin 1s linear infinite;
`;

const ReviewText = styled.p`
  margin: 0;
  color: ${props => props.type === "error" ? "#B42318" : "#101828"};
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`;

const ReviewErrorIcon = styled.div`
  font-size: 24px;
`;

export default Forum; 