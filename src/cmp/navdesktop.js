import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import "./navdesktop.css";

export default function Navdesktop() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <div className="navd-inner">
        <ScrollLink
          to="about"
          smooth={true}
          duration={1000}
          className="nav-button"
        >
          About
        </ScrollLink>

        <ScrollLink
          to="work"
          smooth={true}
          duration={1000}
          className="nav-button"
        >
          Work
        </ScrollLink>

        <label className="switch">
          <input type="checkbox" onChange={toggleDarkMode} />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
}
