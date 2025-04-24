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
  const [userSavedPosts, setUserSavedPosts] = useState([]);
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

  // Fetch forum data when page loads or refreshKey changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Get forum posts from backend
        const response = await axios.get(`https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/forum-posts`);
        
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
              userName: post.creatorName || 'Anonymous', // Revert back to creatorName
              userProfilePic: post.creatorProfilePic || defaultProfilePic, 
              isLiked: post.isLikedByUser || false, // Assume backend provides like status
              isSaved: post.isSavedByUser || false // Assume backend provides save status
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
    // Add refreshKey to dependency array
  }, [currentPage, refreshKey]);

  // Fetch saved posts for logged-in user
  useEffect(() => {
    const fetchSavedPosts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
          setUserSavedPosts([]); // Clear saved posts if not logged in
          return; 
      }

      try {
        const response = await axios.get('https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/users/me/saved-posts', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response && response.data) {
          // Format the saved posts (ensure necessary fields like creatorName are handled)
          const formattedSavedPosts = response.data.map(post => ({
            id: post.forumPostID,
            title: post.title,
            userName: post.creatorName || 'Anonymous', // Revert back to creatorName
            commentCount: post.commentCount || 0,
            likesCount: post.likesCount || 0,
          }));
          setUserSavedPosts(formattedSavedPosts);
        } else {
           setUserSavedPosts([]);
        }
      } catch (err) {
        console.error("Error fetching saved posts:", err);
        setUserSavedPosts([]); // Set empty on error
        // Optionally handle error display for saved posts section
      }
    };

    fetchSavedPosts();
  }, [refreshKey]); // Re-fetch when refreshKey changes (e.g., after save/unsave)

  // Fetch categories from backend and filter them
  useEffect(() => {
    const fetchAndFilterCategories = async () => {
      try {
        const response = await axios.get('https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/forum-categories');
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
    // Validate post data
    if (!newPostTitle.trim()) {
      setSubmitError('Please enter a title for your post');
      return;
    }
    if (!newPostContent.trim()) {
      setSubmitError('Please enter content for your post');
      return;
    }
    if (!newPostCategoryId) {
      setSubmitError('Please select a category for your post');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login', { state: { from: '/forum', message: 'Please log in to create a post' } });
        setIsSubmitting(false); // Ensure submitting state is reset
        return;
      }

      let response;
      // Check if files are selected
      if (selectedFiles.length > 0) {
        // Use FormData for multipart request
        const formData = new FormData();
        formData.append('title', newPostTitle);
        formData.append('description', newPostContent);
        formData.append('categoryId', newPostCategoryId);

        selectedFiles.forEach(file => {
          formData.append('mediaFiles', file);
        });

        // Send POST request to the /with-media endpoint
        response = await axios.post(
          'https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/forum-posts/with-media',
          formData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              // Content-Type is automatically set by axios for FormData
            }
          }
        );
      } else {
        // Use standard JSON request if no files
        const postData = {
          title: newPostTitle,
          description: newPostContent,
          categoryId: parseInt(newPostCategoryId) // Ensure categoryId is integer
        };

        // Send POST request to the standard endpoint
        response = await axios.post(
          'https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/forum-posts',
          postData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
      }

      if (response && (response.status === 200 || response.status === 201)) {
        // Post created successfully
        setShowCreateModal(false); // Close modal
        setIsSubmitting(false);

        // Set success message
        setSubmitSuccess('Forum post published successfully!');
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess('');
        }, 5000);

        // Refresh the posts list by incrementing the refreshKey
        setRefreshKey(prev => prev + 1);

      } else {
        // Handle unexpected success response
        setSubmitError(response.data?.message || 'Failed to create post. Unexpected response.');
        setIsSubmitting(false);
      }

    } catch (error) {
      console.error('Error creating post:', error);
      setIsSubmitting(false);
      if (error.response) {
        setSubmitError(error.response.data?.message || `Error: ${error.response.status}`);
      } else {
        setSubmitError('Failed to create post. Check connection or try again.');
      }
    }
  };

  // Handle like action
  const handleLikePost = async (postId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { from: '/forum', message: 'Please log in to like posts' } });
      return;
    }

    // --- Optimistic UI Update --- 
    // Helper function to update state immediately
    const updatePostInListOptimistic = (postList) => {
      return postList.map(post => {
        if (post.id === postId) {
          // Toggle like state and count immediately
          const isLiked = post.isLiked || false;
          return {
            ...post,
            isLiked: !isLiked,
            likesCount: isLiked ? (post.likesCount || 1) - 1 : (post.likesCount || 0) + 1
          };
        }
        return post;
      });
    };

    // Update state immediately
    setAllPosts(updatePostInListOptimistic(allPosts));
    setRecentForumPosts(updatePostInListOptimistic(recentForumPosts));
    setForumPosts(updatePostInListOptimistic(forumPosts));
    setSavedForumPosts(updatePostInListOptimistic(savedForumPosts)); // Ensure saved list is also updated if like affects it visually
    // -----------------------------

    // Perform API call in the background
    try {
      await axios.post(
        `https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/forum-posts/like/${postId}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      // No need to update state again here unless API returns new data we need

    } catch (error) {
      console.error('Error liking post (API call failed):', error);
      // **Important:** In a real app, revert the optimistic UI update here
      // For now, we just log the error
      // Example revert (would need previous state or refetch):
      // setAllPosts(previousAllPostsState);
      // setRecentForumPosts(previousRecentPostsState);
      // setForumPosts(previousForumPostsState);
      // setSavedForumPosts(previousSavedPostsState);
    }
  };

  // Handle save action
  const handleSavePost = async (postId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { from: '/forum', message: 'Please log in to save posts' } });
      return;
    }

    // --- Optimistic UI Update --- 
    // Helper function to update state immediately
    const updatePostInListOptimisticSave = (postList) => {
      return postList.map(post => {
        if (post.id === postId) {
          // Toggle saved state immediately
          const isSaved = post.isSaved || false;
          return {
            ...post,
            isSaved: !isSaved
          };
        }
        return post;
      });
    };

    // Update state immediately
    setAllPosts(updatePostInListOptimisticSave(allPosts));
    setRecentForumPosts(updatePostInListOptimisticSave(recentForumPosts));
    setForumPosts(updatePostInListOptimisticSave(forumPosts));

    // Also update the dedicated saved posts list optimistically
    const postToUpdate = allPosts.find(p => p.id === postId); // Find the post
    if(postToUpdate) {
        const isCurrentlySaved = postToUpdate.isSaved || false;
        if (!isCurrentlySaved) { // If it was *not* saved, now it is, so remove from list
             setSavedForumPosts(savedForumPosts.filter(p => p.id !== postId));
        } else { // If it *was* saved, now it is not, so add it back (if not already present)
            if (!savedForumPosts.some(p => p.id === postId)) {
                setSavedForumPosts([...savedForumPosts, { ...postToUpdate, isSaved: true }]); // Add with isSaved=true because we just toggled it to false in main lists
            }
        }
    }
    // -----------------------------

    // Perform API call in the background
    try {
      await axios.post(
        `https://closed-merola-deveracankaya-2f4e22df.koyeb.app/api/v1/forum-posts/${postId}/save`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      // No need to update state again here

    } catch (error) {
      console.error('Error saving post (API call failed):', error);
      // **Important:** In a real app, revert the optimistic UI update here
      // Example revert would be more complex for save state
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
            <PopularPostsTitle>Popular Forum Posts</PopularPostsTitle>
            <SidebarPostsList>
              {forumPosts.length > 0 ? (
                forumPosts.map((post) => (
                  <SidebarPostItem key={post.id} onClick={() => navigate(`/forum/post/${post.id}`)}>
                    <SidebarPostTitle>{post.title}</SidebarPostTitle>
                    <SidebarPostAuthor>
                      {/* {post.userName} */}
                      {post.userName /* This now uses creatorName again */}
                    </SidebarPostAuthor>
                    <SidebarPostStats>
                      <span>{post.commentCount} comments</span> • <span>{post.likesCount} likes</span>
                    </SidebarPostStats>
                  </SidebarPostItem>
                ))
              ) : (
                <EmptyStateMessage style={{ padding: '20px 0' }}>No popular posts yet</EmptyStateMessage>
              )}
            </SidebarPostsList>
            
            <SavedPostsTitle>Saved Forum Posts</SavedPostsTitle>
            <SidebarPostsList>
              {userSavedPosts.length > 0 ? (
                userSavedPosts.map((post) => (
                  <SidebarPostItem key={`saved-${post.id}`} onClick={() => navigate(`/forum/post/${post.id}`)}>
                    <SidebarPostTitle>{post.title}</SidebarPostTitle>
                    <SidebarPostAuthor>
                      {/* {post.userName} */}
                       {post.userName /* This now uses creatorName again */}
                    </SidebarPostAuthor>
                    <SidebarPostStats>
                      <span>{post.commentCount} comments</span> • <span>{post.likesCount} likes</span>
                    </SidebarPostStats>
                  </SidebarPostItem>
                ))
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <EmptyStateMessage style={{ padding: '20px 0' }}>No saved posts yet</EmptyStateMessage>
                </div>
              )}
              {userSavedPosts.length > 0 && <ViewAllLink onClick={() => navigate('/forum/saved')}>View All</ViewAllLink>}
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
                            {/* {post.userName} */}
                            {post.userName /* This now uses creatorName again */}
                          </DetailedPostAuthorName>
                          <DetailedPostTime>{post.timeAgo}</DetailedPostTime>
                        </DetailedPostAuthorInfo>
                      </DetailedPostAuthorSection>

                      {/* Container for buttons on the right */}
                      <HeaderActions>
                        {/* Like Display (Non-interactive) - MOVED TO FOOTER */}
                        {/* 
                        <LikeDisplay>
                          <FiHeart size={16} color="#667085" />
                          <span>{post.likesCount}</span>
                        </LikeDisplay> 
                        */}

                        {/* Save Button (Interactive) */}
                        <SaveButton onClick={(e) => {
                          e.stopPropagation();
                          handleSavePost(post.id);
                        }}>
                          {post.isSaved ? <FiBookmark size={16} fill="#1E40AF" color="#1E40AF" /> : <FiBookmark size={16} />}
                        </SaveButton>
                      </HeaderActions>
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
                      {/* NEW: Container for stats (likes and comments) */}
                      <PostStatsContainer>
                        {/* Comments count first */}
                        <DetailedPostComments>
                          {post.commentCount} comment{post.commentCount !== 1 ? 's' : ''}
                        </DetailedPostComments>
                        
                        {/* Likes count second */}
                        <LikeDisplay>
                          <FiHeart size={16} color="#667085" />
                          <span>{post.likesCount}</span>
                        </LikeDisplay>
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

const SidebarPostTitle = styled.h3`
  font-size: 15px;
  font-weight: 500;
  color: #1849A9;
  margin: 0 0 8px 0;
  line-height: 1.3;
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
    align-items: center;
    margin-top: 15px;
    flex-wrap: wrap;
    gap: 15px;
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

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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
  justify-content: space-between; /* Keeps stats left, tags right */
  align-items: center;
  margin-top: 15px;
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
  gap: 15px; /* Add gap between lines if wrapping */
`;

// NEW: Container for stats
const PostStatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px; /* Space between likes and comments */
  font-size: 12px;
  color: #667085;
`;

const DetailedPostComments = styled.div`
  /* Styles moved to PostStatsContainer, keep specific overrides if needed */
`;

const DetailedPostTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

// Style for the non-interactive like display (Now used in Footer)
const LikeDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: inherit; /* Inherit size from container */
  color: inherit; /* Inherit color from container */
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
    margin: 5px auto;
    height: 150px;
    position: relative;
    right: auto;
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
`;

const SaveButton = styled.button`
  background: none;
  border: none;
  color: #667085;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  border-radius: 50%;
  transition: background-color 0.2s ease, transform 0.1s ease;
  
  &:hover {
    background-color: #f2f4f7;
  }

  &:active {
    transform: scale(0.85);
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

export default Forum; 