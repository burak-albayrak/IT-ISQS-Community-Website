import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Blog.css';
import BlogService from '../services/BlogService';

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
  const navigate = useNavigate();

  // Blog verileri için sayfa yüklendiğinde çalışacak efekt
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Kategorileri getir
        const categoriesResponse = await BlogService.getAllCategories();
        setCategories(categoriesResponse.data);

        // Son eklenen blogları getir
        const recentResponse = await BlogService.getRecentBlogs();
        setRecentBlogPosts(recentResponse.data);

        // Tüm blogları getir (sayfalı)
        const allBlogsResponse = await BlogService.getAllBlogs(currentPage);
        setAllBlogPosts(allBlogsResponse.data.content);
        setTotalPages(allBlogsResponse.data.totalPages);
        
        setLoading(false);
      } catch (err) {
        console.error("Blog verilerini getirirken hata oluştu:", err);
        setError("Blog verileri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
        setLoading(false);

        // Şu anda mock verilerle devam et (backend hazır olmadığında)
        setRecentBlogPosts([
          {
            id: 1,
            title: 'UX review presentations',
            summary: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
            author: 'Olivia Rhye',
            date: '1 Jan 2023',
            categories: ['Design', 'Research', 'Presentation'],
            imageUrl: '/images/blog/empty-office.jpg'
          },
          {
            id: 2,
            title: 'Migrating to Linear 101',
            summary: 'Linear helps streamline software projects, sprints, tasks, and bug tracking. Here\'s how to get started.',
            author: 'Phoenix Baker',
            date: '1 Jan 2023',
            categories: ['Design', 'Research'],
            imageUrl: '/images/blog/team-meeting.jpg'
          },
          {
            id: 3,
            title: 'Building your API Stack',
            summary: 'The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing...',
            author: 'Lana Steiner',
            date: '1 Jan 2023',
            categories: ['Design', 'Research'],
            imageUrl: '/images/blog/desk-setup.jpg'
          }
        ]);

        setAllBlogPosts([
          {
            id: 4,
            title: 'Bill Walsh leadership lessons',
            summary: 'Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?',
            author: 'Alec Whitten',
            date: '1 Jan 2023',
            categories: ['Leadership', 'Management'],
            imageUrl: '/images/blog/mountain.jpg'
          },
          {
            id: 5,
            title: 'PM mental models',
            summary: 'Mental models are simple expressions of complex processes or relationships.',
            author: 'Demi Wilkinson',
            date: '1 Jan 2023',
            categories: ['Product', 'Research', 'Frameworks'],
            imageUrl: '/images/blog/brainstorming.jpg'
          },
          {
            id: 6,
            title: 'What is Wireframing?',
            summary: 'Introduction to Wireframing and its Principles. Learn from the best in the industry.',
            author: 'Candice Wu',
            date: '1 Jan 2023',
            categories: ['Design', 'Research'],
            imageUrl: '/images/blog/desk-setup-2.jpg'
          },
          {
            id: 7,
            title: 'How collaboration makes us better designers',
            summary: 'Collaboration can make our teams stronger, and our individual designs better.',
            author: 'Natali Craig',
            date: '1 Jan 2023',
            categories: ['Design', 'Research'],
            imageUrl: '/images/blog/whiteboard.jpg'
          },
          {
            id: 8,
            title: 'Our top 10 Javascript frameworks to use',
            summary: 'JavaScript frameworks make development easy with extensive features and functionalities.',
            author: 'Drew Cano',
            date: '1 Jan 2023',
            categories: ['Software Development', 'Tools', 'SaaS'],
            imageUrl: '/images/blog/laptop-work.jpg'
          },
          {
            id: 9,
            title: 'Podcast: Creating a better CX Community',
            summary: 'Starting a community doesn\'t need to be complicated, but how do you get started?',
            author: 'Orlando Diggs',
            date: '1 Jan 2023',
            categories: ['Podcasts', 'Customer Success'],
            imageUrl: '/images/blog/laptop-bed.jpg'
          }
        ]);
        
        setCategories(['Design', 'Research', 'Product', 'Development', 'Leadership']);
      }
    };

    fetchData();
  }, [currentPage]);

  // Sayfa değiştiğinde çalışacak fonksiyon
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const response = await BlogService.searchBlogs(searchQuery);
      setAllBlogPosts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error("Blog araması yaparken hata oluştu:", err);
      setError("Arama sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    }
  };

  const handleCategoryChange = async (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (!category) {
      // Kategori seçilmemişse, tüm blogları göster
      try {
        const response = await BlogService.getAllBlogs(0);
        setAllBlogPosts(response.data.content);
        setTotalPages(response.data.totalPages);
        setCurrentPage(0);
      } catch (err) {
        console.error("Blogları getirirken hata oluştu:", err);
      }
      return;
    }

    // Seçilen kategoriye göre blogları getir
    try {
      const response = await BlogService.getBlogsByCategory(category, 0);
      setAllBlogPosts(response.data.content);
      setTotalPages(response.data.totalPages);
      setCurrentPage(0);
    } catch (err) {
      console.error("Kategori filtrelemesi yaparken hata oluştu:", err);
      setError("Kategori filtrelemesi sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    }
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
      return `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}${blog.imageUrl}`;
    }
    
    // Base64 kodlu bir görsel ise
    if (blog.imageData) {
      return `data:image/${blog.imageType || 'jpeg'};base64,${blog.imageData}`;
    }

    // Varsayılan görsel
    return '/images/blog/default-blog-image.jpg';
  };

  if (loading) {
    return (
      <BlogContainer>
        <Loading>Yükleniyor...</Loading>
      </BlogContainer>
    );
  }

  if (error) {
    return (
      <BlogContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </BlogContainer>
    );
  }

  return (
    <BlogContainer>
      <Banner>
        <BannerContent>
          <BannerTitle>Shaping the Future: Research and Industry Perspectives</BannerTitle>
          <BannerImage className="banner-image" src="/images/blog/glasses.png" alt="Blog Banner" />
        </BannerContent>
      </Banner>

      <SearchSection>
        <SearchForm onSubmit={handleSearch}>
          <SearchInput 
            type="text" 
            placeholder="Search in Blogs" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon>
            <FiSearch />
          </SearchIcon>
        </SearchForm>
        <Separator>|</Separator>
        <CategorySelect 
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </CategorySelect>
      </SearchSection>

      <BlogSection>
        <SectionTitle>Recently added blog post</SectionTitle>
        <RecentPostsGrid>
          {recentBlogPosts.map((post, index) => (
            <BlogCard 
              key={post.id} 
              featured={index === 0}
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
                    <CategoryTag key={idx}>{category}</CategoryTag>
                  ))}
                </CategoryTags>
                {index === 0 && <ReadMoreIcon><FiArrowRight /></ReadMoreIcon>}
              </BlogCardContent>
            </BlogCard>
          ))}
        </RecentPostsGrid>
      </BlogSection>

      <BlogSection>
        <SectionTitle>All blog posts</SectionTitle>
        <AllPostsGrid>
          {allBlogPosts.map((post) => (
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
                    <CategoryTag key={idx}>{category}</CategoryTag>
                  ))}
                </CategoryTags>
                <ReadMoreIcon><FiArrowRight /></ReadMoreIcon>
              </BlogCardContent>
            </BlogCard>
          ))}
        </AllPostsGrid>
      </BlogSection>

      <Pagination>
        <PaginationLink 
          to="#" 
          className="prev" 
          onClick={() => handlePageChange(currentPage - 1)}
          style={{ visibility: currentPage > 0 ? 'visible' : 'hidden' }}
        >
          ← Previous
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
          Next →
        </PaginationLink>
      </Pagination>
    </BlogContainer>
  );
};

