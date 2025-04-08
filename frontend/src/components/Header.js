import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import newLogo from '../assets/logo.png'; // New main logo
import euLogo from '../assets/eu-logo.png'; // EU logo with text
import { FiLogOut } from 'react-icons/fi'; // Geçici log out iconu
import { BiWorld } from 'react-icons/bi'; // Google Translate benzeri icon
import { useAuth } from '../contexts/AuthContext';

import '../styles/Header.css';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const navRef = useRef(null);
  const indicatorRef = useRef(null);

  const routes = [
    { path: '/', label: 'HOME' },
    { path: '/about', label: 'ABOUT' },
    { path: '/syllabus', label: 'SYLLABUS' },
    { path: '/blog', label: 'BLOG' },
    { path: '/forum', label: 'FORUM' },
    { path: '/project-results', label: 'PROJECT RESULTS' },
    { path: '/contact', label: 'CONTACT US' },
  ];

  useEffect(() => {
    const currentIndex = routes.findIndex(route => route.path === location.pathname);
    setActiveIndex(currentIndex >= 0 ? currentIndex : 0);
  }, [location]);

  useEffect(() => {
    if (navRef.current && indicatorRef.current) {
      const navItems = navRef.current.querySelectorAll('li');
      
      // Login sayfasında ve verify-email sayfasında gösterge çizgisini gizle
      if (location.pathname === '/login' || location.pathname === '/verify-email') {
        indicatorRef.current.style.opacity = '0';
      } else {
        indicatorRef.current.style.opacity = '1';
        
        if (navItems.length > 0 && activeIndex < navItems.length) {
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

  // Login butonunun stilini belirle
  const isLoginPage = location.pathname === '/login' || location.pathname === '/verify-email';

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
                  className={({ isActive }) => isActive ? "active" : ""}
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
            <button className="language-btn" title="Change Language">
              <BiWorld size={26} color="#555" />
            </button>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="contact-btn">PROFILE</Link>
                <button onClick={handleLogout} className="logout-btn" title="Log Out">
                  <FiLogOut size={24} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login?signup=true" className="contact-btn">SIGN UP</Link>
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