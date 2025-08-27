/* 
 * Navbar Component - Simple sticky header with dark mode toggle
 * Brand name scrolls to top, nav links either open modals or scroll to sections
 * Theme toggle switches between light/dark mode with smooth transitions
 */

import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ loading, isDarkMode, toggleTheme, toggleModal }) => {
  // Same smooth scroll function used throughout the site - consistency is key
  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  };

  // Make the brand name clickable to scroll to top - standard UX pattern
  const handleBrandClick = (e) => {
    e.preventDefault();
    scrollToTop();
  };

  // Smooth scroll to any section by ID - used for Projects link
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
            // Loading skeleton for brand name
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
          // Skeleton placeholders for nav links while loading
          <div className="nav__links-skeleton">
            <Skeleton width="60px" height="20px" />
            <Skeleton width="70px" height="20px" />
            <Skeleton width="70px" height="20px" />
            <Skeleton circle width="40px" height="40px" />
          </div>
        ) : (
          <ul className="nav__link--list">
            {/* About and Contact open modals */}
            <li className="nav__link">
              <button 
                className="nav__link--anchor" 
                onClick={() => toggleModal('about')}
              >
                About
              </button>
            </li>
            {/* Projects scrolls to section instead of opening modal */}
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
            {/* Theme toggle - sun for dark mode, moon for light mode */}
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




