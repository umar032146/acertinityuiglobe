import React, { useEffect, useRef, useState } from 'react';
import './DomainsSection.css';
import web from "./images/web.jpg";
import unity from "./images/unity.jpg";
import desk from "./images/desk.jpg";
import app from "./images/app.jpg";
const DomainsSection = () => {
  const sectionRefs = useRef([]); // To store refs for each section
  const [animatedSections, setAnimatedSections] = useState({});
  const [typingTexts, setTypingTexts] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute('data-id');
          if (entry.isIntersecting && !animatedSections[sectionId]) {
            setAnimatedSections((prev) => ({ ...prev, [sectionId]: true }));
            startTyping(sectionId, sections.find(sec => sec.id === sectionId).text);
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [animatedSections]);

  const startTyping = (id, text) => {
    const typingSpeed = 50; // milliseconds between each character
    let index = 0;
    const typedText = [];

    const typingInterval = setInterval(() => {
      if (index < text.length) {
        typedText.push(text[index]);
        setTypingTexts((prev) => ({ ...prev, [id]: typedText.join('') }));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);
  };

  const sections = [
    {
      id: 'web',
      heading: 'Web Development',
      text: 'Crafting dynamic, responsive websites using modern technologies like React, HTML, and CSS. I focus on clean code and user-friendly interfaces to deliver engaging web experiences across all devices and platforms.',
      image: web,
    },
    {
      id: 'app',
      heading: 'App Development',
      text: 'Developing mobile applications with a focus on performance and usability. I specialize in building Android apps with Java, Kotlin, and Flutter, delivering seamless user experiences and intuitive navigation for all devices.',
      image: app,
    },
    {
      id: 'desktop',
      heading: 'Desktop Development',
      text: 'Creating efficient and robust desktop applications using Java, C#, and Python. I prioritize stability and functionality, tailoring solutions for business needs and ensuring cross-platform compatibility for a wide range of use cases.',
      image: desk,
    },
    {
      id: 'unity',
      heading: 'Unity Game Development',
      text: 'Developing immersive 2D and 3D games using Unity. From concept to execution, I focus on gameplay mechanics, performance optimization, and multi-platform deployment to create interactive and enjoyable gaming experiences.',
      image: unity,
    },
  ];

  return (
    <div className="domains-container">
      {sections.map((section, index) => (
        <div
          key={section.id}
          className="domain-section"
          ref={(el) => (sectionRefs.current[index] = el)}
          data-id={section.id}
        >
          <div className={`domain-content ${animatedSections[section.id] ? 'animate-text' : ''}`}>
            <h2>{section.heading}</h2>
            <p className={`typing ${animatedSections[section.id] ? 'typed-done' : ''}`}>
              {typingTexts[section.id] || ''}
            </p>
          </div>
          <div className={`domain-image ${animatedSections[section.id] ? 'fade-in' : ''}`}>
            <img src={section.image} alt={section.heading} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DomainsSection;
