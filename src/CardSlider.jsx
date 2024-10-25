import { useEffect, useRef } from "react";
import React from "react";
import "./CardSlider.css";

// Importing local images
import image1 from "./images/image1.JPG";
import image2 from "./images/image2.JPG";
import image3 from "./images/image3.JPG";
import image4 from "./images/image4.JPG";
import image5 from "./images/image5.JPG";

const CardSlider = () => {
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);
  const cards = [
    { id: 1, image: image1, title: "Hepta", description: "10-6-2024"},
    { id: 2, image: image2, title: "Dogger", description: "22-8-2024"},
    { id: 3, image: image3, title: "Contra", description: "14-7-2024"},
    { id: 4, image: image4, title: "Avo", description: "12-5-2024"},
    { id: 5, image: image5, title: "Adrian", description: "14-9-2024"},
  ];

  useEffect(() => {
    const slider = sliderRef.current;
    let startPos = 0;

    // Function to move the cards
    const moveSlider = () => {
      startPos -= 1; // Move left
      slider.style.transform = `translateX(${startPos}px)`;

      // Reset position when the first card is completely out of view
      if (Math.abs(startPos) >= slider.scrollWidth / 2) {
        startPos = 0; // Reset position
      }
    };

    // Set the interval to move the slider
    intervalRef.current = setInterval(moveSlider, 20); // Adjust speed here

    // Cleanup function to clear the interval on component unmount
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="slider-container">
      <div className="slider" ref={sliderRef}>
        {/* Render cards */}
        {cards.map((card) => (
          <div className="card" key={card.id}>
            <img src={card.image} alt={card.title} />
            <div className="card-info"> 
              <h3>{card.title}</h3>
              <p>Made by Umar Rafique</p>
              </div>
              <h4>Published on {card.description}</h4>
          </div>
        ))}
        {/* Duplicate the cards for seamless looping */}
        {cards.map((card) => (
          <div className="card" key={`duplicate-${card.id}`}>
            <img src={card.image} alt={card.title} />
            <div className="card-info"> 
              <h3>{card.title}</h3>
              <p>Made by Umar Rafique</p>
              </div>
              <h4>Published on {card.description}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSlider;
