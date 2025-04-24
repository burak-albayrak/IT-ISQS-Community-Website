import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiArrowLeft, FiClock, FiUser, FiCalendar } from 'react-icons/fi';
import '../styles/Blog.css';
import BlogService from '../services/BlogService';
import defaultBlogImage from '../assets/defaultblog.png';
import axios from 'axios';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryColorMap, setCategoryColorMap] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Blog detaylarını getir
        const blogResponse = await BlogService.getBlogById(id);
        const blogData = blogResponse.data;
        
        // Ensure categories exists
        if (!blogData.categories) {
          blogData.categories = blogData.category ? [blogData.category] : [];
        }
        
        // Tarih ve açıklama kontrolü
        if (!blogData.date && blogData.createdAt) {
          blogData.date = new Date(blogData.createdAt).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          });
        }
        
        setBlog(blogData);

        // En son blogları getir
        const recentResponse = await BlogService.getRecentBlogs(4);
        const recentData = recentResponse.data.filter(blog => blog.blogID !== parseInt(id)).slice(0, 3);
        
        // Ensure categories exists for each recent blog
        const formattedRecentBlogs = recentData.map(blog => {
          // Date kontrolü - varsa kullan, yoksa oluştur
          let blogDate = blog.date;
          if (!blogDate) {
            blogDate = blog.createdAt 
              ? new Date(blog.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })
              : 'No date';
          }
          
          // Özet (summary) kontrolü - varsa kullan, yoksa description'dan oluştur
          let blogSummary = blog.summary;
          if (!blogSummary && blog.description) {
            blogSummary = blog.description.length > 150 
              ? `${blog.description.substring(0, 150)}...` 
              : blog.description;
          } else if (!blogSummary) {
            blogSummary = 'No description available';
          }
          
          return {
            ...blog,
            id: blog.blogID || blog.id,
            summary: blogSummary,
            date: blogDate,
            categories: blog.categories || (blog.category ? [blog.category] : [])
          };
        });
        
        setRecentBlogs(formattedRecentBlogs);
        setLoading(false);
      } catch (err) {
        console.error("Blog detaylarını getirirken hata oluştu:", err);
        setError("Blog detayları yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
        setLoading(false);

        // Mock veri ile devam et (backend hazır olmadığında)
        const mockBlog = {
          id: parseInt(id),
          title: 'A Research about Standards',
          content: `<p>A grid system is a design tool used to arrange content on a webpage. It is a series of vertical and horizontal lines that create a matrix of intersecting points, which can be used to align and organize page elements. Grid systems are used to create a consistent look and feel across a website, and can help to make the design more visually appealing and easier to navigate.</p>
                    <div class="blog-image-container">
                        <img src="/images/blog/blog-content.jpg" alt="Blog content image" class="blog-content-image" />
                    </div>
                    <p>If you've been to New York City and have walked the streets, it is easy to figure out how to get from one place to another because of the grid system that the city is built on. Just as the predictability of a city grid helps people navigate and tourists get around easily, so do webpage grids provide a structure that guides users and designers alike. Because of their consistent reference point, grids improve page readability and scannability and provide a clear structure for where they need to go.</p>
                    <h2>Definition: A grid is made up of columns, gutters, and margins that provide a structure for the layout of elements on a page.</h2>`,
          owner: 'John Doe',
          date: 'Sunday, 1 Jan 2023',
          readTime: '5 min read',
          categories: ['Frameworks'],
          imageUrl: '/images/blog/office-1.jpg'
        };
        
        setBlog(mockBlog);
        
        // Mock recent blogs
        setRecentBlogs([
          {
            id: 2,
            title: 'UX review presentations',
            summary: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
            owner: 'Olivia Rhye',
            date: 'Sunday, 1 Jan 2023',
            categories: ['Design', 'Research'],
            imageUrl: '/images/blog/office-2.jpg'
          },
          {
            id: 3,
            title: 'Migrating to Linear 101',
            summary: 'Linear helps streamline software projects, sprints, tasks, and bug tracking. Here\'s how to get...',
            owner: 'Phoenix Baker',
            date: 'Sunday, 1 Jan 2023',
            categories: ['Design', 'Research'],
            imageUrl: '/images/blog/office-3.jpg'
          },
          {
            id: 4,
            title: 'Building your API Stack',
            summary: 'The rise of RESTful APIs has been met by a rise in tools for creating, testing, and manag...',
            owner: 'Lana Steiner',
            date: 'Sunday, 1 Jan 2023',
            categories: ['Design', 'Research'],
            imageUrl: '/images/blog/office-4.jpg'
          }
        ]);
      }
    };

    fetchData();
  }, [id]);

  // Add useEffect to fetch category colors (similar to Blog.js)
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
        console.error('Error fetching categories for blog detail:', error);
        setCategoryColorMap({}); // Reset map on error
      }
    };
    fetchCategories();
  }, []); // Fetch categories once when component mounts

  // Resim URL'sini kontrol edip, gerekirse varsayılan resme döndüren yardımcı fonksiyon
  const getImageUrl = (blogItem) => {
    if (!blogItem) return defaultBlogImage;
    
    // Backend'den gelen görsel URL'si
    if (blogItem.imageUrl) {
      // Eğer tam URL ise (http veya https ile başlıyorsa) doğrudan kullan
      if (blogItem.imageUrl.startsWith('http')) {
        return blogItem.imageUrl;
      }
      // Eğer /images ile başlıyorsa, public klasöründen al
      if (blogItem.imageUrl.startsWith('/images')) {
        return blogItem.imageUrl;
      }
      // Eğer statik bir referans ise API_URL'ye ekle
      return `${process.env.REACT_APP_API_URL || 'https://closed-merola-deveracankaya-2f4e22df.koyeb.app/'}${blogItem.imageUrl}`;
    }

    // Media alanı varsa
    if (blogItem.media) {
      if (blogItem.media.startsWith('http')) {
        return blogItem.media;
      }
      if (blogItem.media.startsWith('/images')) {
        return blogItem.media;
      }
      return `${process.env.REACT_APP_API_URL || 'https://closed-merola-deveracankaya-2f4e22df.koyeb.app/'}${blogItem.media}`;
    }
    
    // Base64 kodlu bir görsel ise
    if (blogItem.imageData) {
      return `data:image/${blogItem.imageType || 'jpeg'};base64,${blogItem.imageData}`;
    }

    // Varsayılan görsel
    return defaultBlogImage;
  };

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  if (loading) {
    return (
      <MainContainer>
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      </MainContainer>
    );
  }

  if (error) {
    return (
      <MainContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </MainContainer>
    );
  }

  if (!blog) {
    return (
      <MainContainer>
        <NotFound>Blog post not found</NotFound>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <BackLink to="/blog">
        <FiArrowLeft /> Back to Blogs
      </BackLink>
      
      <TwoColumnLayout>
        <LeftColumn>
          <SectionTitle>Recent blog posts</SectionTitle>
          
          <RecentBlogsList>
            {recentBlogs.map((recentBlog) => (
              <RecentBlogItem key={recentBlog.id} onClick={() => handleBlogClick(recentBlog.id)}>
                <RecentBlogImage src={getImageUrl(recentBlog)} alt={recentBlog.title} />
                <RecentBlogContent>
                  <RecentBlogMeta>
                    {recentBlog.owner || recentBlog.author || 'Anonymous'} • {recentBlog.date || 'No date'}
                  </RecentBlogMeta>
                  <RecentBlogTitle>{recentBlog.title}</RecentBlogTitle>
                  <RecentBlogSummary>{recentBlog.summary || 'No description available'}</RecentBlogSummary>
                  {recentBlog.categories && recentBlog.categories.length > 0 && (
                    <CategoryTags>
                      {recentBlog.categories.map((category, idx) => (
                        <CategoryTag key={idx} $categoryColor={categoryColorMap[category] || null}>
                          {category}
                        </CategoryTag>
                      ))}
                    </CategoryTags>
                  )}
                </RecentBlogContent>
              </RecentBlogItem>
            ))}
          </RecentBlogsList>
        </LeftColumn>
        
        <RightColumn>
          <BlogHeader>
            <BlogMainImage src={getImageUrl(blog)} alt={blog.title} />
            <BlogTitle>{blog.title}</BlogTitle>
            
            <BlogMeta>
              <BlogMetaItem>
                {blog.owner || blog.author || 'Anonymous'} • {blog.date || 'No date'}
                {blog.readTime && ` • ${blog.readTime}`}
              </BlogMetaItem>
            </BlogMeta>
            
            {blog.categories && blog.categories.length > 0 && (
              <CategoryTags>
                {blog.categories.map((category, idx) => (
                  <CategoryTag key={idx} $categoryColor={categoryColorMap[category] || null}>
                    {category}
                  </CategoryTag>
                ))}
              </CategoryTags>
            )}
          </BlogHeader>
          
          <BlogContent>
            {blog.description && <p className="blog-description">{blog.description}</p>}
            <div dangerouslySetInnerHTML={{ __html: blog.content || '' }} />
          </BlogContent>
        </RightColumn>
      </TwoColumnLayout>
    </MainContainer>
  );
};

