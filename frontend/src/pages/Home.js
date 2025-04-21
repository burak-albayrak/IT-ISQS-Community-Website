import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import homeImage from '../assets/home.png';
import { useAuth } from '../contexts/AuthContext';
import { FiArrowRight } from 'react-icons/fi';
import axios from 'axios';
import defaultBlogImage from '../assets/defaultblog.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [recentBlogPosts, setRecentBlogPosts] = useState([]);
  const [recentForumPosts, setRecentForumPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [forumLoading, setForumLoading] = useState(true);
  const [error, setError] = useState(null);
  const [forumError, setForumError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/blogs`);
        
        if (response && response.data) {
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
          } else {
            setRecentBlogPosts([]);
          }
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Blog verilerini getirirken hata oluştu:", err);
        setError("Blog verileri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
        setRecentBlogPosts([]);
        setLoading(false);
      }
    };

    const fetchRecentForumPosts = async () => {
      setForumLoading(true);
      setForumError(null);
      
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(`http://localhost:8080/api/v1/forum/posts/recent`);
        
        if (response && response.data) {
          setRecentForumPosts(response.data);
        } else {
          // Fallback to mock data if API returns empty
          setRecentForumPosts(getMockForumPosts());
        }
        
        setForumLoading(false);
      } catch (err) {
        console.error("Forum verilerini getirirken hata oluştu:", err);
        // Don't set error, just use mock data for development
        setRecentForumPosts(getMockForumPosts());
        setForumLoading(false);
      }
    };

    // Helper function to get mock forum posts
    const getMockForumPosts = () => {
      return [
        {
          id: 1,
          title: "Lorem ipsum dolor sit amet consectetur?",
          description: "Lorem ipsum dolor sit amet consectetur. Malesuada dapibus in risus.",
          author: "Kristint Watson",
          authorAvatar: "",
          views: 10,
          likes: 5,
          replies: 2,
          date: "01.25.2025"
        },
        {
          id: 2,
          title: "Lorem ipsum dolor sit amet consectetur?",
          description: "Lorem ipsum dolor sit amet consectetur. Malesuada dapibus in risus.",
          author: "Albert Flores",
          authorAvatar: "",
          views: 20,
          likes: 11,
          replies: 5,
          date: "11.22.2024"
        },
        {
          id: 3,
          title: "Lorem ipsum dolor sit amet consectetur?",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut la...",
          author: "Jenny Wilson",
          authorAvatar: "",
          views: 60,
          likes: 35,
          replies: 20,
          date: "11.22.2024"
        }
      ];
    };

    fetchRecentBlogs();
    fetchRecentForumPosts();
  }, []);

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const handleForumPostClick = (postId) => {
    navigate(`/forum/post/${postId}`);
  };

  return (
    <HomeContainer>
      <HeroSection>
        <Overlay />
        <HeroContent>
          <HeroTitle>
            <BlueTitle>MEET</BlueTitle>
            <WhiteTitle>IT-ISQS!</WhiteTitle>
          </HeroTitle>
          <HeroText>
            Lorem ipsum dolor sit amet consectetur. In magna non bibendum a proin commodo. Odio consectetur viverra blandit amet at
            vulputate etiam consequat purus. Habitant urna dolor enim quisque interdum pharetra interdum. Lobortis leo penatibus pretium etiam
            pellentesque nibh sed vel diam. Dignissim ut purus nunc ligula nisl. Nunc ultrices cursus quam dignissim. Dui dictum varius diam
            facilisis eu arcu posuere malesuada. Commodo neque commodo at penatibus mattis convallis.
            Neque condimentium sit nisl suspendisse. Et commodo suspendisse est cursus felis faucibus massa morbi. Facilisis lacus volutpat
            consectetur donec leo. Nunc a pulvinar magna aliquet tortor. Ornare volutpat sed egestas tellus. Porta amet ornare scelerisque fringilla
            sed.
          </HeroText>
          {!isAuthenticated && (
            <JoinButton to="/login?signup=true">Join us! sign up</JoinButton>
          )}
        </HeroContent>
      </HeroSection>

      {/* Recent Blog Posts Section */}
      <BlogSection>
        <SectionHeader>
          <SectionTitle>Recent Blog Posts</SectionTitle>
          <ViewAllLink to="/blog">
            View all posts <FiArrowRight />
          </ViewAllLink>
        </SectionHeader>
        
        {loading ? (
          <LoadingMessage>Loading recent blog posts...</LoadingMessage>
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : recentBlogPosts.length === 0 ? (
          <EmptyMessage>No blog posts available.</EmptyMessage>
        ) : (
          <RecentBlogsGrid>
            {recentBlogPosts.length > 0 && (
              <FeaturedBlog onClick={() => handleBlogClick(recentBlogPosts[0].id)}>
                <FeaturedBlogImage 
                  src={recentBlogPosts[0].imageUrl || defaultBlogImage} 
                  alt={recentBlogPosts[0].title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultBlogImage;
                  }}
                />
                <FeaturedBlogContent>
                  <FeaturedBlogAuthor>{recentBlogPosts[0].author} • {recentBlogPosts[0].date}</FeaturedBlogAuthor>
                  <FeaturedBlogTitle>{recentBlogPosts[0].title}</FeaturedBlogTitle>
                  <FeaturedBlogDescription>{recentBlogPosts[0].summary}</FeaturedBlogDescription>
                  <BlogCategories>
                    {recentBlogPosts[0].categories.map((category, idx) => (
                      <BlogCategory key={idx}>{category}</BlogCategory>
                    ))}
                  </BlogCategories>
                </FeaturedBlogContent>
              </FeaturedBlog>
            )}
            
            <SideBlogsContainer>
              {recentBlogPosts.slice(1, 3).map((blog) => (
                <SideBlog key={blog.id} onClick={() => handleBlogClick(blog.id)}>
                  <SideBlogImage 
                    src={blog.imageUrl || defaultBlogImage} 
                    alt={blog.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultBlogImage;
                    }}
                  />
                  <SideBlogContent>
                    <SideBlogAuthor>{blog.author} • {blog.date}</SideBlogAuthor>
                    <SideBlogTitle>{blog.title}</SideBlogTitle>
                    <SideBlogDescription>{blog.summary}</SideBlogDescription>
                    <BlogCategories>
                      {blog.categories.map((category, idx) => (
                        <BlogCategory key={idx}>{category}</BlogCategory>
                      ))}
                    </BlogCategories>
                  </SideBlogContent>
                </SideBlog>
              ))}
            </SideBlogsContainer>
          </RecentBlogsGrid>
        )}
      </BlogSection>

      {/* Recent Forum Posts Section */}
      <ForumSection>
        <ForumSectionHeader>
          <ForumSectionTitle>Recent Forum Posts</ForumSectionTitle>
          <ViewAllLink to="/forum">
            View All
          </ViewAllLink>
        </ForumSectionHeader>
        
        {forumLoading ? (
          <LoadingMessage>Loading recent forum posts...</LoadingMessage>
        ) : forumError ? (
          <ErrorMessage>{forumError}</ErrorMessage>
        ) : recentForumPosts.length === 0 ? (
          <EmptyMessage>No forum posts available.</EmptyMessage>
        ) : (
          <ForumPostsContainer>
            <ForumTableHeader>
              <ForumPostsColumn>Forum Posts</ForumPostsColumn>
              <StatsColumn>Views</StatsColumn>
              <StatsColumn>Likes</StatsColumn>
              <StatsColumn>Replies</StatsColumn>
              <DateColumn>Date</DateColumn>
            </ForumTableHeader>
            
            {recentForumPosts.map((post) => (
              <ForumPostItem key={post.id} onClick={() => handleForumPostClick(post.id)}>
                <ForumPostContent>
                  <ForumPostTitle>{post.title}</ForumPostTitle>
                  <ForumPostDescription>{post.description}</ForumPostDescription>
                  <ForumPostAuthor>
                    <AuthorAvatar src={post.authorAvatar || "https://via.placeholder.com/40"} alt={post.author} />
                    <AuthorName>{post.author}</AuthorName>
                  </ForumPostAuthor>
                </ForumPostContent>
                <ForumPostStats>
                  <StatValue>{post.views}</StatValue>
                </ForumPostStats>
                <ForumPostStats>
                  <StatValue>{post.likes}</StatValue>
                </ForumPostStats>
                <ForumPostStats>
                  <StatValue>{post.replies}</StatValue>
                </ForumPostStats>
                <ForumPostDate>
                  <StatValue>{post.date}</StatValue>
                </ForumPostDate>
              </ForumPostItem>
            ))}
          </ForumPostsContainer>
        )}
      </ForumSection>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
