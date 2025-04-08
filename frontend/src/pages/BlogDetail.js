import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiArrowLeft, FiClock, FiUser, FiCalendar } from 'react-icons/fi';
import '../styles/Blog.css';
import BlogService from '../services/BlogService';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Blog detaylarını getir
        const blogResponse = await BlogService.getBlogById(id);
        setBlog(blogResponse.data);

        // İlgili blogları getir
        const relatedResponse = await BlogService.getRelatedBlogs(id);
        setRelatedBlogs(relatedResponse.data);

        setLoading(false);
      } catch (err) {
        console.error("Blog detaylarını getirirken hata oluştu:", err);
        setError("Blog detayları yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
        setLoading(false);

        // Mock veri ile devam et (backend hazır olmadığında)
        const mockBlog = {
          id: parseInt(id),
          title: 'Building your API Stack',
          content: `<p>The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.</p>
                    <p>In this article, we'll explore the essential components of a modern API stack and how they can enhance your development workflow.</p>
                    <h2>Understanding API Architecture</h2>
                    <p>APIs have become the backbone of modern software development. They enable different applications to communicate with each other, allowing developers to leverage existing services rather than building everything from scratch.</p>
                    <p>When designing an API, it's important to consider its architecture. There are several architectural styles, including:</p>
                    <ul>
                      <li>REST (Representational State Transfer)</li>
                      <li>GraphQL</li>
                      <li>gRPC</li>
                      <li>SOAP (Simple Object Access Protocol)</li>
                    </ul>
                    <p>Each has its strengths and weaknesses, so choosing the right one depends on your specific needs.</p>
                    <h2>Essential Tools for API Development</h2>
                    <p>Building a robust API requires a suite of tools to handle different aspects of the development process. Here are some essential categories:</p>
                    <h3>API Design and Documentation</h3>
                    <p>Tools like Swagger (OpenAPI), Postman, and Stoplight help you design, document, and visualize your APIs. Good documentation is crucial for both internal developers and external consumers of your API.</p>
                    <h3>API Testing</h3>
                    <p>Testing ensures your API works as expected. Tools like Postman, Insomnia, and Jest can help automate this process.</p>
                    <h3>API Gateways</h3>
                    <p>API gateways act as intermediaries between clients and services, handling tasks like routing, authentication, and rate limiting. Examples include Kong, Amazon API Gateway, and Apigee.</p>
                    <p>Building a comprehensive API stack can significantly improve your development process, making it more efficient and maintainable.</p>`,
          author: 'Lana Steiner',
          date: '1 Jan 2023',
          readTime: '5 min read',
          categories: ['Design', 'Research'],
          imageUrl: '/images/blog/desk-setup.jpg'
        };
        
        setBlog(mockBlog);
        
        // Mock related blogs
        setRelatedBlogs([
          {
            id: 5,
            title: 'PM mental models',
            summary: 'Mental models are simple expressions of complex processes or relationships.',
            author: 'Demi Wilkinson',
            date: '1 Jan 2023',
            categories: ['Product', 'Research'],
            imageUrl: '/images/blog/brainstorming.jpg'
          },
          {
            id: 6,
            title: 'What is Wireframing?',
            summary: 'Introduction to Wireframing and its Principles.',
            author: 'Candice Wu',
            date: '1 Jan 2023',
            categories: ['Design', 'Research'],
            imageUrl: '/images/blog/desk-setup-2.jpg'
          }
        ]);
      }
    };

    fetchData();
  }, [id]);

  // Resim URL'sini kontrol edip, gerekirse varsayılan resme döndüren yardımcı fonksiyon
  const getImageUrl = (blogItem) => {
    if (!blogItem) return '/images/blog/default-blog-image.jpg';
    
    // Backend'den gelen görsel URL'si
    if (blogItem.imageUrl) {
      // Eğer tam URL ise (http veya https ile başlıyorsa) doğrudan kullan
      if (blogItem.imageUrl.startsWith('http')) {
        return blogItem.imageUrl;
      }
      // Eğer statik bir referans ise API_URL'ye eklenebilir
      return `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}${blogItem.imageUrl}`;
    }
    
    // Base64 kodlu bir görsel ise
    if (blogItem.imageData) {
      return `data:image/${blogItem.imageType || 'jpeg'};base64,${blogItem.imageData}`;
    }

    // Varsayılan görsel
    return '/images/blog/default-blog-image.jpg';
  };

  if (loading) {
    return (
      <BlogDetailContainer>
        <Loading>Yükleniyor...</Loading>
      </BlogDetailContainer>
    );
  }

  if (error) {
    return (
      <BlogDetailContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </BlogDetailContainer>
    );
  }

  if (!blog) {
    return (
      <BlogDetailContainer>
        <NotFound>Blog post not found</NotFound>
      </BlogDetailContainer>
    );
  }

  return (
    <BlogDetailContainer>
      <BackLink to="/blog">
        <FiArrowLeft /> Back to Blogs
      </BackLink>
      
      <BlogHeader>
        <BlogImage 
          className="blog-card-image" 
          src={getImageUrl(blog)} 
          alt={blog.title} 
        />
        <BlogTitle>{blog.title}</BlogTitle>
        
        <BlogMeta>
          <MetaItem>
            <FiUser /> {blog.author}
          </MetaItem>
          <MetaItem>
            <FiCalendar /> {blog.date}
          </MetaItem>
          <MetaItem>
            <FiClock /> {blog.readTime || '5 min read'}
          </MetaItem>
        </BlogMeta>
        
        <CategoryTags>
          {blog.categories.map((category, idx) => (
            <CategoryTag key={idx}>{category}</CategoryTag>
          ))}
        </CategoryTags>
      </BlogHeader>
      
      <BlogContent dangerouslySetInnerHTML={{ __html: blog.content }} />
      
      <RelatedBlogs>
        <SectionTitle>Related blog posts</SectionTitle>
        {relatedBlogs.length > 0 ? (
          <RelatedBlogsGrid>
            {relatedBlogs.map((relatedBlog) => (
              <RelatedBlogCard key={relatedBlog.id} to={`/blog/${relatedBlog.id}`}>
                <RelatedBlogImage 
                  className="blog-card-image" 
                  src={getImageUrl(relatedBlog)} 
                  alt={relatedBlog.title}
                />
                <RelatedBlogContent>
                  <RelatedBlogAuthor>{relatedBlog.author} • {relatedBlog.date}</RelatedBlogAuthor>
                  <RelatedBlogTitle>{relatedBlog.title}</RelatedBlogTitle>
                  <RelatedBlogSummary>{relatedBlog.summary}</RelatedBlogSummary>
                  <CategoryTags>
                    {relatedBlog.categories.map((category, idx) => (
                      <CategoryTag key={idx}>{category}</CategoryTag>
                    ))}
                  </CategoryTags>
                </RelatedBlogContent>
              </RelatedBlogCard>
            ))}
          </RelatedBlogsGrid>
        ) : (
          <NoRelatedPosts>İlgili blog yazısı bulunamadı.</NoRelatedPosts>
        )}
      </RelatedBlogs>
    </BlogDetailContainer>
  );
};

