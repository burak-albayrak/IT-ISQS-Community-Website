import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import About from './pages/About';
import ProjectResults from './pages/ProjectResults';
import EmailVerification from './pages/EmailVerification';
import ContactUs from './pages/ContactUs';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<div className="page">Home Page</div>} />
              <Route path="/about" element={<About />} />
              <Route path="/syllabus" element={<div className="page">Syllabus Page</div>} />
              <Route path="/blog" element={<div className="page">Blog Page</div>} />
              <Route path="/forum" element={<div className="page">Forum Page</div>} />
              <Route path="/project-results" element={<ProjectResults />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify-email" element={<EmailVerification />} />
              <Route path="/profile" element={<div className="page">Profile Page</div>} />
              <Route path="/privacy-policy" element={<div className="page">Privacy & Policy Page</div>} />
              <Route path="/terms" element={<div className="page">Terms of Service Page</div>} />
              <Route path="/cookie-settings" element={<div className="page">Cookie Settings Page</div>} />
              <Route path="/faqs" element={<div className="page">FAQs Page</div>} />
              <Route path="*" element={<div className="page">404 Not Found</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
