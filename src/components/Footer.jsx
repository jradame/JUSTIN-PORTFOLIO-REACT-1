/* 
 * Footer Component - Three-column layout with brand, quick links, and contact
 * Includes loading states, smooth scrolling, and modal interactions
 * Designed to match the rest of the app's theme system and responsive design
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faFilePdf, faEnvelope, faHeart } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';

const Footer = ({ loading, toggleModal }) => {
  // Dynamic year for copyright - keeps the footer current automatically
  const currentYear = new Date().getFullYear();

  /* 
   * Smooth scroll to top functionality
   * Same behavior as the navbar logo - creates consistent UX
   */
  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  };

  /* 
   * Handle brand logo clicks
   * Prevents default behavior and smoothly scrolls to top
   */
  const handleBrandClick = (e) => {
    e.preventDefault();
    scrollToTop();
  };

  /* 
   * Social media and resume links
   * Centralized data makes it easy to update links or add new ones
   */
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/justin-adame-022b6b97/",
      icon: faLinkedinIn
    },
    {
      name: "GitHub", 
      url: "https://github.com/jradame",
      icon: faGithub
    },
    {
      name: "Resume",
      url: "#", // Update this with actual resume link
      icon: faFilePdf
    }
  ];

  /* 
   * Handle navigation from footer quick links
   * Projects scrolls to section, others open modals
   */
  const handleQuickLinkClick = (type) => {
    if (type === 'projects') {
      // Scroll to projects section instead of opening modal
      const element = document.getElementById('projects');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Open modal for about/contact
      toggleModal(type);
    }
  };

  /* 
   * Loading state with skeleton placeholders
   * Maintains layout structure while content loads
   * Uses consistent skeleton styling with rest of app
   */
  if (loading) {
    return (
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__content">
            {/* Brand section skeleton */}
            <div className="footer__section footer__section--brand">
              <Skeleton width="200px" height="32px" />
              <Skeleton count={2} />
              <div className="footer__social">
                {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} circle width="40px" height="40px" />
                ))}
              </div>
            </div>
            
            {/* Quick links skeleton */}
            <div className="footer__section">
              <Skeleton width="100px" height="20px" className="footer__section-title-skeleton" />
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} width="80px" height="16px" className="footer__link-skeleton" />
              ))}
            </div>
            
            {/* Contact section skeleton */}
            <div className="footer__section">
              <Skeleton width="120px" height="20px" className="footer__section-title-skeleton" />
              <Skeleton width="200px" height="16px" />
              <Skeleton width="180px" height="16px" />
            </div>
          </div>
          
          <div className="footer__bottom">
            <Skeleton width="300px" height="16px" />
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          {/* 
           * Brand Section (Left Column)
           * Clickable brand name, description, and social links
           */}
          <div className="footer__section footer__section--brand">
            <button
              className="footer__brand footer__brand-button"
              onClick={handleBrandClick}
              type="button"
              aria-label="Scroll to top"
            >
              Justin Adame
            </button>
            <p className="footer__description">
              Frontend Developer passionate about creating beautiful, user-friendly web experiences with modern technologies.
            </p>
            
            {/* Social media links with proper accessibility */}
            <div className="footer__social">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="footer__social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  title={link.name}
                >
                  <FontAwesomeIcon icon={link.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* 
           * Quick Links (Center Column)
           * Navigation shortcuts to main sections
           */}
          <div className="footer__section">
            <h4 className="footer__section-title">Quick Links</h4>
            <ul className="footer__links">
              <li>
                <button 
                  className="footer__link"
                  onClick={() => handleQuickLinkClick('about')}
                  aria-label="Open About section"
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  className="footer__link"
                  onClick={() => handleQuickLinkClick('projects')}
                  aria-label="Go to Projects section"
                >
                  Projects
                </button>
              </li>
              <li>
                <button 
                  className="footer__link"
                  onClick={() => handleQuickLinkClick('contact')}
                  aria-label="Open Contact section"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* 
           * Contact Info (Right Column)
           * Direct contact access and encouragement text
           */}
          <div className="footer__section">
            <h4 className="footer__section-title">Get In Touch</h4>
            <div className="footer__contact">
              <button 
                className="footer__contact-item"
                onClick={() => toggleModal('contact')}
                aria-label="Open contact modal"
              >
                <FontAwesomeIcon icon={faEnvelope} />
                <span>your.email@example.com</span>
              </button>
              <p className="footer__contact-text">
                Let's connect and build something amazing together!
              </p>
            </div>
          </div>
        </div>

        {/* 
         * Bottom Section
         * Copyright with animated heart and tech stack mention
         */}
        <div className="footer__bottom">
          <div className="footer__copyright">
            <p>
              © {currentYear} Justin Adame. Made with{' '}
              <FontAwesomeIcon icon={faHeart} className="footer__heart" />{' '}
              using React & CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