// Styled Components
const BlogDetailContainer = styled.div`
  max-width: 900px;
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
    color: #6941C6;
  }
`;

const BlogHeader = styled.header`
  margin-bottom: 40px;
`;

const BlogImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 24px;
`;

const BlogTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #101828;
  margin-bottom: 16px;
`;

const BlogMeta = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #667085;
  font-size: 14px;
`;

const CategoryTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const CategoryTag = styled.span`
  font-size: 14px;
  color: #6941C6;
  background-color: #F9F5FF;
  padding: 4px 10px;
  border-radius: 16px;
`;

const BlogContent = styled.div`
  color: #374151;
  line-height: 1.8;
  font-size: 18px;
  
  h2 {
    font-size: 28px;
    font-weight: 600;
    margin: 32px 0 16px;
    color: #101828;
  }
  
  h3 {
    font-size: 22px;
    font-weight: 600;
    margin: 24px 0 12px;
    color: #101828;
  }
  
  p {
    margin-bottom: 20px;
  }
  
  ul, ol {
    margin: 20px 0;
    padding-left: 20px;
    
    li {
      margin-bottom: 8px;
    }
  }
`;

const RelatedBlogs = styled.section`
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid #E5E7EB;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #101828;
`;

const RelatedBlogsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RelatedBlogCard = styled(Link)`
  display: block;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(16, 24, 40, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(16, 24, 40, 0.1);
  }
`;

const RelatedBlogImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const RelatedBlogContent = styled.div`
  padding: 20px;
`;

const RelatedBlogAuthor = styled.p`
  font-size: 14px;
  color: #667085;
  margin-bottom: 8px;
`;

const RelatedBlogTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #101828;
`;

const RelatedBlogSummary = styled.p`
  font-size: 16px;
  color: #667085;
  margin-bottom: 16px;
  line-height: 1.5;
`;

const Loading = styled.div`
  text-align: center;
  font-size: 18px;
  color: #667085;
  padding: 40px;
`;

const NotFound = styled.div`
  text-align: center;
  font-size: 18px;
  color: #667085;
  padding: 40px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: #F04438;
  padding: 40px;
`;

const NoRelatedPosts = styled.p`
  text-align: center;
  color: #667085;
  font-size: 16px;
  padding: 20px 0;
`;

export default BlogDetail; 