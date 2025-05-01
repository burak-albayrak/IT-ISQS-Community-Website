import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import About from './pages/About';
import ProjectResults from './pages/ProjectResults';
import Syllabus from './pages/Syllabus';
import EmailVerification from './pages/EmailVerification';
import ContactUs from './pages/ContactUs';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Forum from './pages/Forum';
import SelectedForumPage from './pages/SelectedForumPage';
import Home from './pages/Home';
import MeetUp from './pages/MeetUp';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/syllabus" element={<Syllabus />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/forum/post/:postId" element={<SelectedForumPage />} />
              <Route path="/project-results" element={<ProjectResults />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/meet-up" element={<MeetUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify-email" element={<EmailVerification />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
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