// Styled Components
const MainContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #667085;
  text-decoration: none;
  margin-bottom: 32px;
  font-size: 16px;
  
  &:hover {
    color: #1E40AF;
  }
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: calc(33.33% - 1px);
    width: 1px;
    background-color: #E4E7EC;
    height: 100%;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    &::after {
      display: none;
    }
  }
`;

const LeftColumn = styled.div`
  padding-right: 20px;
  
  @media (max-width: 768px) {
    padding-right: 0;
    padding-bottom: 30px;
    border-bottom: 1px solid #E4E7EC;
    margin-bottom: 30px;
  }
`;

const RightColumn = styled.div`
  padding-left: 20px;
  
  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #101828;
  margin-bottom: 24px;
  position: relative;
`;

const RecentBlogsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 16px;
`;

const RecentBlogItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: #F9FAFB;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const RecentBlogImage = styled.img`
  width: 100%;
  height: 160px;
  border-radius: 8px;
  object-fit: cover;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

const RecentBlogContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px 0;
`;

const RecentBlogTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #101828;
  margin: 0;
  line-height: 1.3;
  transition: color 0.3s ease;

  ${RecentBlogItem}:hover & {
    color: #1E40AF;
  }
`;

const RecentBlogMeta = styled.div`
  font-size: 14px;
  color: #667085;
  font-weight: 500;
  margin-bottom: 4px;
`;

