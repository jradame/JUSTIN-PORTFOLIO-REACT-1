/*
 * Projects section - shows off my NFT marketplace plus some stuff I'm working on
 * The main project gets the big showcase, others are placeholders for now
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faPalette, faCalendarAlt, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Skeleton from 'react-loading-skeleton';
import ScrollReveal from './ScrollReveal';

const Projects = ({ loading }) => {
  /*
   * My project data - real NFT marketplace I built, plus some coming soon ones
   * The Ultraverse project is live and working, others are in planning
   */
    const projects = [
    {
      id: 1,
      title: "CineScope",
      description: "Search movies, TV shows, and games using the OMDb API. Features modals, skeleton loaders, and smooth UI interactions.",
      image: "/images/cinescope-preview.png", // save screenshot here
      liveUrl: "https://cinescope-project.vercel.app/",
      githubUrl: "https://github.com/jradame/CINESCOPE",
      technologies: ["HTML5", "CSS3", "JavaScript", "OMDb API", "Vercel"],
      category: "Frontend",
      status: "LIVE"
    },
    {
      id: 2,
      title: "Library Project",
      description: "A responsive React web app simulating an online bookstore. Users can browse books, view ratings, filter/sort by price or rating, and check discounts. Built with reusable components and clean state management.",
      image: "/images/library-screenshot.png", // save screenshot here
      liveUrl: "https://libraryproject.vercel.app/",
      githubUrl: "https://github.com/jradame/LIBRARYPROJECT",
      technologies: ["React", "CSS3", "JavaScript", "React Router", "Vercel"],
      category: "Frontend",
      status: "LIVE"
    },
    {
      id: 3,
      title: "Ultraverse NFT Marketplace",
      description: "Built this React NFT marketplace from scratch with dark/light themes and smooth navigation. Pretty happy with how clean it turned out.",
      image: "/images/ultraverse-screenshot.png",
      liveUrl: "https://ultraverse-nft-project.vercel.app/",
      githubUrl: "https://github.com/jradame/ultraverse-nft-project",
      technologies: ["React", "CSS3", "JavaScript", "React Router", "Vercel"],
      category: "Frontend",
      status: "LIVE",
      featured: true
    }
  ];


  // Open links in new tab - don't want people leaving my portfolio
  const handleLinkClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="projects" className="projects">
      <div className="projects__container">
        {/* Main title with animation */}
        <ScrollReveal direction="up" delay={100}>
          <h1 className="section__title">
            Here are a few of my <span className="blue">projects</span>
          </h1>
        </ScrollReveal>
        
        {loading ? (
          // Loading skeletons to keep layout stable
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
          // Actual project cards with staggered entrance animations
          <div className="projects__cards">
            {projects.map((project, index) => (
              <ScrollReveal
                key={project.id}
                direction="up"
                delay={200 + (index * 100)} // Each card comes in 100ms after the last
              >
                <div className="project-block">
                  <div className="project-image-container">
                    {project.image ? (
                      // Real project screenshot
                      <img
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        className="project-image-simple"
                      />
                    ) : (
                      // Icon placeholder for coming soon projects
                      <div className="project-icon-placeholder">
                        <FontAwesomeIcon icon={project.icon} />
                        <div className="project-status-overlay">
                          <FontAwesomeIcon icon={faCalendarAlt} />
                          <span>{project.status}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="project-simple-info">
                    <h3 className="project-simple-title">{project.title}</h3>
                    <p className="project-simple-desc">{project.description}</p>
                    
                    {/* Show buttons only for live projects */}
                    {project.status === 'LIVE' ? (
                      <div className="project-simple-links">
                        <button
                          className="project-simple-btn"
                          onClick={() => handleLinkClick(project.liveUrl)}
                          aria-label={`View live ${project.title}`}
                        >
                          <FontAwesomeIcon icon={faExternalLinkAlt} />
                          View Live
                        </button>
                        <button
                          className="project-simple-btn project-simple-btn-github"
                          onClick={() => handleLinkClick(project.githubUrl)}
                          aria-label={`View ${project.title} source code`}
                        >
                          <FontAwesomeIcon icon={faGithub} />
                          View Code
                        </button>
                      </div>
                    ) : (
                      // Coming soon badge for placeholder projects
                      <div className="project-simple-links">
                        <div className="project-coming-soon">
                          <FontAwesomeIcon icon={faCalendarAlt} />
                          <span>Coming Soon</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Tech stack tags for completed projects */}
                    {project.technologies && (
                      <div className="project-simple-tags">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="project-simple-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
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










