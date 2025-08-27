/* 
 * Footer Component - Nice three-column layout that ties everything together
 * Brand info on left, quick nav in middle, contact stuff on right
 * Had to make sure the loading skeletons look good while everything loads
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faFilePdf, faEnvelope, faHeart } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';

const Footer = ({ loading, toggleModal }) => {
  // Auto-updates the year so I don't have to remember to change it every January
  const currentYear = new Date().getFullYear();

  /* 
   * Same smooth scroll function as the navbar - keeps things consistent
   * Nothing worse than jarring page jumps when you click a logo
   */
  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  };

  // Make the brand name clickable and scroll to top
  const handleBrandClick = (e) => {
    e.preventDefault();
    scrollToTop();
  };

  /* 
   * All my social links and resume in one place
   * Easy to update or add new platforms later
   * TODO: Need to upload actual resume and update that link
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
      url: "#", // Need to upload resume PDF and put real link here
      icon: faFilePdf
    }
  ];

  /* 
   * Quick links navigation - Projects scrolls to section, others open modals
   * Keeps the same interaction patterns as the main nav
   */
  const handleQuickLinkClick = (type) => {
    if (type === 'projects') {
      // Scroll to projects instead of opening a modal
      const element = document.getElementById('projects');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // About and Contact open the modal
      toggleModal(type);
    }
  };

  /* 
   * Loading state with skeleton placeholders
   * Keeps the layout stable while everything loads up
   * Made sure the skeleton sizes match the real content
   */
  if (loading) {
    return (
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__content">
            {/* Brand section loading state */}
            <div className="footer__section footer__section--brand">
              <Skeleton width="200px" height="32px" />
              <Skeleton count={2} />
              <div className="footer__social">
                {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} circle width="40px" height="40px" />
                ))}
              </div>
            </div>
            
            {/* Quick links loading state */}
            <div className="footer__section">
              <Skeleton width="100px" height="20px" className="footer__section-title-skeleton" />
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} width="80px" height="16px" className="footer__link-skeleton" />
              ))}
            </div>
            
            {/* Contact section loading state */}
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
           * Left column - Brand stuff and social links
           * Made the brand name clickable like the navbar logo
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
            
            {/* Social media links - opens in new tabs so people don't leave my site */}
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
           * Middle column - Quick navigation
           * Same functionality as the main nav but in footer form
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
           * Right column - Contact info and encouragement
           * Email opens the contact modal instead of default mail app
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
         * Bottom copyright section with animated heart
         * Auto-updates the year and mentions my tech stack
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
