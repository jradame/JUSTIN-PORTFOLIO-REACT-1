/*
 * Projects section - shows off my NFT marketplace plus some stuff I'm working on
 * The main project gets the big showcase, others are placeholders for now
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Skeleton from 'react-loading-skeleton';
import ScrollReveal from './ScrollReveal';

const Projects = ({ loading }) => {
  // ✅ Correct projects data with real images from /public/images/
  const projects = [
    {
      id: 1,
      title: "CineScope 🎬",
      description:
        "Search movies, TV shows, and games using the OMDb API. Features modals, skeleton loaders, and smooth UI interactions.",
      image: "/images/cinescope-preview.png",
      liveUrl: "https://cinescope-project.vercel.app/",
      githubUrl: "https://github.com/jradame/CINESCOPE",
      technologies: ["HTML5", "CSS3", "JavaScript", "OMDb API", "Vercel"],
      category: "Frontend",
      status: "LIVE",
      featured: true,
    },
    {
      id: 2,
      title: "Library Project",
      description:
        "A responsive web app built with React that simulates an online bookstore. Users can browse books, view ratings, and filter/sort by price or rating.",
      image: "/images/library-screenshot.png",
      liveUrl: "https://libraryproject.vercel.app/",
      githubUrl: "https://github.com/jradame/LIBRARYPROJECT",
      technologies: ["React", "CSS3", "JavaScript", "React Router", "Vercel"],
      category: "Frontend",
      status: "LIVE",
      featured: true,
    },
    {
      id: 3,
      title: "Ultraverse NFT Marketplace",
      description:
        "React NFT marketplace with dark/light themes and smooth navigation. Built from scratch and deployed on Vercel.",
      image: "/images/ultraverse-screenshot.png",
      liveUrl: "https://ultraverse-nft-project.vercel.app/",
      githubUrl: "https://github.com/jradame/ultraverse-nft-project",
      technologies: ["React", "CSS3", "JavaScript", "React Router", "Vercel"],
      category: "Frontend",
      status: "LIVE",
      featured: true,
    },
  ];

  // Open links in a new tab
  const handleLinkClick = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="projects" className="projects">
      <div className="projects__container">
        {/* Section Title */}
        <ScrollReveal direction="up" delay={100}>
          <h1 className="section__title">
            Here are a few of my <span className="blue">projects</span>
          </h1>
        </ScrollReveal>

        {loading ? (
          // Loading skeletons
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
          // Actual project cards
          <div className="projects__cards">
            {projects.map((project, index) => (
              <ScrollReveal
                key={project.id}
                direction="up"
                delay={200 + index * 100}
              >
                <div className="project-block">
                  {/* Image */}
                  <div className="project-image-container">
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="project-image-simple"
                    />
                  </div>

                  {/* Info */}
                  <div className="project-simple-info">
                    <h3 className="project-simple-title">{project.title}</h3>
                    <p className="project-simple-desc">{project.description}</p>

                    {/* Buttons */}
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

                    {/* Tech stack */}
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