`;

const HeroSection = styled.section`
  background-image: url(${homeImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 600px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  margin-top: 20px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.3) 100%);
  z-index: 1;
`;

const HeroContent = styled.div`
  width: 50%;
  padding: 50px;
  position: relative;
  z-index: 2;
  
  @media (max-width: 992px) {
    width: 70%;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 30px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 72px;
  line-height: 1;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    font-size: 56px;
  }
  
  @media (max-width: 576px) {
    font-size: 42px;
  }
`;

const BlueTitle = styled.span`
  color: #6B7DD1;
  font-weight: 700;
  display: block;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
`;

const WhiteTitle = styled.span`
  color: white;
  font-weight: 700;
  display: block;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
`;

const HeroText = styled.p`
  color: white;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 30px;
  max-width: 90%;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
`;

const JoinButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(to right, #1e3c7a, #2a4b8d, #3a5ca0);
  color: white;
  font-weight: 600;
  font-size: 18px;
  padding: 12px 30px;
  border-radius: 30px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background: linear-gradient(to right, #18325e, #1a3a7d, #2a4c8f);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  }
`;

const BlogSection = styled.section`
  margin: 60px 0;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #101828;
  margin: 0;
`;

const ViewAllLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6B7DD1;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;
  
  &:hover {
    color: #1E3C7A;
  }
