import React, { useState, useEffect } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import Projects from './components/Projects';
import Footer from './components/Footer';
import ScrollReveal from './components/ScrollReveal'; // Add this import
import './App.css';

// Enhanced Hero Component with ScrollReveal
const Hero = ({ data, loading, toggleModal }) => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <ScrollReveal direction="left" delay={200}>
            <div className="hero-image">
              {loading ? (
                <Skeleton circle width={280} height={280} />
              ) : (
                <img 
                  src="/assets/headshot.jpg" 
                  alt="Justin Adame - Frontend Developer"
                  className="hero-headshot"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}
            </div>
          </ScrollReveal>

          <div className="hero-text">
            <ScrollReveal direction="right" delay={400}>
              <h1 className="hero-title">
                Hi <span className="wave">👋</span>
              </h1>
            </ScrollReveal>
            
            <ScrollReveal direction="right" delay={600}>
              <h1 className="hero-title blue">
                {loading ? (
                  <Skeleton width="300px" height="60px" />
                ) : (
                  `I'm ${data?.name}.`
                )}
              </h1>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={800}>
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
            </ScrollReveal>

            <ScrollReveal direction="up" delay={1000}>
              <div className="hero-buttons">
                {loading ? (
                  <>
                    <Skeleton width="160px" height="55px" />
                    <Skeleton width="140px" height="55px" />
                  </>
                ) : (
                  <>
                    <button 
                      className="btn btn-primary"
                      onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
                    >
                      View My Work
                    </button>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => toggleModal('contact')}
                    >
                      Get In Touch
                    </button>
                  </>
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="scale" delay={1200}>
              <div className="social-links">
                {loading ? (
                  <>
                    <Skeleton circle width={50} height={50} />
                    <Skeleton circle width={50} height={50} />
                    <Skeleton circle width={50} height={50} />
                  </>
                ) : (
                  <>
                    <a 
                      href="https://www.linkedin.com/in/justin-adame-022b6b97/" 
                      className="social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn Profile"
                    >
                      <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                    <a 
                      href="https://github.com/jradame" 
                      className="social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub Profile"
                    >
                      <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a 
                      href="#" 
                      className="social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Resume PDF"
                    >
                      <FontAwesomeIcon icon={faFilePdf} />
                    </a>
                  </>
                )}
              </div>
            </ScrollReveal>
          </div>
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
  // ... all your existing state management stays the same ...
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('about');
  const [isThemeTransitioning, setIsThemeTransitioning] = useState(false);

  // ... all your existing useEffect hooks stay the same ...
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setIsThemeTransitioning(true);
    
    setTimeout(() => {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      
      if (newTheme) {
        document.documentElement.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      }
      
      setTimeout(() => setIsThemeTransitioning(false), 100);
    }, 50);
  };

  const toggleModal = (type = 'about') => {
    setModalType(type);
    setIsModalOpen(prev => !prev);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // ... rest of your existing functions ...

  return (
    <SkeletonTheme 
      baseColor={isDarkMode ? "#1e293b" : "#f3f4f6"} 
      highlightColor={isDarkMode ? "#334155" : "#e5e7eb"}
    >
      <div className={`App ${isDarkMode ? 'dark-theme' : ''} ${isThemeTransitioning ? 'theme-transitioning' : ''}`}>
        <Navbar 
          loading={loading}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme} 
          toggleModal={toggleModal}
        />

        <main>
          <Hero data={portfolioData} loading={loading} toggleModal={toggleModal} />
          
          {/* Projects with ScrollReveal */}
          <ScrollReveal direction="up" delay={100}>
            <Projects loading={loading} />
          </ScrollReveal>
        </main>

        {/* Footer with ScrollReveal */}
        <ScrollReveal direction="up" delay={200}>
          <Footer loading={loading} toggleModal={toggleModal} />
        </ScrollReveal>

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