const RecentBlogSummary = styled.p`
  font-size: 14px;
  color: #4B5563;
  margin: 8px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.5;
`;

const BlogHeader = styled.div`
  margin-bottom: 32px;
`;

const BlogTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #101828;
  margin-bottom: 16px;
  line-height: 1.2;
`;

const BlogMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  color: #667085;
  font-size: 14px;
`;

const BlogMetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
  
  span[role="img"] {
    font-size: 16px;
    margin-right: 2px;
  }
`;

const CategoryTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
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

const BlogMainImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  object-fit: cover;
  max-height: 300px;
`;

const BlogContent = styled.div`
  color: #374151;
  font-size: 17px;
  line-height: 1.6;
  
  .blog-description {
    font-size: 18px;
    color: #4B5563;
    margin-bottom: 24px;
    line-height: 1.6;
    border-bottom: 1px solid #E5E7EB;
    padding-bottom: 24px;
  }
  
  h2 {
    font-size: 24px;
    font-weight: 600;
    margin: 32px 0 16px;
    color: #101828;
  }
  
  h3 {
    font-size: 20px;
    font-weight: 600;
    margin: 28px 0 14px;
    color: #101828;
  }
  
  p {
    margin-bottom: 20px;
  }
  
  img {
    max-width: 100%;
    border-radius: 8px;
    margin: 24px 0;
  }
  
  ul, ol {
    margin-left: 20px;
    margin-bottom: 20px;
  }
  
  li {
    margin-bottom: 8px;
  }
  
  blockquote {
    border-left: 4px solid #1E40AF;
    padding-left: 16px;
    margin: 24px 0;
    font-style: italic;
    color: #4B5563;
  }
  
  code {
    background-color: #F3F4F6;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
  }
  
  pre {
    background-color: #1F2937;
    color: #F9FAFB;
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 24px 0;
  }
  
  a {
    color: #1E40AF;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  .blog-image-container {
    display: flex;
    justify-content: center;
    margin: 32px 0;
  }
  
  .blog-content-image {
    max-width: 100%;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const Loading = styled.div`
  padding: 40px;
  text-align: center;
  font-size: 18px;
  color: #667085;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
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

const NotFound = styled.div`
  padding: 40px;
  text-align: center;
  font-size: 20px;
  color: #1F2937;
  background-color: #F9FAFB;
  border-radius: 8px;
  border: 1px dashed #D1D5DB;
`;

const ErrorMessage = styled.div`
  padding: 24px;
  background-color: #FEF2F2;
  color: #B91C1C;
  border-radius: 8px;
  border-left: 4px solid #B91C1C;
  margin-bottom: 32px;
`;

export default BlogDetail;