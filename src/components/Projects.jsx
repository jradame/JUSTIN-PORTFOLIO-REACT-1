import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';

const Projects = ({ loading }) => {
  const projects = [
    {
      id: 1,
      title: "Car Sales Project",
      subtitle: "HTML, CSS, JavaScript",
      description: "A responsive car sales website featuring modern design principles, interactive filtering, and smooth animations built with vanilla JavaScript.",
      image: "/assets/desktopmockup.png",
      github: "#",
      live: "#"
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="row">
          <h1 className="section__title">
            Here are a few of my <span className="blue">projects</span>
          </h1>
          
          <ul className="project__list">
            {loading ? (
              Array(2).fill(0).map((_, index) => (
                <li key={index} className="project">
                  <div className="project__wrapper">
                    <Skeleton height={250} />
                    <div className="project__description" style={{ position: 'static', opacity: 1, transform: 'none', padding: '1.5rem' }}>
                      <h3><Skeleton width="70%" /></h3>
                      <h4><Skeleton width="50%" /></h4>
                      <p><Skeleton count={2} /></p>
                      <div style={{ marginTop: '1rem' }}>
                        <Skeleton width={30} height={30} style={{ marginRight: '1rem' }} />
                        <Skeleton width={30} height={30} />
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              projects.map((project) => (
                <li key={project.id} className="project">
                  <div className="project__wrapper">
                    <img 
                      src={project.image} 
                      className="project__img" 
                      alt={project.title}
                    />
                    <div className="project__wrapper--bg"></div>
                    <div className="project__description">
                      <h3 className="project__description--title">
                        {project.title}
                      </h3>
                      <h4 className="project__description--sub-title">
                        {project.subtitle}
                      </h4>
                      <p className="project__description--para">
                        {project.description}
                      </p>
                      <div className="project__description--links">
                        <a 
                          href={project.github} 
                          className="project__description--link"
                        >
                          <FontAwesomeIcon icon={faGithub} />
                        </a>
                        <a 
                          href={project.live} 
                          className="project__description--link"
                        >
                          <FontAwesomeIcon icon={faExternalLinkAlt} />
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Projects;
