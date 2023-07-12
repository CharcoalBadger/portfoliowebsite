import React from "react";
// import gsap from "gsap";
import "./portintro.css";

export default function Portintro({ isDarkMode }) {
  return (
    <div className="portfolio-container">
      <div className="intro">
        <h1>William Douglas</h1>
        <h2>Front-End Developer</h2>
        <p>
          I'm a web developer based in the vibrant landscapes of New Zealand. I
          am passionate about the digital world and have dedicated myself to
          crafting web experiences that are both immersive and engaging
        </p>
        <button className="intro-contact-button">Get in touch</button>
        <button className="intro-download-button">Download CV</button>
      </div>
      <img
        className="intro-background-image"
        src="./willogo-white-final-border.png"
        alt="William Douglas Logo"
      />
    </div>
  );
}
