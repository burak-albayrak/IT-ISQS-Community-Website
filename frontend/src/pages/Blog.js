import React, { useState, useEffect, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FiSearch, FiArrowRight, FiFilter, FiChevronDown } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Blog.css';
import BlogService from '../services/BlogService';
import axios from 'axios';
import defaultBlogImage from '../assets/defaultblog.png';
import blogBannerLogo from '../assets/blog-banner.png';
import api from '../services/api';

// Global stil ekleyerek, tüm sayfa için geçerli olacak stilleri tanımlayalım
const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    width: 100%;
  }
`;

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [recentBlogPosts, setRecentBlogPosts] = useState([]);
  const [allBlogPosts, setAllBlogPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('newest');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const sortRef = useRef(null);
  const navigate = useNavigate();

  // Add category states similar to Forum.js
  const [backendCategories, setBackendCategories] = useState([]); // State for ALL categories fetched from backend
  const [categoryColorMap, setCategoryColorMap] = useState({}); // State for category color map
  const [displayCategories, setDisplayCategories] = useState([]); // State for filtered categories to display in dropdown
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const categoryRef = useRef(null);

  // Define allowed category names for blogs (Adjust as needed)
  // Assuming same categories as Forum for now
  const allowedBlogCategoryNames = [
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

  // Blog verileri için sayfa yüklendiğinde çalışacak efekt
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await BlogService.getAllBlogs();
        
        if (response && response.data) {
          // If backend data is returned
          const blogs = response.data;
          
          if (blogs.length > 0) {
            // Sort blogs by createdAt date (newest first)
            const sortedBlogs = [...blogs].sort((a, b) => {
              const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
              const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
              return dateB - dateA; // Newest first
            });
            
            // Take most recent 3 blogs for the featured section
            const recentBlogs = sortedBlogs.slice(0, 3).map(blog => ({
              id: blog.blogID,
              title: blog.title,
              summary: blog.description.substring(0, 150) + '...',
              categories: [blog.category || 'Uncategorized'],
              date: blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
              author: blog.owner || blog.createdBy || 'Anonymous',
              imageUrl: blog.media || '' // Boş string bırak, null ise varsayılan resim kullanılacak
            }));
            setRecentBlogPosts(recentBlogs);
            
            // Format all blogs for display
            const formattedBlogs = sortedBlogs.map(blog => ({
              id: blog.blogID,
              title: blog.title,
              summary: blog.description.substring(0, 150) + '...',
              categories: [blog.category || 'Uncategorized'],
              date: blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
              author: blog.owner || blog.createdBy || 'Anonymous',
              imageUrl: blog.media || '' // Boş string bırak, null ise varsayılan resim kullanılacak
            }));
            
            setAllBlogPosts(formattedBlogs);
            
            // Extract categories from blogs
            const uniqueCategories = [...new Set(blogs
              .map(blog => blog.category)
              .filter(category => category)
            )];
            
            if (uniqueCategories.length > 0) {
              setCategories(uniqueCategories);
            } else {
              setCategories(['Uncategorized']);
            }
            
            // Set pagination
            setTotalPages(Math.ceil(blogs.length / 9));
          } else {
            // No blogs found
            setError("No blog posts available yet.");
            setRecentBlogPosts([]);
            setAllBlogPosts([]);
            setCategories(['Uncategorized']);
            setTotalPages(0);
          }
        } else {
          throw new Error('Invalid response format');
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error while fetching blog data:", err);
        setError("An error occurred while loading blog data. Please try again later.");
        setRecentBlogPosts([]);
        setAllBlogPosts([]);
        setCategories(['Uncategorized']);
        setTotalPages(0);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  // Fetch categories from backend and filter them (Copied from Forum.js)
  useEffect(() => {
    const fetchAndFilterCategories = async () => {
      try {
        const response = await api.get('/forum-categories'); 
        let fetchedCategories = [];
        if (response && response.data) {
          fetchedCategories = response.data;
          setBackendCategories(fetchedCategories);

          const colorMap = fetchedCategories.reduce((acc, category) => {
            if (category.name && category.color) {
              acc[category.name] = category.color;
            }
            return acc;
          }, {});
          setCategoryColorMap(colorMap);

        } else {
          setBackendCategories([]);
          setCategoryColorMap({});
        }

        // Filter fetched categories based on the allowed names for blogs
        const filtered = fetchedCategories.filter(category =>
          allowedBlogCategoryNames.includes(category.name)
        );

        // Sort the filtered categories alphabetically by name for display
        filtered.sort((a, b) => a.name.localeCompare(b.name));

        setDisplayCategories(filtered);

      } catch (error) {
        console.error('Error fetching or filtering categories for blog:', error);
        setBackendCategories([]);
        setDisplayCategories([]);
        setCategoryColorMap({});
      }
    };

    fetchAndFilterCategories();
  }, []); // Fetch categories once when component mounts

  // Dropdown dışına tıklayınca kapanmasını sağlayan effect (Updated to include categoryRef)
  useEffect(() => {
    function handleClickOutside(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSortDropdown(false);
      }
      // Add check for category dropdown
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sortRef, categoryRef]); // Add categoryRef dependency

  // Sayfa değiştiğinde çalışacak fonksiyon
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const response = await BlogService.getAllBlogs();
      
      if (response && response.data) {
        const blogs = response.data;
        
        // Filter blogs by search query
        const filteredBlogs = blogs.filter(blog => {
          const searchLower = searchQuery.toLowerCase();
          return (
            (blog.title && blog.title.toLowerCase().includes(searchLower)) ||
            (blog.description && blog.description.toLowerCase().includes(searchLower)) ||
            (blog.category && blog.category.toLowerCase().includes(searchLower)) ||
            (blog.owner && blog.owner.toLowerCase().includes(searchLower)) ||
            (blog.createdBy && blog.createdBy.toLowerCase().includes(searchLower))
          );
        });
        
        if (filteredBlogs.length === 0) {
          setError("No blogs found matching your search criteria.");
        } else {
          setError(null);
        }
        
        // Format the filtered blogs
        const formattedBlogs = filteredBlogs.map(blog => ({
          id: blog.blogID,
          title: blog.title,
          summary: blog.description.substring(0, 150) + '...',
          categories: [blog.category || 'Uncategorized'],
          date: blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
          author: blog.owner || blog.createdBy || 'Anonymous',
          imageUrl: blog.media
        }));
        
        setAllBlogPosts(formattedBlogs);
        setTotalPages(Math.ceil(formattedBlogs.length / 10));
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error("An error occurred while searching for a blog:", err);
      setError("An error occurred while searching. Please try again later.");
    }
  };

  // Update handleCategoryChange to check for empty results and set error
  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);
    setShowCategoryDropdown(false); // Close dropdown after selection

    // Check if filtering by this category yields results
    const filteredPosts = allBlogPosts.filter(post => 
      !categoryName || (post.categories && post.categories.includes(categoryName))
    );

    if (categoryName && filteredPosts.length === 0) {
      // Set error if a category is selected and no posts are found
      setError(`No blogs found in the "${categoryName}" category.`);
    } else {
      // Clear error if "All Categories" is selected or if the selected category has posts
      setError(null); 
    }

    // Reset pagination to the first page when category changes
    setCurrentPage(0);
  };

  const handleBlogClick = (postId) => {
    navigate(`/blog/${postId}`);
  };

  // Resim URL'sini kontrol edip, gerekirse varsayılan resme döndüren yardımcı fonksiyon
  const getImageUrl = (blog) => {
    // Backend'den gelen görsel URL'si
    if (blog.imageUrl) {
      // Eğer tam URL ise (http veya https ile başlıyorsa) doğrudan kullan
      if (blog.imageUrl.startsWith('http')) {
        return blog.imageUrl;
      }
      // Eğer statik bir referans ise API_URL'ye eklenebilir
      return `${api.defaults.baseURL}${blog.imageUrl}`;
    }
    
    // Base64 kodlu bir görsel ise
    if (blog.imageData) {
      return `data:image/${blog.imageType || 'jpeg'};base64,${blog.imageData}`;
    }

    // Varsayılan görsel - assets klasöründeki defaultblog.png
    return defaultBlogImage;
  };

  // Sıralama seçeneği değiştiğinde çalışacak fonksiyon
  const handleSortChange = (option) => {
    setSortOption(option);
    setShowSortDropdown(false);
    
    // Mevcut blogları sıralama seçeneğine göre sırala
    const sortedBlogs = [...allBlogPosts].sort((a, b) => {
      switch (option) {
        case 'newest':
          return new Date(b.date) - new Date(a.date);
        case 'oldest':
          return new Date(a.date) - new Date(b.date);
        case 'a-z':
          return a.title.localeCompare(b.title);
        case 'z-a':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
    
    setAllBlogPosts(sortedBlogs);
  };

  if (loading) {
    return (
      <BlogContainer>
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      </BlogContainer>
    );
  }

  return (
    <>
      <GlobalStyle />
      <FullWidthBanner>
    <BlogContainer>
          <BannerTitle>Shaping the Future: Research and Industry Perspectives</BannerTitle>
        </BlogContainer>
      </FullWidthBanner>

      <BlogContainer style={{ marginTop: "30px" }}>
      <SearchSection>
          <SearchFormContainer onSubmit={handleSearch}>
            <SearchIcon>
              <FiSearch />
            </SearchIcon>
          <SearchInput 
            type="text" 
            placeholder="Search in Blogs" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          </SearchFormContainer>
          
          <SortButtonContainer ref={sortRef}>
            <SortButton onClick={() => setShowSortDropdown(!showSortDropdown)}>
              <FiFilter />
              <span>Sort</span>
              <FiChevronDown />
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
                  selected={sortOption === 'a-z'} 
                  onClick={() => handleSortChange('a-z')}
                >
                  A-Z
                </SortOption>
                <SortOption 
                  selected={sortOption === 'z-a'} 
                  onClick={() => handleSortChange('z-a')}
                >
                  Z-A
                </SortOption>
              </SortDropdown>
            )}
          </SortButtonContainer>
          
          {/* Use the renamed CustomCategorySelectContainer */}
          <CustomCategorySelectContainer ref={categoryRef}>
            <CategoryButton onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}>
              <span>{selectedCategory || 'Categories'}</span> 
              <FiChevronDown size={16} />
            </CategoryButton>
            
            {showCategoryDropdown && (
              <CategoryDropdown>
                <CategoryOption 
                  selected={selectedCategory === ''} 
                  onClick={() => handleCategoryChange('')}
                >
                  All Categories
                </CategoryOption>
                {displayCategories.map((category) => (
                  <CategoryOption 
                    key={category.categoryId} 
                    selected={selectedCategory === category.name}
                    onClick={() => handleCategoryChange(category.name)}
                  >
                    {category.name}
                  </CategoryOption>
                ))}
              </CategoryDropdown>
            )}
          </CustomCategorySelectContainer>
          
          <BlogLogo src={blogBannerLogo} alt="Blog Logo" />
      </SearchSection>

      {/* Conditionally render the Recent Blogs Section - Added !error check */}
      {sortOption === 'newest' && !selectedCategory && !searchQuery.trim() && !error && (
        <BlogSection>
            <SectionTitle>Recently added blog posts</SectionTitle>
            <RecentBlogsGrid>
              {recentBlogPosts.length > 0 && (
                <FeaturedBlog onClick={() => handleBlogClick(recentBlogPosts[0].id)}>
                  <FeaturedBlogImage src={getImageUrl(recentBlogPosts[0])} alt={recentBlogPosts[0].title} />
                  <FeaturedBlogContent>
                    <FeaturedBlogAuthor>{recentBlogPosts[0].author} • {recentBlogPosts[0].date}</FeaturedBlogAuthor>
                    <FeaturedBlogTitle>{recentBlogPosts[0].title}</FeaturedBlogTitle>
                    <FeaturedBlogDescription>{recentBlogPosts[0].summary}</FeaturedBlogDescription>
                    <CategoryTags>
                      {recentBlogPosts[0].categories && recentBlogPosts[0].categories.map((category, idx) => (
                        <CategoryTag key={idx} $categoryColor={categoryColorMap[category] || null}>
                          {category}
                        </CategoryTag>
                      ))}
                    </CategoryTags>
                  </FeaturedBlogContent>
                </FeaturedBlog>
              )}
              
              <SideBlogsContainer>
                {recentBlogPosts.slice(1, 3).map((blog) => (
                  <SideBlog key={blog.id} onClick={() => handleBlogClick(blog.id)}>
                    <SideBlogImage src={getImageUrl(blog)} alt={blog.title} />
                    <SideBlogContent>
                      <SideBlogAuthor>{blog.author} • {blog.date}</SideBlogAuthor>
                      <SideBlogTitle>{blog.title}</SideBlogTitle>
                      <SideBlogDescription>{blog.summary}</SideBlogDescription>
                      <CategoryTags>
                        {blog.categories && blog.categories.map((category, idx) => (
                          <CategoryTag key={idx} $categoryColor={categoryColorMap[category] || null}>
                            {category}
                          </CategoryTag>
                        ))}
                      </CategoryTags>
                    </SideBlogContent>
                  </SideBlog>
                ))}
              </SideBlogsContainer>
            </RecentBlogsGrid>
        </BlogSection>
      )}
      {/* End of Conditional Rendering */}

      <BlogSection>
        <SectionTitle>All blog posts</SectionTitle>
        {/* Show error message if error state is set, otherwise show grid */}
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <AllPostsGrid>
            {/* Filter allBlogPosts based on selectedCategory before mapping */}
            {allBlogPosts
              .filter(post => !selectedCategory || (post.categories && post.categories.includes(selectedCategory)))
              // Add pagination logic here if needed for client-side filtering
              .slice(currentPage * 9, (currentPage + 1) * 9) // Example pagination slice
              .map((post) => (
              <BlogCard 
                key={post.id}
                onClick={() => handleBlogClick(post.id)}
              >
                <BlogCardImage 
                  className="blog-card-image" 
                  src={getImageUrl(post)} 
                  alt={post.title} 
                />
                <BlogCardContent>
                  <BlogAuthor>{post.author} • {post.date}</BlogAuthor>
                  <BlogTitle>{post.title}</BlogTitle>
                  <BlogSummary>{post.summary}</BlogSummary>
                  <CategoryTags>
                    {post.categories.map((category, idx) => (
                      <CategoryTag key={idx} $categoryColor={categoryColorMap[category] || null}>
                        {category}
                      </CategoryTag>
                    ))}
                  </CategoryTags>
                </BlogCardContent>
              </BlogCard>
            ))}
          </AllPostsGrid>
        )}
      </BlogSection>

      {/* Conditionally render Pagination only if there is no error and there are posts to paginate */}
      {!error && allBlogPosts.filter(post => !selectedCategory || (post.categories && post.categories.includes(selectedCategory))).length > 0 && (
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
      )}
    </BlogContainer>
    </>
  );
};

// Styled Components
const BlogContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
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

const ContentWrapper = styled.div`
  padding-top: 20px;