`;

const RecentBlogsGrid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1.25fr;
  gap: 28px;
  margin-top: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
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
`;

const SideBlogContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  gap: 8px;
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

const BlogCategories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
`;

const BlogCategory = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #6B7DD1;
  background-color: #EFF6FF;
  padding: 4px 10px;
  border-radius: 16px;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #667085;
  padding: 20px;
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: #E11D48;
  padding: 20px;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #667085;
  padding: 20px;
`;

const ForumSection = styled.section`
  margin: 60px 0;
  padding: 0 20px;
`;

const ForumSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #E4E7EC;
`;

const ForumSectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #101828;
  margin: 0;
`;

const ForumPostsContainer = styled.div`
  background-color: #F9FAFB;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 20px;
`;

const ForumTableHeader = styled.div`
  display: flex;
  align-items: center;
  background-color: #F2F4F7;
  padding: 16px 20px;
  font-weight: 500;
  color: #667085;
  font-size: 14px;
`;

const ForumPostsColumn = styled.div`
  flex: 3;
`;

const StatsColumn = styled.div`
  flex: 1;
  text-align: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const DateColumn = styled.div`
  flex: 1;
  text-align: center;
  
  @media (max-width: 768px) {
    flex: 1.5;
  }
`;

const ForumPostItem = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-bottom: 1px solid #F2F4F7;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #F9FAFB;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const ForumPostContent = styled.div`
  flex: 3;
  padding-right: 20px;
`;

const ForumPostTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #1E40AF;
  margin: 0 0 8px 0;
  text-decoration: none;
`;

const ForumPostDescription = styled.p`
  font-size: 14px;
  color: #475467;
  margin: 0 0 12px 0;
  line-height: 1.5;
`;

const ForumPostAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AuthorAvatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorName = styled.span`
  font-size: 14px;
  color: #667085;
`;

const ForumPostStats = styled.div`
  flex: 1;
  text-align: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ForumPostDate = styled.div`
  flex: 1;
  text-align: center;
  
  @media (max-width: 768px) {
    flex: 1.5;
  }
`;

const StatValue = styled.span`
  font-size: 14px;
  color: #667085;
  font-weight: 500;
`;

export default Home; 