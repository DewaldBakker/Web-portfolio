import React from 'react';
import './Header.css';

function Header() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="header">
      <div className="logo">
        <img src="logo.png" alt="logo" onClick={() => scrollToSection('home')}/>
      </div>

      <nav className="options">
        <a onClick={() => scrollToSection('home')}>HOME</a>
        <a onClick={() => scrollToSection('about')}>ABOUT</a>
        <a onClick={() => scrollToSection('skills')}>SKILLS</a>
        <a onClick={()=>scrollToSection('portfolio')}>PORTFOLIO</a>
        <a onClick={() => scrollToSection('contact')}>CONTACT</a>
      </nav>
    </div>
  );
}

export default Header;