`;

const BannerTitle = styled.h1`
  font-size: 26px;
  font-weight: 550;
  color: #101828;
  margin: 0;
  max-width: 1000px;

  @media (max-width: 768px) {
    font-size: 20px;
    padding: 0 10px;
  }
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 30px 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    margin: 20px 0;

    /* Create a container for Sort and Categories buttons */
    & > form {
      order: 1;
      margin-bottom: 10px;
    }

    & > div:last-child {
      order: 3;
    }

    /* Container for Sort and Categories buttons */
    & > div:not(:last-child) {
      order: 2;
      display: flex;
      gap: 8px;
      margin-bottom: 10px;
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
    margin: 0;
    flex: 1;
  }
`;

const SortButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background-color: #f2f4f7;
  border: none;
  border-radius: 25px;
  padding: 10px 16px;
  height: 39px;
  color: #667085;
  font-size: 15px;
  cursor: pointer;
  white-space: nowrap;
  
  &:hover {
    background-color: #e4e7ec;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
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

const CustomCategorySelectContainer = styled.div`
  position: relative;
  margin: 0 4px;

  @media (max-width: 768px) {
    margin: 0;
    flex: 1;
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
  padding: 8px 10px;
  height: 39px;
  color: #667085;
  font-size: 15px;
  cursor: pointer;
  min-width: 130px;
  
  &:hover {
    background-color: #e4e7ec;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: unset;
    justify-content: center;
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
  max-height: 310px; // Match Forum.js
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

const BlogSection = styled.section`
  margin: 40px 0;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #101828;
  position: relative;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #E4E7EC;

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 8px;
    padding-bottom: 8px;
  }
`;

const RecentBlogsGrid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1.25fr;
  gap: 28px;
  margin-top: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const AllPostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 24px;
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(16, 24, 40, 0.1);
  }

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const BlogCardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 180px;
  }
