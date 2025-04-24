import React, { useState } from 'react';
import '../styles/Syllabus.css';
import syllabusImage from '../assets/syllabus.png'; // Yeni syllabus görseli

const Syllabus = () => {
  // Her haftanın açık/kapalı durumunu tutmak için state
  const [openWeeks, setOpenWeeks] = useState({});

  // Hafta açılıp/kapanması için fonksiyon
  const toggleWeek = (weekNumber) => {
    setOpenWeeks(prev => ({
      ...prev,
      [weekNumber]: !prev[weekNumber]
    }));
  };

  // 14 haftalık syllabus verisi
  const syllabusData = [
    {
      week: 1,
      title: "Introduction to the Course",
      content: [
        "Course overview and objectives",
        "Introduction to key concepts",
        "Setting up the development environment",
        "Assignment: Personal introduction and expectations"
      ]
    },
    {
      week: 2,
      title: "Fundamentals of Web Development",
      content: [
        "HTML5 structure and semantics",
        "CSS3 basics and responsive design",
        "JavaScript fundamentals",
        "Assignment: Create a simple personal webpage"
      ]
    },
    // Hafta 3-14 için boş şablonlar
    ...Array.from({ length: 12 }, (_, i) => ({
      week: i + 3,
      title: `Week ${i + 3} Content`,
      content: [
        "Lecture 1: Topic overview",
        "Lecture 2: Practical applications",
        "Lab exercise: Hands-on implementation",
        "Assignment: Project milestone"
      ]
    }))
  ];

  return (
    <div className="page syllabus-page">
      {/* Banner kısmı */}
      <div className="syllabus-banner">
        <img src={syllabusImage} alt="IT-ISQS Syllabus" className="banner-image" />
      </div>

      {/* İçerik kısmı */}
      <div className="syllabus-content">
        <div className="syllabus-header">
          <h1 className="syllabus-heading">SYLLABUS</h1>
          <div className="syllabus-download">
            <a href="#" className="download-btn">
              <span>Download Syllabus</span> 
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
        
        {/* Açıklayıcı metin */}
        <div className="syllabus-text">
          <p>
            The IT-ISQS course syllabus is designed to offer a comprehensive and innovative approach to teaching international software quality standards (ISQS). Developed through collaboration between academia and industry, the syllabus incorporates gamified learning, real-life case studies, interactive exercises, and AI-supported tools. It aims to equip students with practical skills and theoretical knowledge aligned with ISO/IEC standards, preparing them to meet the quality expectations of modern software engineering.
          </p>
        </div>

        {/* Haftalık syllabus için accordion */}
        <div className="syllabus-weeks">
          {syllabusData.map((week) => (
            <div key={week.week} className="syllabus-week">
              <button 
                className={`week-header ${openWeeks[week.week] ? 'week-open' : ''}`}
                onClick={() => toggleWeek(week.week)}
              >
                <span className="week-title">week {week.week}</span>
                <span className="week-arrow">{openWeeks[week.week] ? '▲' : '▼'}</span>
              </button>
              
              {openWeeks[week.week] && (
                <div className="week-content">
                  <h3>{week.title}</h3>
                  <ul>
                    {week.content.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Syllabus; 