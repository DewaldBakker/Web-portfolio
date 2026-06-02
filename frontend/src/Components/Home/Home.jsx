import React from 'react';
import './Home.css';

function Home({ img, name, about, gname, Ido,github,linkedin }) {
  return (
    <div className="home-container" id="home">

      <div className="home">

        <div className="home-content">
          <h2>Hi, I am</h2>

          <h1 className="main-name">{gname}</h1>

          <h3 className="job-title">
            Front-end Developer / UI Designer
          </h3>
          <div className='links'>
          <a href='https://github.com/DewaldBakker'><img src='Github.png'/></a>
          <a href='https://www.linkedin.com/in/dewald-bakker-b498403b2/'><img src='Linkedin.png'/></a>
          </div>

        </div>

        <img src={img} alt={name} className="home-image" />

      </div>

      <div className="HomeF">
        <h1>What I do</h1>
          <p className="about-text">
            {Ido}. {about}
          </p>
      </div>

    </div>
  );
}

export default Home;