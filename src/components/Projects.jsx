

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Skeleton from 'react-loading-skeleton';
import ScrollReveal from './ScrollReveal'; // Assuming this is a local component

const Projects = ({ loading }) => {
  // Project data array.
  const projects = [
    {
      title: 'CineScope 🎬',
      description: 'Search movies, TV shows, and games using the OMDb API. Features modals, skeleton loaders, and smooth UI interactions.',
      imageUrl: '/images/cinescope-preview.png',
      liveUrl: 'https://cinescope-project.vercel.app',
      githubUrl: 'https://github.com/jradame/CINESCOPE-PROJECT',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'OMDb API', 'Vercel'],
      category: 'Frontend',
      status: 'LIVE'
    },
    {
      title: 'Library Project 📚',
      description: 'A responsive React web app that simulates an online bookstore. Users can browse, filter, sort by price or rating, and see which books are on sale.',
      imageUrl: '/images/library-screenshot.png',
      liveUrl: 'https://libraryproject.vercel.app',
      githubUrl: 'https://github.com/jradame/LIBRARYPROJECT',
      technologies: ['React', 'CSS3', 'JavaScript', 'Vercel'],
      category: 'Frontend',
      status: 'LIVE'
    },
    {
      title: 'Ultraverse NFT Marketplace 🖼️',
      description: 'React NFT marketplace with dark/light themes and smooth navigation. Built from scratch and deployed on Vercel.',
      imageUrl: '/images/ultraverse-screenshot.png',
      liveUrl: 'https://ultraverse-nft-project.vercel.app/',
      githubUrl: 'https://github.com/jradame/ultraverse-nft-project',
      technologies: ['React', 'CSS3', 'JavaScript', 'React Router', 'Vercel'],
      category: 'Frontend',
      status: 'LIVE'
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
              <div key={index} className="project-block project-block--loading">
                <div className="project-image-container">
                  <Skeleton height="100%" />
                </div>
                <div className="project-simple-info">
                  <Skeleton height={24} width="70%" />
                  <Skeleton height={40} count={2} />
                  <div className="project-simple-links">
                    <Skeleton width={100} height={35} />
                    <Skeleton width={100} height={35} />
                  </div>
                  <div className="project-simple-tags">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} width={60} height={24} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="projects__cards">
            {projects.map((project, index) => (
              <ScrollReveal key={project.title} direction="up" delay={200 + index * 100}>
                <div className="project-block">
                  <div className="project-image-container">
                    <img
                      src={project.imageUrl}
                      alt={`${project.title} screenshot`}
                      className="project-image-simple"
                    />
                  </div>
                  <div className="project-simple-info">
                    <h3 className="project-simple-title">{project.title}</h3>
                    <p className="project-simple-desc">{project.description}</p>
                    <div className="project-simple-links">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-simple-btn"
                        >
                          <FontAwesomeIcon icon={faExternalLinkAlt} />
                          View Live
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-simple-btn project-simple-btn-github"
                        >
                          <FontAwesomeIcon icon={faGithub} />
                          View Code
                        </a>
                      )}
                    </div>
                    <div className="project-simple-tags">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="project-simple-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
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







