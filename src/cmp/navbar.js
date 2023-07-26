import React from "react";
import "./navbar.css";

export default function Navbar({ onNavClick, aboutRef, workRef, contactRef }) {
  const handleLogoClick = () => {
    window.location.href = "/";
  };

  return (
    <div>
      <div className="navbar-inner">
        <img
          className="navlogo"
          src="./willogo-white-final-border-green-cream.png"
          alt="William Douglas Logo"
          onClick={handleLogoClick}
        />
        <nav className="navigation">
          <button onClick={() => onNavClick(aboutRef)}>About</button>
          <button onClick={() => onNavClick(workRef)}>Work</button>
          <button onClick={() => onNavClick(contactRef)}>Hire me</button>

          <a href="/cv.pdf" download="William_Douglas_CV.pdf">
            Download CV
          </a>
        </nav>
      </div>
    </div>
  );
}
