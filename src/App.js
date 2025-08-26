import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faExternalLinkAlt, faGem, faUser } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub as faGithubBrand, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './App.css';
import Modal from './components/Modal';

function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('about');
  const [modalLoading, setModalLoading] = useState(false);

  // Mobile menu state
  const [menuOpen, setMenuOpen] = useState(false);

  // Refs
  const modalRef = useRef();

  // Theme initialization
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }

    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isDarkMode]);

  // Theme toggle function
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

  // Modal functions
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

  // Close mobile menu
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Scroll to projects section
  const scrollToProjects = () => {
    document.querySelector('.projects').scrollIntoView({ behavior: 'smooth' });
    if (menuOpen) setMenuOpen(false); // Close mobile menu
  };

  // **YOUR NFT PROJECT + PLACEHOLDER PROJECTS**
  const projects = [
    {
      icon: faGem,
      title: "NFT Marketplace Landing Page",
      category: "Frontend Development",
      description: "Modern, responsive landing page for Ultraverse NFT marketplace featuring clean UI design, smooth animations, and mobile-first approach with Web3 aesthetics.",
      status: "COMPLETED",
      imageUrl: "/images/NFT-LANDING-PAGE.png", // Your actual screenshot
      githubUrl: "https://github.com/yourusername/nft-landing-page", // Replace with your actual repo
      liveUrl: "https://your-nft-demo.netlify.app", // Replace with your actual deployed site
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "UI/UX"]
    },
    {
      icon: faGem,
      title: "Dashboard Application", 
      category: "Frontend",
      description: "Interactive data visualization and analytics dashboard with real-time updates, charts, and responsive design for business intelligence.",
      status: "COMING SOON",
      imageUrl: "https://via.placeholder.com/370x270/3b82f6/ffffff?text=Dashboard+Coming+Soon",
      githubUrl: "https://github.com/yourusername/dashboard-project",
      liveUrl: null,
      technologies: ["React", "Chart.js", "CSS3"]
    },
    {
      icon: faGem,
      title: "E-commerce Platform",
      category: "Full Stack", 
      description: "Complete e-commerce solution with user authentication, payment processing, and admin dashboard built with modern technologies.",
      status: "COMING SOON",
      imageUrl: "https://via.placeholder.com/370x270/06b6d4/ffffff?text=E-commerce+Coming+Soon",
      githubUrl: "https://github.com/yourusername/ecommerce-project",
      liveUrl: null,
      technologies: ["React", "Node.js", "MongoDB"]
    }
  ];

  return (
    <div className="App">
      {/* NAVBAR WITH HAMBURGER MENU */}
      <nav className="navbar">
        <div className="nav-container">
          <button 
            className="nav__logo-text"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
          >
            Justin Adame
          </button>

          {/* HAMBURGER MENU BUTTON */}
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

          {/* NAVIGATION LINKS - WITH PROJECTS LINK ADDED */}
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

        {/* MOBILE MENU OVERLAY */}
        {menuOpen && (
          <div 
            className="menu-overlay" 
            onClick={closeMenu}
            aria-label="Close menu"
          />
        )}
      </nav>

      {/* HERO SECTION */}
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

      {/* PROJECTS SECTION - FULL IMAGE CONTAINER FIX */}
      <section className="projects">
        <div className="projects__container">
          <h2 className="section__title">
            My <span className="blue">Projects</span>
          </h2>
          <div className="projects__cards">
            {loading ? (
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
              projects.map((project, index) => (
                <div key={index} className="project-block">
                  {/* IMAGE CONTAINER: shows full image without cropping */}
                  <div className="project-image-container">
                    <img 
                      src={project.imageUrl}
                      alt={`${project.title} screenshot`}
                      className="project-image-simple"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.target.src = `https://via.placeholder.com/370x270/3b82f6/ffffff?text=${encodeURIComponent(project.title)}`;
                      }}
                    />
                  </div>
                  {/* INFORMATION BELOW - CENTERED */}
                  <div className="project-simple-info">
                    <h3 className="project-simple-title">{project.title}</h3>
                    <p className="project-simple-desc">{project.description}</p>
                    <div className="project-simple-links">
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

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__content">
            {/* Brand Section */}
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

            {/* Quick Links */}
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

            {/* Contact Info */}
            <div className="footer__section">
              <h4 className="footer__section-title">Get In Touch</h4>
              <div className="footer__contact">
                <a 
                  href="mailto:your.email@example.com" 
                  className="footer__contact-item"
                  aria-label="Send email"
                >
                  <FontAwesomeIcon icon={faUser} />
                  your.email@example.com
                </a>
                <p className="footer__contact-text">
                  Let's connect and build something amazing together!
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="footer__bottom">
            <div className="footer__copyright">
              <p>
                © 2025 Justin Adame. Made with <span className="footer__heart">♥</span> using React & CSS.
              </p>
            </div>
          </div>
        </div>
      </footer>

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




