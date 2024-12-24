import React from 'react';
import { useState, useEffect } from 'react';
import remarkGfm from 'remark-gfm';
import matter from 'gray-matter';

// Base MarkdownSection component that handles section visibility
const MarkdownSection = ({ content, type, isVisible = true }) => {
  if (!isVisible) return null;
  
  return (
    <div className="markdown-section">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom components for markdown rendering
          h1: ({ children }) => <h1 className="text-3xl font-bold mb-6">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-bold mb-4">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-bold mb-3">{children}</h3>,
          p: ({ children }) => <p className="mb-4 text-gray-800">{children}</p>,
          ul: ({ children }) => <ul className="list-disc ml-6 mb-4">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal ml-6 mb-4">{children}</ol>,
          li: ({ children }) => <li className="mb-2">{children}</li>,
          img: ({ src, alt }) => (
            <img 
              src={src} 
              alt={alt} 
              className="w-full rounded-lg shadow-lg mb-4" 
            />
          ),
          code: ({ node, inline, className, children, ...props }) => (
            <code
              className={`${className} ${
                inline ? 'bg-gray-100 rounded px-1' : 'block bg-gray-100 p-4 rounded-lg overflow-x-auto'
              }`}
              {...props}
            >
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

// Portfolio Section component that handles section-specific rendering
const PortfolioSection = ({ sectionData }) => {
  const [displayProjects, setDisplayProjects] = useState(true);
  const [displayCertifications, setDisplayCertifications] = useState(true);

  const { projects, certifications } = sectionData;

  return (
    <div className="space-y-8">
      {/* Section Controls */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setDisplayProjects(!displayProjects)}
          className={`px-4 py-2 rounded ${
            displayProjects ? 'bg-black text-white' : 'bg-gray-200'
          }`}
        >
          Projects
        </button>
        <button
          onClick={() => setDisplayCertifications(!displayCertifications)}
          className={`px-4 py-2 rounded ${
            displayCertifications ? 'bg-black text-white' : 'bg-gray-200'
          }`}
        >
          Certifications & Courses
        </button>
      </div>

      {/* Projects Grid */}
      {displayProjects && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      )}

      {/* Certifications Section */}
      {displayCertifications && (
        <div className="space-y-6">
          {certifications.map((cert, index) => (
            <CertificationCard key={index} {...cert} />
          ))}
        </div>
      )}
    </div>
  );
};

// Example project card component
const ProjectCard = ({ title, description, image, link }) => (
  <div className="group relative overflow-hidden rounded-lg aspect-[4/3] bg-black">
    <img
      src={image}
      alt={title}
      className="w-full h-full object-cover opacity-75 group-hover:opacity-40 transition-opacity duration-300"
    />
    <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {description}
      </p>
      {link && (
        <a
          href={link}
          className="mt-4 px-4 py-2 border border-white hover:bg-white hover:text-black transition-colors"
        >
          View Project
        </a>
      )}
    </div>
  </div>
);

export { MarkdownSection, PortfolioSection };