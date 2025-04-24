import React from 'react';
import '../styles/About.css';
import aboutUsImage from '../assets/about-us.png'; // Yeni banner görseli
import WorldMap from '../components/WorldMap';

const About = () => {
  return (
    <div className="page about-page">
      <div className="about-banner">
        <img src={aboutUsImage} alt="IT-ISQS Community" className="banner-image" />
      </div>

      <div className="about-content">
        <h1 className="about-heading">ABOUT IT-ISQS</h1>
        <div className="about-text">
          <p>
            Innovative Training for International Software Quality Standards (IT-ISQS) is an Erasmus+ cooperation partnership project that aims to address the global lack of awareness and educational coverage regarding international software quality standards (ISQS). Despite the growing dependence on software in nearly all aspects of modern life—from healthcare to finance, education, and entertainment—most software engineering curricula around the world still provide limited exposure to ISO/IEC standards, which are essential for ensuring software quality, reliability, and safety.
          </p>
          <p>
            The IT-ISQS project seeks to close this educational gap by integrating ISQS more deeply into higher education programs. This course will include gamified learning elements, real-life case studies, AI-supported tools, and interactive exercises that reflect real industry practices and challenges.
          </p>
          <p>
            The project methodology includes a comprehensive literature review, stakeholder surveys, expert interviews, and statistical analyses to define the challenges in current educational practices. Based on these findings, the consortium will co-develop a modern course design and pilot test it in partner institutions. Feedback from students, professors, and industry representatives will guide the refinement of the content and teaching methods.
          </p>
          <p>
            Ultimately, IT-ISQS aims to:
          </p>
          <p>
            - Improve the quality and relevance of engineering education
          </p>
          <p>
            - Enhance students’ readiness for the software industry
          </p>
          <p>
            - Promote awareness and understanding of ISO/IEC standards
          </p>
          <p>
            - Support continuous education for software professionals
          </p>
          <p>
            - Encourage international cooperation and exchange of best practices
          </p>
          <p>
            - Through its academic and societal impact, IT-ISQS contributes to building a more knowledgeable, skilled, and globally connected community of software engineers.
          </p>
        </div>

        <h2 className="partnerships-heading">OUR PARTNERSHIPS</h2>
        
        {/* World Map Component */}
        <WorldMap />
        
        <div className="about-text">
          <p>
            The success and impact of the IT-ISQS project are rooted in its strong international partnership model, bringing together distinguished institutions with a shared commitment to advancing software quality education. Coordinated by Çankaya University (Turkey), the consortium includes:
          </p>
          <p>
            - TED University (Ankara, Turkey)
          </p>
          <p>
            - Universidad Francisco de Vitoria (Madrid, Spain)
          </p>
          <p>
            - Open Universiteit (Heerlen, Netherlands)
          </p>
          <p>
            Each partner plays a critical role in contributing academic expertise, pedagogical innovation, and regional perspectives to ensure the project’s excellence and international relevance. This collaborative framework enables joint curriculum development, mutual capacity building, and the integration of ISO/IEC standards into engineering education through state-of-the-art teaching methodologies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About; 