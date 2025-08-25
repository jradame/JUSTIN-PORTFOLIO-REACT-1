import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdjust } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';

const Navbar = ({ loading, isDarkMode, toggleTheme, toggleModal }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav__logo">
          {loading ? (
            <Skeleton width="150px" height="24px" />
          ) : (
            <span className="nav__logo-text">JUSTIN ADAME</span>
          )}
        </div>
        
        {loading ? (
          <div className="nav__links-skeleton">
            <Skeleton width="60px" height="20px" />
            <Skeleton width="70px" height="20px" />
            <Skeleton width="70px" height="20px" />
            <Skeleton circle width="30px" height="30px" />
          </div>
        ) : (
          <ul className="nav__link--list">
            <li className="nav__link">
              <button className="nav__link--anchor" onClick={toggleModal}>
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
              <button className="nav__link--anchor" onClick={toggleModal}>
                Contact
              </button>
            </li>
            <li className="nav__link click">
              <button 
                className="nav__link--anchor theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
              >
                <FontAwesomeIcon icon={faAdjust} />
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

