import axios from 'axios';
import styled from 'styled-components';
import homeImage from '../assets/home.png';
import home2Image from '../assets/home2.png';
import ourImage from '../assets/our.png';
import cankayaLogo from '../assets/cankaya-logo.png';
import tedLogo from '../assets/ted-logo.png';
import ufvLogo from '../assets/fufdv-logo.png';
import openLogo from '../assets/open-logo.png';
import defaultProfilePic from '../assets/defaultpp.jpg';
import defaultBlogImage from '../assets/defaultblog.png';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiArrowRight, FiMapPin, FiPhone, FiMail, FiGlobe } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

// Helper function for date formatting
const formatRelativeTime = (dateString) => {
  if (!dateString || dateString === 'N/A') return 'N/A'; // Handle invalid date string

  const date = new Date(dateString);
  if (isNaN(date.getTime())) { // Check if the date is valid
      console.warn("Invalid date string received:", dateString);
      return 'Invalid Date';
  }
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  const diffInHours = Math.floor(diffInSeconds / 3600);

  if (diffInHours < 1) {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return diffInMinutes < 1 ? "Just now" : `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else {
    // Fallback to default date format if older than 24 hours
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }
};

const partnerUniversities = [
  {
    id: 1,
    logo: cankayaLogo,
    name: 'Cankaya Universitesi',
    country: 'Türkiye',
    role: 'Project Coordinator',
    address: 'Yukariyurtcu Mahallesi Mimar Sinan Caddesi No:4, 06815, Etimesgut/ANKARA',
    phone: '+90 312 233 10 00',
    email: 'webadmin@cankaya.edu.tr',
    website: 'https://www.cankaya.edu.tr/index_en.php',
  },
  {
    id: 2,
    logo: tedLogo,
    name: 'TED Universitesi',
    country: 'Türkiye',
    role: null,
    address: 'Ziya Gökalp Caddesi No:48 06420, Kolej Çankaya/ANKARA',
    phone: '+90 (312) 585 00 00',
    email: 'info@tedu.edu.tr',
    website: 'https://www.tedu.edu.tr/en',
  },
  {
    id: 3,
    logo: ufvLogo,
    name: 'Fundacion Universidad Francisco De Vitoria',
    country: 'Spain',
    role: null,
    address: 'Ctra. Pozuelo-Majadahonda KM 1.800, 28223 Pozuelo de Alarcón (Madrid)',
    phone: '+34 91 709 14 00',
    email: 'info@ufv.es',
    website: 'https://www.ufv.es/en/',
  },
  {
    id: 4,
    logo: openLogo,
    name: 'Open Universiteit',
    country: 'Netherlands',
    role: null,
    address: 'Valkenburgerweg 177, 6419 AT Heerlen',
    phone: '+31 (0)45 576 28 88',
    email: 'info@ou.nl',
    website: 'https://www.ou.nl/en',
  },
];

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [recentBlogPosts, setRecentBlogPosts] = useState([]);
  const [recentForumPosts, setRecentForumPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [forumLoading, setForumLoading] = useState(true);
  const [error, setError] = useState(null);
  const [forumError, setForumError] = useState(null);
  const [categoryColorMap, setCategoryColorMap] = useState({});
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
              categories: blog.category ? [blog.category] : [],
              date: blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
              author: blog.owner || blog.createdBy || 'Anonymous',
              imageUrl: blog.media || ''
            }));
            setRecentBlogPosts(recentBlogs);
          } else {
            setRecentBlogPosts([]);
          }
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error while fetching blog data:", err);
        setError("An error occurred while loading blog data. Please try again later.");
        setRecentBlogPosts([]);
        setLoading(false);
      }
    };

    const fetchRecentForumPosts = async () => {
      setForumLoading(true);
      setForumError(null);
      
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/forum-posts/recent`);
        
        if (response && response.data) {
          if (Array.isArray(response.data)) {
             const formattedPosts = response.data.map(post => ({
                id: post.forumPostID || post.id,
                title: post.title || 'Untitled Post',
                description: post.description ? post.description.substring(0, 100) + '...' : 'No description available.', 
                author: post.creatorName || 'Anonymous',
                authorAvatar: post.creatorProfilePic || defaultProfilePic,
                replies: post.commentCount || 0,
                createdAt: post.createdAt
             }));
             setRecentForumPosts(formattedPosts);
          } else {
              console.warn("API response for recent forum posts is not an array:", response.data);
              setRecentForumPosts([]);
          }
        } else {
           console.warn("API response for recent forum posts is missing data.");
          setRecentForumPosts([]);
        }
        setForumLoading(false);
      } catch (err) {
        console.error("Error fetching forum data:", err);
        setForumError("An error occurred while loading forum posts. Please try again later.");
        setRecentForumPosts([]);
        setForumLoading(false);
      }
    };

    fetchRecentBlogs();
    fetchRecentForumPosts();
  }, []);

  // Add useEffect to fetch category colors (similar to Blog.js/Forum.js)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/forum-categories'); 
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
        console.error('Error fetching categories for home page:', error);
        setCategoryColorMap({}); // Reset map on error
      }
    };
    fetchCategories();
  }, []); // Fetch categories once when component mounts

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
            Empowering the Future of Software Engineering through International Quality Standards

            The Innovative Training for International Software Quality Standards (IT-ISQS) project, supported by Erasmus+, is dedicated to reshaping software engineering education by embedding internationally recognized quality standards into academic curricula. In an age where software reliability is vital for sectors like healthcare, finance, mobility, and education, we believe that quality should not be an afterthought — it should be a foundation.


            Join us in building a future where software is not only innovative, but also reliable, robust, and safe.
          </HeroText>

        </HeroContent>
      </HeroSection>

      {/* Recent Blog Posts Section */}
      <BlogSection>
        <SectionHeader>
          <SectionTitle>Recent Blog Posts</SectionTitle>
          <ViewAllLink to="/blog">
            View All Blog Posts <FiArrowRight />
          </ViewAllLink>
        </SectionHeader>
        
        {loading ? (
          <LoadingContainer>
            <Spinner />
          </LoadingContainer>
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
                      <BlogCategory key={idx} $categoryColor={categoryColorMap[category] || null}>
                        {category}
                      </BlogCategory>
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
                        <BlogCategory key={idx} $categoryColor={categoryColorMap[category] || null}>
                          {category}
                        </BlogCategory>
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
            View All Forum Posts <FiArrowRight />
          </ViewAllLink>
        </ForumSectionHeader>
        
        {forumLoading ? (
          <LoadingContainer>
            <Spinner />
          </LoadingContainer>
        ) : forumError ? (
          <ErrorMessage>{forumError}</ErrorMessage>
        ) : recentForumPosts.length === 0 ? (
          <EmptyMessage>No forum posts available.</EmptyMessage>
        ) : (
          <ForumPostsContainer>
            <ForumTableHeader>
              <ForumPostsColumn />
              <RepliesHeaderColumn>Replies</RepliesHeaderColumn>
              <DateHeaderColumn>Date</DateHeaderColumn>
            </ForumTableHeader>
            
            {recentForumPosts.map((post) => (
              <ForumPostItem key={post.id} onClick={() => handleForumPostClick(post.id)}>
                <ForumPostContent>
                  <ForumPostTitle>{post.title}</ForumPostTitle>
                  <ForumPostDescription>{post.description}</ForumPostDescription>
                  <ForumPostAuthor>
                    <AuthorAvatar 
                      src={post.authorAvatar}
                      alt={post.author}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultProfilePic;
                      }}
                    />
                    <AuthorName>{post.author}</AuthorName>
                  </ForumPostAuthor>
                </ForumPostContent>
                <ForumPostStats>
                  <StatValue>{post.replies}</StatValue>
                </ForumPostStats>
                <ForumPostDate>
                  <StatValue>{formatRelativeTime(post.createdAt)}</StatValue>
                </ForumPostDate>
              </ForumPostItem>
            ))}
          </ForumPostsContainer>
        )}
      </ForumSection>

      {/* What Can You Do Section */}
      <WhatCanYouDoSection>
        <SectionImage src={home2Image} alt="Group discussion" />
        <SectionContent>
          <SectionTitleBlue>WHAT CAN YOU DO IN THIS WEBSITE?</SectionTitleBlue>
          <SectionText>
            This platform is designed to be more than just an information portal — it's a collaborative space for learning, sharing, and growing within the field of international software quality standards.
            <br /><br />
            Explore Interactive Course Materials:
            Dive into high-quality resources, including gamified exercises, real-life case studies, and AI-powered learning tools developed by leading experts and educators.
            <br /><br />
            Join the Forum:
            Engage in discussions with students, academics, and professionals. Ask questions, exchange ideas, and find support as you learn more about ISO/IEC software quality standards.
            <br /><br />
            Read and Contribute to the Blog:
            Stay up-to-date with the latest trends, best practices, and project updates. Our blog features articles from educators, developers, and researchers across Europe.
            <br /><br />
            Access Project Deliverables and Events:
            View key documents, research findings, and updates from project meet-ups and multiplier events across Türkiye, Spain, and the Netherlands.
            <br /><br />
            Whether you're a student, an educator, or a software professional, this website is your gateway to a smarter, higher-quality future in software engineering.
          </SectionText>
        </SectionContent>
      </WhatCanYouDoSection>

      {/* Our Image Section */}
      <OurImageSection>
        <OurImage src={ourImage} alt="Our image" />
      </OurImageSection>

      {/* Partner Universities Section */}
      <PartnersSection>
        {partnerUniversities.map((uni) => (
          <PartnerCard key={uni.id}>
            <LogoColumn>
              <a href={uni.website} target="_blank" rel="noopener noreferrer">
                <PartnerLogo src={uni.logo} alt={`${uni.name} Logo`} />
              </a>
              <UniversityName>{uni.name} ({uni.country})</UniversityName>
              {uni.role && <UniversityRole>{uni.role}</UniversityRole>}
            </LogoColumn>
            <ContactColumn>
              <ContactInfo>
                <FiMapPin /> {uni.address}
              </ContactInfo>
              <ContactInfo>
                <FiPhone /> {uni.phone}
              </ContactInfo>
              <ContactInfo>
                <FiMail /> {uni.email}
              </ContactInfo>
            </ContactColumn>
            <WebsiteColumn>
              <WebsiteLink href={uni.website} target="_blank" rel="noopener noreferrer">
                <FiGlobe /> {uni.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
              </WebsiteLink>
            </WebsiteColumn>
          </PartnerCard>
        ))}
      </PartnersSection>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
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

  @media (max-width: 768px) {
    min-height: 450px;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    min-height: 400px;
  }
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
  width: 60%;
  padding-left: 50px;
  position: relative;
  z-index: 2;
  
  @media (max-width: 992px) {
    width: 80%;
    padding-left: 30px;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 72px;
  line-height: 1;
  margin-bottom: 30px;
  
  @media (max-width: 992px) {
    font-size: 60px;
  }
  
  @media (max-width: 768px) {
    font-size: 48px;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    font-size: 36px;
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
  margin-top: 170px;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);

  @media (max-width: 992px) {
    margin-top: 120px;
  }

  @media (max-width: 768px) {
    margin-top: 80px;
    font-size: 15px;
  }

  @media (max-width: 480px) {
    margin-top: 60px;
    font-size: 14px;
  }
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

  @media (max-width: 768px) {
    margin: 40px 0;
    padding: 0 15px;
  }

  @media (max-width: 480px) {
    margin: 30px 0;
    padding: 0 10px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 10px;
  border-bottom: 1px solid #E4E7EC;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    margin-bottom: 16px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #101828;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
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
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 20px;
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

  @media (max-width: 768px) {
    margin-bottom: 20px;
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

  @media (max-width: 480px) {
    height: 180px;
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

  @media (max-width: 480px) {
    font-size: 18px;
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
    margin-bottom: 12px;
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
    padding: 15px;
    min-height: auto;
    margin-bottom: 20px;
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
    border-radius: 8px;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    height: 180px;
  }
`;

const SideBlogContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  gap: 8px;

  @media (max-width: 768px) {
    gap: 6px;
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

const BlogCategories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
`;

const BlogCategory = styled.span`
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #E4E7EC;
  border-top: 4px solid #1E40AF;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
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

  @media (max-width: 768px) {
    margin: 40px 0;
    padding: 0 15px;
  }

  @media (max-width: 480px) {
    margin: 30px 0;
    padding: 0 10px;
  }
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

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const ForumPostsContainer = styled.div`
  background-color: #F9FAFB;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 15px;
    border-radius: 8px;
  }
`;

const ForumTableHeader = styled.div`
  display: flex;
  align-items: center;
  background-color: #F2F4F7;
  padding: 16px 20px;
  font-weight: 500;
  color: #667085;
  font-size: 14px;

  @media (max-width: 768px) {
    padding: 12px 15px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const ForumPostsColumn = styled.div`
  flex: 4;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

const RepliesHeaderColumn = styled.div`
  flex: 1;
  text-align: right;
  padding-left: 125px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const DateHeaderColumn = styled.div`
  flex: 1.5;
  text-align: right;
  padding-right: 100px;
  
  @media (max-width: 768px) {
    display: none;
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

  @media (max-width: 768px) {
    padding: 15px;
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: 480px) {
    padding: 12px 10px;
  }
`;

const ForumPostContent = styled.div`
  flex: 3;
  padding-right: 20px;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
    padding-right: 0;
  }
`;

const ForumPostTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #1E40AF;
  margin: 0 0 8px 0;
  text-decoration: none;

  @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 6px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ForumPostDescription = styled.p`
  font-size: 14px;
  color: #475467;
  margin: 0 0 12px 0;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 13px;
    margin-bottom: 8px;
    line-height: 1.4;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const ForumPostAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 480px) {
    gap: 6px;
  }
`;

const AuthorAvatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
  }
`;

const AuthorName = styled.span`
  font-size: 14px;
  color: #667085;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ForumPostStats = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ForumPostDate = styled.div`
  flex: 1;
  text-align: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const StatValue = styled.span`
  font-size: 14px;
  color: #667085;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

// New Styled Components for "What Can You Do" Section
const WhatCanYouDoSection = styled.section`
  margin: 60px 0;
  padding: 0 20px;
  background-color: #ffffff; // White background for the section container
  border-radius: 12px;
  overflow: hidden;
`;

const SectionImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  display: block;
  border-radius: 36px;

  @media (max-width: 768px) {
    max-height: 300px;
    border-radius: 24px;
  }

  @media (max-width: 480px) {
    max-height: 250px;
    border-radius: 16px;
  }
`;

const SectionContent = styled.div`
  padding: 30px 20px;

  @media (max-width: 768px) {
    padding: 20px 15px;
  }

  @media (max-width: 480px) {
    padding: 15px 10px;
  }
`;

const SectionTitleBlue = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #2a4b8d;
  margin-bottom: 20px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 12px;
  }
`;

const SectionText = styled.p`
  font-size: 16px;
  color: #475467; // Standard text color
  line-height: 1.6;
  text-align: left; // Align text to the left
`;

// New Styled Components for "Our Image" Section
const OurImageSection = styled.section`
  margin: 60px 0;
  padding: 0 20px; // Consistent padding
`;

const OurImage = styled.img`
  width: 50%;
  height: auto;
  max-height: 500px;
  object-fit: contain;
  display: block;
  border-radius: 12px;
  margin: 0 auto;

  @media (max-width: 992px) {
    width: 70%;
    max-height: 400px;
  }

  @media (max-width: 768px) {
    width: 80%;
    max-height: 350px;
  }

  @media (max-width: 480px) {
    width: 90%;
    max-height: 300px;
  }
`;

// New Styled Components for Partner Universities Section
const PartnersSection = styled.section`
  margin: 60px 0;
  padding: 0 20px;
`;

const PartnerCard = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  gap: 20px;

  @media (max-width: 992px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
    gap: 15px;
  }
`;

const LogoColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  a {
    display: block; // Make the link a block element for centering
    margin-bottom: 10px;
  }

  @media (max-width: 992px) {
    width: 100%;
    margin-bottom: 15px;
  }
`;

const PartnerLogo = styled.img`
  width: 100px; // Adjust size as needed
  height: 100px;
  object-fit: contain;
  border-radius: 8px; // Slightly rounded corners for logo
  transition: transform 0.2s ease;

  &:hover {
      transform: scale(1.05);
  }
`;

const UniversityName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #101828;
  margin: 0;
`;

const UniversityRole = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #D9480F; // Example: Orange color for role
  margin-top: 4px;
`;

const ContactColumn = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-left: 1px solid #E4E7EC;
  border-right: 1px solid #E4E7EC;
  padding: 0 20px 0 40px;

  @media (max-width: 992px) {
    width: 100%;
    border: none;
    border-top: 1px solid #E4E7EC;
    border-bottom: 1px solid #E4E7EC;
    padding: 15px 0;
    margin: 15px 0;
  }

  @media (max-width: 480px) {
    padding: 12px 0;
    margin: 12px 0;
    gap: 6px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #475467;

  svg {
    min-width: 16px;
  }

  @media (max-width: 480px) {
    font-size: 13px;
    gap: 6px;
  }
`;

const WebsiteColumn = styled.div`
  flex: 1.5;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  @media (max-width: 992px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const WebsiteLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #1E40AF;
  text-decoration: none;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    font-size: 13px;
  }
`;

export default Home;