`;

const BlogCardContent = styled.div`
  padding: 20px;
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const BlogAuthor = styled.p`
  font-size: 14px;
  color: #667085;
  margin-bottom: 8px;
`;

const BlogTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #101828;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const BlogSummary = styled.p`
  font-size: 16px;
  color: #667085;
  margin-bottom: 16px;
  line-height: 1.5;
  flex-grow: 1;
  min-height: 72px;
  
  ${({ short }) => short && `
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 8px;
    min-height: 60px;
  `}

  @media (max-width: 768px) {
    font-size: 14px;
    min-height: 60px;
    margin-bottom: 12px;
  }
`;

const CategoryTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: auto;

  @media (max-width: 768px) {
    gap: 4px;
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

const Loading = styled.div`
  text-align: center;
  font-size: 18px;
  color: #667085;
  padding: 60px;
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
  font-size: 18px;
  color: #F04438;
  padding: 60px;
`;

const BlogLogo = styled.img`
  height: 200px;
  margin-left: auto;
  margin-top: -120px;
  position: absolute;
  right: -100px;
  z-index: 0;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const FeaturedBlog = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  border: 1px solid #E4E7EC;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 4px 8px rgba(16, 24, 40, 0.1);
    transform: translateY(-4px);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
`;

const FeaturedBlogImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-bottom: 1px solid #E4E7EC;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const FeaturedBlogContent = styled.div`
  padding: 24px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const FeaturedBlogAuthor = styled.div`
  font-size: 14px;
  color: #667085;
  margin-bottom: 8px;
`;

const FeaturedBlogTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: #101828;
  margin-bottom: 10px;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const FeaturedBlogDescription = styled.p`
  font-size: 15px;
  color: #475467;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 14px;
    -webkit-line-clamp: 2;
  }
`;

const SideBlog = styled.div`
  position: relative;
  cursor: pointer;
  margin-bottom: 14px;
  padding: 18px 18px 18px 240px;
  border: 1px solid #E4E7EC;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
  min-height: 230px;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover {
    box-shadow: 0 4px 8px rgba(16, 24, 40, 0.1);
    transform: translateY(-4px);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  @media (max-width: 768px) {
    padding: 0;
    min-height: auto;
  }
`;

const SideBlogImage = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 220px;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  border-right: 1px solid #E4E7EC;

  @media (max-width: 768px) {
    position: relative;
    width: 100%;
    height: 200px;
    border-radius: 12px 12px 0 0;
    border-right: none;
  }
`;

const SideBlogContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  gap: 8px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const SideBlogAuthor = styled.div`
  font-size: 14px;
  color: #667085;
  margin-bottom: 8px;
`;

const SideBlogTitle = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: #101828;
  margin-bottom: 6px;
  line-height: 1.3;
`;

const SideBlogDescription = styled.p`
  font-size: 15px;
  color: #475467;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 6px;
`;

const SideBlogsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  height: 100%;
`;

export default Blog; 
