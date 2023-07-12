import React, { useState } from "react";
import "./navbar.css";
import DarkMode from "./DarkMode";

export default function Navbar() {
  const [isDarkMode, setDarkMode] = useState(true);

  return (
    <div>
      <div className="navbar-inner">
        <img
          className="navlogo"
          src={
            isDarkMode
              ? "./willogo-white-final-border.png"
              : "./willogo-black-final-border.png"
          }
          alt="William Douglas Logo"
        />
        <nav className="navigation">
          <a href="/about">About</a>
          <a href="/work">Work</a>
        </nav>
        <DarkMode isDarkMode={isDarkMode} setDarkMode={setDarkMode} />
      </div>
    </div>
  );
}
