import React, { useEffect } from "react";
import "./navbar.css";
import { gsap } from "gsap";

export default function Navbar({ onNavClick, aboutRef, workRef, contactRef }) {
  const handleLogoClick = () => {
    window.location.href = "/";
  };

  const downloadFile = () => {
    document.getElementById("download").click();
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
          <button className="nav-button" onClick={downloadFile}>
            Download CV
          </button>
          {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
          <a
            id="download"
            className="hidden"
            href="/William-Douglas-CV.pdf"
            download="William-Douglas-CV.pdf"
            aria-hidden="true"
          />
        </nav>
      </div>
    </div>
  );
}
