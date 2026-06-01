import { useState, useEffect } from 'react';
import './App.css';
import Home from './Components/Home/Home';
import Info from './Components/Info/Info';
import Header from './Components/Header/Header';
import About from './Components/About/About';
import InfoP from './Components/Info/InfoP';
import Contact from "./Components/Contact/Contact";
import Skills from "./Components/Skill/Skills";
import Footer from "./Components/Footer/Footer";
import Portfolio from './Components/Portfolio/Portfolio';

function App() {
  
  useEffect(() => {
    // Fires off a silent ping to the backend root path as soon as the site opens.
    // This wakes up the Render free-tier container early so it is ready by the time they reach the contact form.
    fetch("https://web-portfolio-1-yfnm.onrender.com")
      .then(() => console.log("Backend container spun up successfully."))
      .catch((err) => console.log("Backend wake-up call sent. Waiting for spin up..."));
  }, []);

  return (
    <div className='app'>
      <Header/>
      <div className='size'>
        <Home about={InfoP[0].about} gname={InfoP[0].gname} Ido={InfoP[0].Ido} img={Info[0].img} name={Info[0].name}/>
        <About Name={Info[0].name.toUpperCase()} Info={Info[0].Info} Design={Info[0].Design} Development={Info[0].Development} Maintenance={Info[0].Maintenance}/>
        <div className="pw">
          <Skills />
          <Portfolio/>
          <Contact/>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;