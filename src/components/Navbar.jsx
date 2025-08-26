import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ loading, isDarkMode, toggleTheme, toggleModal }) => {
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  };

  // Handle brand click
  const handleBrandClick = (e) => {
    e.preventDefault();
    scrollToTop();
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${isDarkMode ? 'navbar--dark' : ''}`}>
      <div className="nav-container">
        <div className="nav__logo">
          {loading ? (
            <Skeleton width="150px" height="24px" />
          ) : (
            <button
              className="nav__logo-text nav__logo-button"
              onClick={handleBrandClick}
              type="button"
            >
              JUSTIN ADAME
            </button>
          )}
        </div>
        
        {loading ? (
          <div className="nav__links-skeleton">
            <Skeleton width="60px" height="20px" />
            <Skeleton width="70px" height="20px" />
            <Skeleton width="70px" height="20px" />
            <Skeleton circle width="40px" height="40px" />
          </div>
        ) : (
          <ul className="nav__link--list">
            <li className="nav__link">
              <button 
                className="nav__link--anchor" 
                onClick={() => toggleModal('about')}
              >
                About
              </button>
            </li>
            <li className="nav__link">
              <button 
                className="nav__link--anchor"
                onClick={() => scrollToSection('projects')}
              >
                Projects
              </button>
            </li>
            <li className="nav__link">
              <button 
                className="nav__link--anchor" 
                onClick={() => toggleModal('contact')}
              >
                Contact
              </button>
            </li>
            <li className="nav__link">
              <button 
                className={`nav__link--anchor theme-toggle ${isDarkMode ? 'theme-toggle--dark' : ''}`}
                onClick={toggleTheme}
                aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              >
                <FontAwesomeIcon 
                  icon={isDarkMode ? faSun : faMoon} 
                  className="theme-toggle__icon"
                />
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;



