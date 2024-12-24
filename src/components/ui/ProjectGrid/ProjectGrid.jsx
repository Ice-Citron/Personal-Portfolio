import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ProjectGrid.css';

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="project-card"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
    >
      <div className="rhombus-container">
        <div className="rhombus-content">
          {/* Default State */}
          <div className={`default-state ${isHovered ? 'hidden' : ''}`}>
            <h3 className="project-title">{project.title}</h3>
            <div className="time-info">
              <div className="time-label">TIME_SPENT:</div>
              <div className="time-value">{project.duration}</div>
            </div>
          </div>

          {/* Hover State */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                className="hover-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="image-container">
                  <img 
                    src={project.image} 
                    alt={project.title}
                  />
                  <div className="image-overlay" />
                </div>
                <div className="hover-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.shortDescription}</p>
                  <div className="explore-prompt">>> CLICK TO EXPLORE</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="scan-lines" />
        </div>
      </div>
    </motion.div>
  );
};

const ProjectGrid = ({ projects }) => {
  return (
    <div className="project-grid">
      {projects.map((project, index) => (
        <Link to={`/project/${project.title.toLowerCase().replace(/[^\w]/g, '-')}`} key={index}>
          <ProjectCard project={project} />
        </Link>
      ))}
    </div>
  );
};

export default ProjectGrid;