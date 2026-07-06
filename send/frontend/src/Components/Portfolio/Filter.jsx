import React from 'react';

function Filter({ currentFilter, setFilter }) {
  return (
    <div className="portfolio-filter-bar">
      <span className={currentFilter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>All</span>

      <span className={currentFilter === 'Reactjs' ? 'active' : ''} onClick={() => setFilter('Reactjs')}>ReactJS</span>

      <span className={currentFilter === 'SQL' ? 'active' : ''} onClick={() => setFilter('SQL')}>SQL</span>

      <span className={currentFilter === 'C#' ? 'active' : ''} onClick={() => setFilter('C#')}>C#</span>
    </div>
  );
}

export default Filter;