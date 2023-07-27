import React, { useEffect } from "react";
import "./navbar.css";
import { gsap } from "gsap";

export default function Navbar({ onNavClick, aboutRef, workRef, contactRef }) {
  const handleLogoClick = () => {
    window.location.href = "/";
  };

  useEffect(() => {
    gsap.fromTo(
      ".navlogo",
      {
        "clip-path": "(0 50%, 100% 50%, 100% 50%, 0 50%)",
        opacity: 0,
      },
      {
        "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        opacity: 1,
        ease: "power1.inOut",
        duration: 2,
      }
    );
    gsap.fromTo(
      ".nav-button",
      {
        "clip-path": "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
        opacity: 0,
      },
      {
        "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        opacity: 1,
        stagger: 0.3,
        ease: "power1.inOut",
        duration: 2,
      }
    );
  }, []);

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
          <button className="nav-button" onClick={() => onNavClick(aboutRef)}>
            About
          </button>
          <button className="nav-button" onClick={() => onNavClick(workRef)}>
            Work
          </button>
          <button className="nav-button" onClick={() => onNavClick(contactRef)}>
            Hire me
          </button>

          <a
            className="nav-button"
            href="/cv.pdf"
            download="William_Douglas_CV.pdf"
          >
            Download CV
          </a>
        </nav>
      </div>
    </div>
  );
}
