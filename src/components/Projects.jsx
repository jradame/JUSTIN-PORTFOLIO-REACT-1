import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faCode, faPalette, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';
import ScrollReveal from './ScrollReveal'; // Add this import

const Projects = ({ loading }) => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack shopping experience with modern design",
      icon: faCode,
      category: "Full-Stack"
    },
    {
      id: 2,
      title: "Dashboard Application", 
      description: "Interactive data visualization and analytics",
      icon: faPalette,
      category: "Frontend"
    },
    {
      id: 3,
      title: "Mobile App",
      description: "Cross-platform mobile application",
      icon: faRocket,
      category: "React Native"
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="projects__container">
        <ScrollReveal direction="up" delay={100}>
          <h1 className="section__title">
            Here are a few of my <span className="blue">projects</span>
          </h1>
        </ScrollReveal>
        
        {loading ? (
          <div className="projects__cards">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="project-card project-card--loading">
                <Skeleton height={40} width={40} circle className="project-card__icon-skeleton" />
                <Skeleton height={24} width="70%" className="project-card__title-skeleton" />
                <Skeleton height={16} width="50%" className="project-card__category-skeleton" />
                <Skeleton height={40} count={2} className="project-card__description-skeleton" />
              </div>
            ))}
          </div>
        ) : (
          <div className="projects__cards">
            {projects.map((project, index) => (
              <ScrollReveal 
                key={project.id} 
                direction="up" 
                delay={200 + (index * 100)}
              >
                <div className="project-card">
                  <div className="project-card__header">
                    <FontAwesomeIcon icon={project.icon} className="project-card__icon" />
                    <div className="project-card__status">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      <span>COMING SOON</span>
                    </div>
                  </div>
                  
                  <h3 className="project-card__title">{project.title}</h3>
                  <span className="project-card__category">{project.category}</span>
                  <p className="project-card__description">{project.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;








