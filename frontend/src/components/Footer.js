import React from 'react';
import { Link } from 'react-router-dom';
import euLogo from '../assets/european.svg';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section logo-section">
          <div className="footer-logo">
            <span className="footer-logo-text">IT-ISQS</span>
          </div>
          <p className="footer-description">
            Lorem ipsum dolor sit amet consectetur. Blandit metus sit a ultrices facilisis id netus in id. Varius non tristique integer eget quis mauris arcu sagittis suspendisse. Proin etiam non euismod et id. Adipiscing id vestibulum luctus nec nisi sem massa. Quisque scelerisque ridiculus porttitor adipiscing massa fermentum. Mi nunc purus.
          </p>
        </div>

        <div className="footer-section links-section">
          <div className="footer-links-column">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/syllabus">Syllabus</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/community-forum">Community Forum</Link>
            <Link to="/project-results">Project Results</Link>
          </div>
          
          <div className="footer-links-column">
            <Link to="/privacy-policy">Privacy & Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/cookie-settings">Cookie Settings</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/faqs">FAQs</Link>
          </div>
        </div>

        <div className="footer-section eu-section">
          <div className="eu-content">
            <div className="eu-flag">
              <img src={euLogo} alt="European Union Flag" className="eu-flag-img" />
            </div>
            <p className="eu-disclaimer">
              Funded by the European Union. Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the National Agency. Neither the European Union nor National Agency can be held responsible for them.
            </p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="copyright">© {currentYear} IT-ISQS. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 