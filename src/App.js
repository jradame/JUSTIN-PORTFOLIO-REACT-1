/*
 * App.js - Main React component tying everything together
 * Added missing import for faCalendarAlt used in project placeholders
 */

/*
 * App.js - Main React component tying everything together
 */

/*
 * App.js - Main React component tying everything together
 */

import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faMoon,
  faExternalLinkAlt,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin as faLinkedinBrand, faGithub as faGithubBrand, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './App.css';
import Modal from './components/Modal';
import Footer from './components/Footer';
import Projects from './components/Projects';   // ✅ Use Projects component for project data

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('about');
  const [modalLoading, setModalLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const modalRef = useRef();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isDarkMode]);

  const toggleTheme = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    document.body.classList.add('theme-transitioning');

    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    if (newTheme) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }

    setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
      setIsTransitioning(false);
    }, 300);
  };

  const openModal = (type) => {
    setModalType(type);
    setModalLoading(true);
    setModalOpen(true);
    setMenuOpen(false);

    setTimeout(() => {
      setModalLoading(false);
    }, 800);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalLoading(false);
  };

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const scrollToProjects = () => {
    document.querySelector('.projects').scrollIntoView({ behavior: 'smooth' });
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <div className="App">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-container">
          <button 
            className="nav__logo-text"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
          >
            Justin Adame
          </button>
          <button 
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          <ul className={`nav__link--list ${menuOpen ? 'open' : ''}`}>
            {loading ? (
              <div className="nav__links-skeleton">
                <Skeleton width="60px" height="20px" />
                <Skeleton width="70px" height="20px" />
                <Skeleton width="70px" height="20px" />
                <Skeleton circle width="44px" height="44px" />
              </div>
            ) : (
              <>
                <li>
                  <button 
                    className="nav__link--anchor"
                    onClick={() => openModal('about')}
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    className="nav__link--anchor"
                    onClick={scrollToProjects}
                  >
                    Projects
                  </button>
                </li>
                <li>
                  <button 
                    className="nav__link--anchor"
                    onClick={() => openModal('contact')}
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button
                    className={`theme-toggle ${isDarkMode ? 'theme-toggle--dark' : ''}`}
                    onClick={toggleTheme}
                    disabled={isTransitioning}
                    aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                  >
                    <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} className="theme-toggle__icon" />
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
        {menuOpen && <div className="menu-overlay" onClick={closeMenu} aria-label="Close menu" />}
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-image">
              {loading ? <Skeleton circle width="280px" height="280px" /> : (
                <img 
                  src="https://via.placeholder.com/280x280/3b82f6/ffffff?text=JA" 
                  alt="Justin Adame" 
                  className="hero-headshot"
                />
              )}
            </div>
            <div className="hero-text">
              {loading ? (
                <>
                  <Skeleton height="60px" width="80%" />
                  <Skeleton height="30px" width="90%" />
                  <Skeleton height="20px" count={3} />
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                    <Skeleton width="150px" height="50px" />
                    <Skeleton width="150px" height="50px" />
                  </div>
                </>
              ) : (
                <>
                  <h1 className="hero-title">
                    Hey, I'm <span className="blue">Justin Adame</span> <span className="wave">👋</span>
                  </h1>
                  <p className="hero-subtitle">
                    A <span className="highlight">Frontend Developer</span> passionate about creating 
                    amazing web experiences with modern technologies.
                  </p>
                  <div className="hero-buttons">
                    <button className="btn btn-primary" onClick={() => openModal('about')}>About Me</button>
                    <button className="btn btn-secondary" onClick={() => openModal('contact')}>Let's Talk</button>
                  </div>
                </>
              )}
              {!loading && (
                <div className="social-links">
                  <a href="https://linkedin.com/in/justin-adame" className="social-link" aria-label="LinkedIn">
                    <FontAwesomeIcon icon={faLinkedinBrand} />
                  </a>
                  <a href="https://github.com/jradame" className="social-link" aria-label="GitHub">
                    <FontAwesomeIcon icon={faGithubBrand} />
                  </a>
                  <a href="https://twitter.com/justin_adame" className="social-link" aria-label="Twitter">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <Projects loading={loading} />   {/* ✅ Projects handled in its own component */}

      {/* FOOTER */}
      <Footer loading={loading} toggleModal={openModal} />

      {/* MODAL */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        loading={modalLoading}
        modalType={modalType}
        ref={modalRef}
      />
    </div>
  );
}

export default App;






