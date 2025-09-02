import React from 'react';
import Skeleton from 'react-loading-skeleton';

const Hero = ({ loading, openModal }) => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content-wrapper">
          <div className="hero-image-container">
            {/* Ready for your photo when you are */}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
