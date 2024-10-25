import logo from './logo.svg';
import './App.css';
import  Globescene  from './Globes';
import CardSlider from './CardSlider';
import DomainsSection from './DomainsSection';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
    <div className="stars">
    <div className="twinkling">
    <div style={{ width: "100vw", height: "85vh" }}>
      <Globescene />
    </div>
      <div className="center">
      <h1 className="gradient-text">Hi, My name is Umar Rafique</h1>
      <button className="gradient-button">Download CV</button>
    </div>

    <h1 className="gradient-text ctext">Projects</h1>
     <CardSlider/>

     <div className="hero-highlight">
      <div className="hero-content">
        <h1 className="hero-title">Your Inspiring Headline</h1>
        <p className="hero-description">
          This is a brief description that provides additional context or information about the <span>main message.</span>
        </p>
        <a href="#action" className="gradient-button">
          Call to Action
        </a>
      </div>
    </div>

    <h1 className="gradient-text ctext">Domains I have worked in</h1>
    <DomainsSection/>
  
      </div>
      </div>
  </div>
    
  );
}

export default App;
