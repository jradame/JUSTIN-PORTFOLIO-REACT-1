import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedin as faLinkedinBrand,
  faGithub as faGithubBrand,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

// You can uncomment this when you have a photo
// import profilePhoto from '../assets/profile-photo.jpg';

const Hero = ({ loading, openModal }) => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content-wrapper">
          <div className="hero-image-container">
            {/*  add image here: */}
            {/* <img src={profilePhoto} alt="Justin Adame" className="hero-photo" /> */}
          </div>

          <div className="hero-text-content">
            {loading ? (
              <>
                <Skeleton height="60px" width="80%" />
                <Skeleton height="30px" width="90%" />
                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                  <Skeleton width="150px" height="50px" />
                  <Skeleton width="150px" height="50px" />
                </div>
              </>
            ) : (
              <>
                <h1 className="hero-title">
                  Hi, I am <span className="blue">JUSTIN ADAME</span>
                </h1>
                <p className="hero-subtitle">
                  A frontend developer eager to apply my skills in building clean, professional, and scalable web applications. I'm passionate about creating great user experiences and growing as a developer.
                </p>
                <div className="hero-buttons">
                  <button
                    className="btn btn-primary"
                    onClick={() => openModal('about')}
                  >
                    About Me
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => openModal('contact')}
                  >
                    Let’s Talk
                  </button>
                </div>
              </>
            )}
            {!loading && (
              <div className="social-links">
                <a href="https://linkedin.com/in/justin-adame" className="social-link" aria-label="LinkedIn">
                  <FontAwesomeIcon icon={faLinkedinBrand} />
                </a>
                <a href="https://github.com/justin-adame" className="social-link" aria-label="GitHub">
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
  );
};

export default Hero;
