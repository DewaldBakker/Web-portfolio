import React, { useState } from 'react';
import './Portfolio.css';
import Filter from './Filter';
import projects from '../Info/Projects';
import Bannerimg from '../images/Banner.png';


const Projects = () => {
  const [filter, setFilter] = useState('All');

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((p) => p.type === filter);

  return (
    <section id="portfolio" className="portfolio-section">

      <div className="mountains-hero">
        <img src={Bannerimg} alt="Banner" />
        <div className="section-header-box">PROJECTS</div>
      </div>

      <Filter currentFilter={filter} setFilter={setFilter} />


      <div className="portfolio-grid">
        {filteredProjects.map((project, index) => (
          <div key={index} className="portfolio-item circle-tile">
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <div className="circle-container">
                <img
                  src={project.image}
                  alt={project.name}
                  className="portfolio-img-fill"
                />
                <div className="portfolio-overlay">
                  <h5>
                    {project.name}
                    <br />
                    {project.des}
                  </h5>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>

      <div className="grid-footer">And many more to come!</div>
    </section>
  );
};

export default Projects;