import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './App.css';

// Import all your components
import Hero from './components/Hero';
import Projects from './components/Projects';
import Modal from './components/Modal';
import Footer from './components/Footer';

function App() {
  // --- STATE MANAGEMENT ---
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('about');
  const [modalLoading, setModalLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // --- HANDLERS & LOGIC ---
  useEffect(() => {
    // Apply theme and set up the initial loading timer.
    document.body.classList.toggle('dark-theme', isDarkMode);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [isDarkMode]);

  const toggleTheme = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    document.body.classList.add('theme-transitioning');
    
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
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
    setTimeout(() => setModalLoading(false), 800);
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
          <button className="nav__logo-text" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top">
            Justin Adame
          </button>
          <button className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle navigation menu" aria-expanded={menuOpen}>
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
                <li><button className="nav__link--anchor" onClick={() => openModal('about')}>About</button></li>
                <li><button className="nav__link--anchor" onClick={scrollToProjects}>Projects</button></li>
                <li><button className="nav__link--anchor" onClick={() => openModal('contact')}>Contact</button></li>
                <li>
                  <button className={`theme-toggle ${isDarkMode ? 'theme-toggle--dark' : ''}`} onClick={toggleTheme} disabled={isTransitioning} aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
                    <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} className="theme-toggle__icon" />
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
        {menuOpen && <div className="menu-overlay" onClick={closeMenu} aria-label="Close menu" />}
      </nav>

      {/* RENDER COMPONENTS */}
      <Hero loading={loading} openModal={openModal} />
      <Projects loading={loading} />
      <Footer loading={loading} toggleModal={openModal} />
      <Modal isOpen={modalOpen} onClose={closeModal} loading={modalLoading} modalType={modalType} />
    </div>
  );
}

export default App;











