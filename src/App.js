/*
 * App.js - Main React component that ties everything together
 * This is where all the magic happens - theme switching, modal management, 
 * navigation handling, and all the main sections of my portfolio
 * Took a while to get the state management right but it's solid now
 */

import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faExternalLinkAlt, faGem, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub as faGithubBrand, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './App.css';
import Modal from './components/Modal';

function App() {
  /*
   * THEME STATE MANAGEMENT
   * Using localStorage to remember user's preference - nobody likes having to 
   * switch themes every time they visit
   */
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Loading state - shows skeleton placeholders while everything loads
  const [loading, setLoading] = useState(true);

  /*
   * MODAL STATE MANAGEMENT
   * Controls which modal is open (about/contact) and loading states
   * The loading state gives that nice delay effect when opening modals
   */
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('about');
  const [modalLoading, setModalLoading] = useState(false);

  // Mobile menu state - hamburger menu toggle
  const [menuOpen, setMenuOpen] = useState(false);

  // Refs for any DOM manipulation needs
  const modalRef = useRef();

  /*
   * Theme initialization and setup
   * Adds/removes theme classes from body and simulates loading time
   * The 2 second loading gives a nice polish feel to the site
   */
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

  /*
   * Theme toggle with smooth transitions
   * Prevents rapid clicking and adds transition class to disable animations
   * during theme switch - prevents weird flickering effects
   */
  const toggleTheme = () => {
    if (isTransitioning) return; // Don't allow spam clicking

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

    // Re-enable transitions after theme switch is complete
    setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
      setIsTransitioning(false);
    }, 300);
  };

  /*
   * Modal management functions
   * openModal sets type, shows loading spinner, then reveals content
   * Also closes mobile menu if it's open
   */
  const openModal = (type) => {
    setModalType(type);
    setModalLoading(true);
    setModalOpen(true);
    setMenuOpen(false); // Close mobile menu when opening modal

    setTimeout(() => {
      setModalLoading(false);
    }, 800);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalLoading(false);
  };

  // Mobile menu helpers
  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Smooth scroll to projects section - used by nav and footer
  const scrollToProjects = () => {
    document.querySelector('.projects').scrollIntoView({ behavior: 'smooth' });
    if (menuOpen) setMenuOpen(false); // Close mobile menu after navigation
  };

  /*
   * PROJECTS DATA
   * My actual projects with the CORRECT live URLs (finally fixed that!)
   * Ultraverse is live, others are placeholders for future projects
   */
  const projects = [
    {
      icon: faGem,
      title: "Ultraverse NFT Marketplace",
      category: "Frontend Development",
      description: "Built this React NFT marketplace from scratch with dark/light themes and smooth navigation. Pretty happy with how clean it turned out.",
      status: "COMPLETED",
      imageUrl: "/images/NFT-LANDING-PAGE.png",
      githubUrl: "https://github.com/jradame/ultraverse-nft-project",
      liveUrl: "https://ultraverse-nft-project.vercel.app/", // ✅ The URL that actually works now
      technologies: ["React", "CSS3", "JavaScript", "React Router", "Vercel"]
    },
    {
      icon: faGem,
      title: "Dashboard Application", 
      category: "Frontend",
      description: "Interactive data visualization and analytics dashboard with real-time updates, charts, and responsive design for business intelligence.",
      status: "COMING SOON",
      imageUrl: "https://via.placeholder.com/370x270/3b82f6/ffffff?text=Dashboard+Coming+Soon",
      githubUrl: "https://github.com/yourusername/dashboard-project", // TODO: Update with real repo
      liveUrl: null, // No live demo yet
      technologies: ["React", "Chart.js", "CSS3"]
    },
    {
      icon: faGem,
      title: "E-Commerce Platform",
      category: "Full Stack", 
      description: "Complete e-commerce solution with user authentication, payment processing, and admin dashboard built with modern technologies.",
      status: "COMING SOON",
      imageUrl: "https://via.placeholder.com/370x270/06b6d4/ffffff?text=E-commerce+Coming+Soon",
      githubUrl: "https://github.com/yourusername/ecommerce-project", // TODO: Update with real repo
      liveUrl: null, // No live demo yet
      technologies: ["React", "Node.js", "MongoDB"]
    }
  ];

  return (
    <div className="App">
      {/* NAVBAR - Fixed header with hamburger menu for mobile */}
      <nav className="navbar">
        <div className="nav-container">
          <button 
            className="nav__logo-text"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
          >
            Justin Adame
          </button>
          
          {/* Hamburger menu - only visible on mobile */}
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
          
          {/* Navigation links with loading skeletons */}
          <ul className={`nav__link--list ${menuOpen ? 'open' : ''}`}>
            {loading ? (
              // Show skeleton placeholders while loading
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
                  {/* Theme toggle button with sun/moon icons */}
                  <button
                    className={`theme-toggle ${isDarkMode ? 'theme-toggle--dark' : ''}`}
                    onClick={toggleTheme}
                    disabled={isTransitioning} // Prevent spam clicking
                    aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                  >
                    <FontAwesomeIcon 
                      icon={isDarkMode ? faSun : faMoon} 
                      className="theme-toggle__icon"
                    />
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
        
        {/* Mobile menu overlay - closes menu when clicking outside */}
        {menuOpen && (
          <div 
            className="menu-overlay" 
            onClick={closeMenu}
            aria-label="Close menu"
          />
        )}
      </nav>

      {/* HERO SECTION - Main intro with gradient background */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-image">
              {loading ? (
                <Skeleton circle width="280px" height="280px" />
              ) : (
                <img 
                  src="https://via.placeholder.com/280x280/3b82f6/ffffff?text=JA" 
                  alt="Justin Adame" 
                  className="hero-headshot"
                />
              )}
            </div>
            <div className="hero-text">
              {loading ? (
                // Loading skeletons that match the real content layout
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
                    <button className="btn btn-primary" onClick={() => openModal('about')}>
                      About Me
                    </button>
                    <button className="btn btn-secondary" onClick={() => openModal('contact')}>
                      Let's Talk
                    </button>
                  </div>
                </>
              )}
              
              {/* Social links - only show after loading */}
              {!loading && (
                <div className="social-links">
                  <a
                    href="https://linkedin.com/in/justin-adame"
                    className="social-link"
                    aria-label="LinkedIn Profile"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                  <a
                    href="https://github.com/justin-adame"
                    className="social-link"
                    aria-label="GitHub Profile"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faGithubBrand} />
                  </a>
                  <a
                    href="https://twitter.com/justin_adame"
                    className="social-link"
                    aria-label="Twitter Profile"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION - My work showcase */}
      <section className="projects">
        <div className="projects__container">
          <h2 className="section__title">
            My <span className="blue">Projects</span>
          </h2>
          <div className="projects__cards">
            {loading ? (
              // Loading state with skeleton placeholders
              [...Array(3)].map((_, index) => (
                <div key={index} className="project-block">
                  <div className="project-image-container">
                    <Skeleton height="270px" className="project-image-simple" />
                  </div>
                  <div className="project-simple-info">
                    <Skeleton width="70%" height="20px" />
                    <Skeleton count={2} />
                    <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.6rem', justifyContent: 'center' }}>
                      <Skeleton width="80px" height="28px" />
                      <Skeleton width="60px" height="28px" />
                    </div>
                    <div style={{ display: 'flex', gap: '0.3rem', marginTop: '0.6rem', justifyContent: 'center' }}>
                      <Skeleton width="45px" height="16px" />
                      <Skeleton width="45px" height="16px" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Actual project cards
              projects.map((project, index) => (
                <div key={index} className="project-block">
                  <div className="project-image-container">
                    <img
                      src={project.imageUrl}
                      alt={`${project.title} screenshot`}
                      className="project-image-simple"
                      onError={e => {
                        // Fallback to placeholder if image fails to load
                        e.target.src = `https://via.placeholder.com/370x270/3b82f6/ffffff?text=${encodeURIComponent(project.title)}`;
                      }}
                    />
                  </div>
                  <div className="project-simple-info">
                    <h3 className="project-simple-title">{project.title}</h3>
                    <p className="project-simple-desc">{project.description}</p>
                    <div className="project-simple-links">
                      {/* Only show Live Demo button if there's actually a live URL */}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-simple-btn"
                        >
                          <FontAwesomeIcon icon={faExternalLinkAlt} />
                          Live Demo
                        </a>
                      )}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-simple-btn project-simple-btn-github"
                      >
                        <FontAwesomeIcon icon={faGithubBrand} />
                        GitHub
                      </a>
                    </div>
                    <div className="project-simple-tags">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="project-simple-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* FOOTER - Three column layout with links and contact info */}
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__content">
            {/* Brand section */}
            <div className="footer__section--brand">
              <h3 className="footer__brand">Justin Adame</h3>
              <p className="footer__description">
                Frontend Developer passionate about creating beautiful, user-friendly web experiences with modern technologies.
              </p>
              <div className="footer__social">
                <a
                  href="https://linkedin.com/in/justin-adame"
                  className="footer__social-link"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a
                  href="https://github.com/justin-adame"
                  className="footer__social-link"
                  aria-label="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faGithubBrand} />
                </a>
                <a
                  href="https://twitter.com/justin_adame"
                  className="footer__social-link"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </div>
            </div>
            
            {/* Quick links section */}
            <div className="footer__section">
              <h4 className="footer__section-title">Quick Links</h4>
              <ul className="footer__links">
                <li>
                  <button className="footer__link" onClick={() => openModal('about')}>
                    About
                  </button>
                </li>
                <li>
                  <button className="footer__link" onClick={scrollToProjects}>
                    Projects
                  </button>
                </li>
                <li>
                  <button className="footer__link" onClick={() => openModal('contact')}>
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Contact section */}
            <div className="footer__section">
              <h4 className="footer__section-title">Get In Touch</h4>
              <div className="footer__contact">
                <a
                  href="mailto:your.email@example.com" // TODO: Update with real email
                  className="footer__contact-item"
                  aria-label="Send email"
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                  your.email@example.com
                </a>
                <p className="footer__contact-text">
                  Let's connect and build something amazing together!
                </p>
              </div>
            </div>
          </div>
          
          {/* Copyright section */}
          <div className="footer__bottom">
            <div className="footer__copyright">
              <p>
                © 2025 Justin Adame. Made with <span className="footer__heart">♥</span> using React & CSS.
              </p>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Modal component - handles both about and contact modals */}
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


