import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import newLogo from '../assets/logo.png'; // New main logo
import euLogo from '../assets/eu-logo.png'; // EU logo with text
import { FiLogOut, FiUser } from 'react-icons/fi'; // Log out ve profil iconları
import { SiGoogletranslate } from 'react-icons/si'; // Google Translate ikonu
import { useAuth } from '../contexts/AuthContext';

import '../styles/Header.css';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const routes = [
    { path: '/', label: 'HOME' },
    { path: '/about', label: 'ABOUT' },
    { path: '/syllabus', label: 'SYLLABUS' },
    { path: '/blog', label: 'BLOG' },
    { path: '/forum', label: 'FORUM' },
    { path: '/project-results', label: 'PROJECT RESULTS' },
    { path: '/contact', label: 'CONTACT US' },
  ];

  const isActive = (path) => {
    if (path === '/blog') {
      return location.pathname === '/blog' || location.pathname.startsWith('/blog/');
    }
    return location.pathname === path;
  };

  useEffect(() => {
    // Don't set active index for profile pages
    if (location.pathname === '/profile' || location.pathname === '/edit-profile') {
      // Hide the indicator or set to a non-existent index
      setActiveIndex(-1);
    } else {
      // Blog sayfaları için özel kontrol
      if (location.pathname.startsWith('/blog')) {
        const blogIndex = routes.findIndex(route => route.path === '/blog');
        setActiveIndex(blogIndex);
      } else {
        const currentIndex = routes.findIndex(route => route.path === location.pathname);
        setActiveIndex(currentIndex >= 0 ? currentIndex : 0);
      }
    }
  }, [location]);

  useEffect(() => {
    if (navRef.current && indicatorRef.current) {
      const navItems = navRef.current.querySelectorAll('li');
      
      // Login sayfasında, verify-email sayfasında ve reset-password sayfasında gösterge çizgisini gizle
      if (location.pathname === '/login' || 
          location.pathname === '/verify-email' || 
          location.pathname === '/reset-password' || 
          location.pathname === '/forgot-password' ||
          location.pathname === '/profile' ||
          location.pathname === '/edit-profile') {
        indicatorRef.current.style.opacity = '0';
      } else {
        indicatorRef.current.style.opacity = '1';
        
        if (navItems.length > 0 && activeIndex >= 0 && activeIndex < navItems.length) {
          const activeItem = navItems[activeIndex];
          const itemRect = activeItem.getBoundingClientRect();
          const navRect = navRef.current.getBoundingClientRect();
          
          indicatorRef.current.style.width = `${itemRect.width}px`;
          indicatorRef.current.style.left = `${itemRect.left - navRect.left}px`;
        }
      }
    }
  }, [activeIndex, location.pathname]);

  // Çıkış işlemi
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Login ve signup ve verify-email sayfalarını kontrol et
  const isLoginPage = (location.pathname === '/login' && !location.search.includes('signup=true')) || 
                      location.pathname === '/reset-password' || 
                      location.pathname === '/forgot-password';
  
  const isSignupPage = location.pathname === '/verify-email' || 
                       (location.pathname === '/login' && location.search.includes('signup=true'));
                       
  // Profile sayfasını kontrol et
  const isProfilePage = location.pathname === '/profile' || location.pathname === '/edit-profile';

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <div className="main-logo">
            <img src={newLogo} alt="IT-ISQS Logo" className="main-logo-img" />
          </div>
          
          <div className="eu-logo">
            <img src={euLogo} alt="Co-funded by the European Union" className="eu-logo-full" />
          </div>
        </div>

        <nav className="main-nav">
          <ul className="nav-links" ref={navRef}>
            {routes.map((route, index) => (
              <li key={route.path}>
                <NavLink 
                  to={route.path} 
                  className={({ isActive }) => {
                    if (route.path === '/blog') {
                      return (location.pathname === '/blog' || location.pathname.startsWith('/blog/')) && !isProfilePage ? "active" : "";
                    }
                    return isActive && !isProfilePage ? "active" : "";
                  }}
                >
                  {route.label}
                </NavLink>
              </li>
            ))}
            <div className="nav-indicator" ref={indicatorRef}></div>
          </ul>
        </nav>

        <div className="right-section">
          <div className="auth-buttons">
            <button className="language-btn" title="Translate">
              <SiGoogletranslate size={24} color="#555" />
            </button>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" className={`profile-btn ${isProfilePage ? 'profile-btn-active' : ''}`} title="Profile">
                  <FiUser size={24} />
                </Link>
                <button onClick={handleLogout} className="logout-btn" title="Log Out">
                  <FiLogOut size={24} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login?signup=true" className={`contact-btn ${isSignupPage ? 'signup-btn-active' : ''}`}>SIGN UP</Link>
                <Link to="/login" className={`login-btn ${isLoginPage ? 'login-btn-active' : ''}`}>SIGN IN</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 