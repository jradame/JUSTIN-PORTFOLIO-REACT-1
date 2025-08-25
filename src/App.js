import React, { useState, useEffect } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import Projects from './components/Projects';
import './App.css';

// Hero Component (inline)
const Hero = ({ data, loading }) => {
  return (
    <section className="hero">
      <div className="hero-container">
        <h1 className="hero-title">
          Hi <span className="wave">👋</span>
        </h1>
        
        <h1 className="hero-title blue">
          {loading ? (
            <Skeleton width="350px" height="80px" />
          ) : (
            `I'm ${data?.name}.`
          )}
        </h1>
        
        <p className="hero-subtitle">
          {loading ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton width="80%" />
            </>
          ) : (
            <>
              {data?.description}
              <br />
              <br />
              Here's a little more <span className="highlight">about me.</span>
            </>
          )}
        </p>

        <div className="hero-buttons">
          {loading ? (
            <>
              <Skeleton width="160px" height="55px" />
              <Skeleton width="140px" height="55px" />
            </>
          ) : (
            <>
              <button className="btn btn-primary">View My Work</button>
              <button className="btn btn-secondary">Get In Touch</button>
            </>
          )}
        </div>

        <div className="social-links">
          {loading ? (
            <>
              <Skeleton circle width={50} height={50} />
              <Skeleton circle width={50} height={50} />
              <Skeleton circle width={50} height={50} />
            </>
          ) : (
            <>
              <a href="https://www.linkedin.com/in/justin-adame-022b6b97/" className="social-link">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a href="https://github.com/jradame" className="social-link">
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a href="#" className="social-link">
                <FontAwesomeIcon icon={faFilePdf} />
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

// Portfolio data
const portfolioData = {
  name: "Justin",
  description: "I'm a passionate Frontend Developer focused on building responsive, user-friendly web interfaces with modern technologies like React, JavaScript, and CSS."
};

function App() {
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('about');

  // Simulate loading for 1.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
    document.body.classList.toggle('dark-theme');
  };

  // Modal toggle with type
  const toggleModal = (type = 'about') => {
    setModalType(type);
    setIsModalOpen(prev => !prev);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <SkeletonTheme 
      baseColor={isDarkMode ? "#2d3748" : "#f3f3f3"} 
      highlightColor={isDarkMode ? "#4a5568" : "#ecebeb"}
    >
      <div className={`App ${isDarkMode ? 'dark-theme' : ''}`}>
        <Navbar 
          loading={loading}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme} 
          toggleModal={toggleModal}
        />
        <Hero data={portfolioData} loading={loading} />
        <Projects loading={loading} />
        <Modal 
          isOpen={isModalOpen} 
          onClose={closeModal} 
          loading={loading}
          modalType={modalType}
        />
      </div>
    </SkeletonTheme>
  );
}

export default App;

