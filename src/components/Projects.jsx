import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faCode, faPalette } from '@fortawesome/free-solid-svg-icons';

const Projects = ({ loading }) => (
  <section id="projects" className="projects">
    <div className="container projects__sidebyside">
      <div className="projects__side projects__side--icon">
        <FontAwesomeIcon icon={faRocket} className="projects__rocket" />
      </div>
      <div className="projects__side projects__side--content">
        <h2 className="coming-soon__title">
          Amazing Projects <span className="blue">Coming Soon!</span>
        </h2>
        <p className="coming-soon__description">
          I'm currently working on some exciting projects that showcase my skills in <strong>React</strong>, <strong>JavaScript</strong>, and <strong>modern web development</strong>. Check back soon!
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
  </section>
);

export default Projects;




