import React from 'react';
import './About.css'
function About({ Name,Info, Design, Maintenance, Development }) {

  return (
    <div id='about' className='about'>
      <div className='aboutN' >ABOUT {Name}</div>


      <p className='info'>
        {Info}
      </p>

      <div className='explore'>
        | EXPLORE |
      </div>

      <div className='grid'>
        <div>
          <h3>DESIGN</h3>
          <p>{Design}</p>
        </div>

        <div>
          <h3>DEVELOPMENT</h3>
          <p>{Development}</p>
        </div>

        <div className='center' >
          <h3>MAINTENANCE</h3>
          <p>{Maintenance}</p>
        </div>
      </div>
    </div>
  );
}

export default About;