// Styled Components
const BlogContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Banner = styled.div`
  margin: 40px 0;
  padding: 20px;
  background-color: #f5f7ff;
  border-radius: 8px;
`;

const BannerContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BannerTitle = styled.h1`
  font-size: 32px;
  font-weight: 600;
  max-width: 60%;
  color: #101828;
`;

const BannerImage = styled.img`
  max-width: 200px;
  height: auto;
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0;
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 8px 16px;
`;

const SearchForm = styled.form`
  position: relative;
  flex: 1;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 10px 10px 35px;
  border: none;
  background: transparent;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #667085;
`;

const Separator = styled.span`
  color: #d0d5dd;
  margin: 0 10px;
`;

const CategorySelect = styled.select`
  padding: 10px;
  border: none;
  background: transparent;
  font-size: 16px;
  color: #667085;
  &:focus {
    outline: none;
  }
`;

const BlogSection = styled.section`
  margin: 40px 0;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #101828;
`;

const RecentPostsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AllPostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BlogCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(16, 24, 40, 0.1);
  }
  
  ${({ featured }) => featured && `
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
  `}
`;

const BlogCardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const BlogCardContent = styled.div`
  padding: 20px;
  position: relative;
`;

const BlogAuthor = styled.p`
  font-size: 14px;
  color: #667085;
  margin-bottom: 8px;
`;

const BlogTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #101828;
`;

const BlogSummary = styled.p`
  font-size: 16px;
  color: #667085;
  margin-bottom: 16px;
  line-height: 1.5;
`;

const CategoryTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
`;

const CategoryTag = styled.span`
  font-size: 14px;
  color: #6941C6;
  background-color: #F9F5FF;
  padding: 4px 10px;
  border-radius: 16px;
`;

const ReadMoreIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #6941C6;
  font-size: 20px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0;
`;

const PaginationLink = styled(Link)`
  color: #667085;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    color: #6941C6;
  }
`;

const PageNumbers = styled.div`
  display: flex;
  gap: 4px;
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
  
  &.active {
    background-color: #F9F5FF;
    color: #6941C6;
    font-weight: 500;
  }
  
  &:hover:not(.active) {
    background-color: #F2F4F7;
  }
`;

const Loading = styled.div`
  text-align: center;
  font-size: 18px;
  color: #667085;
  padding: 60px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: #F04438;
  padding: 60px;
`;

export default Blog; 