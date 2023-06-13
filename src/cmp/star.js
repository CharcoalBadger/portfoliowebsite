import React, { useEffect } from "react";
import "./star.css";

export default function Star() {
  useEffect(() => {
    const generateStars = (id, count) => {
      const stars = [];
      for (let i = 0; i < count; i++) {
        const x = Math.floor(Math.random() * 2000);
        const y = Math.floor(Math.random() * 2000);
        stars.push(`${x}px ${y}px #FFF`);
      }
      document.getElementById(id).style.boxShadow = stars.join(", ");
    };

    generateStars("stars", 700);
    generateStars("stars2", 200);
    generateStars("stars3", 100);
  }, []);
  return (
    <div className="stars-container">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div id="title"></div>
    </div>
  );
}
