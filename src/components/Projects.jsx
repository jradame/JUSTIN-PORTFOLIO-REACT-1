import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faCode, faPalette } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';

const Projects = ({ loading }) => {
  return (
    <section id="projects" className="projects">
      <div className="projects__wrapper">
        <h1 className="section__title">
          Here are a few of my <span className="blue">projects</span>
        </h1>
        
        {loading ? (
          <div className="projects__loading">
            <Skeleton height={300} style={{ marginBottom: '2rem' }} />
            <Skeleton height={60} width="300px" style={{ margin: '0 auto 1rem' }} />
            <Skeleton height={20} width="500px" style={{ margin: '0 auto' }} />
          </div>
        ) : (
          <div className="projects__content">
            <div className="projects__icon-container">
              <FontAwesomeIcon icon={faRocket} className="projects__rocket" />
            </div>
            
            <div className="projects__text-container">
              <h2 className="coming-soon__title">
                Amazing Projects <span className="blue">Coming Soon!</span>
              </h2>
              
              <p className="coming-soon__description">
                I'm currently working on some exciting projects that showcase my skills in 
                <strong> React</strong>, <strong>JavaScript</strong>, and <strong>modern web development</strong>. 
                Check back soon!
              </p>
              
              <div className="coming-soon__features">
                <div className="feature">
                  <FontAwesomeIcon icon={faCode} className="feature__icon" />
                  <h3>Full-Stack Apps</h3>
                </div>
                
                <div className="feature">
                  <FontAwesomeIcon icon={faPalette} className="feature__icon" />
                  <h3>Beautiful UI/UX</h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;






