import React, { useEffect } from "react";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import "./DarkMode.css";

const DarkMode = ({ isDarkMode, setDarkMode }) => {
  const setDarkTheme = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    setDarkMode(true);
  };

  const setLightTheme = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    setDarkMode(false);
  };

  const toggleTheme = (e) => {
    if (e.target.checked) setDarkTheme();
    else setLightTheme();
  };

  // Apply the dark theme initially
  useEffect(() => {
    if (isDarkMode) setDarkTheme();
    else setLightTheme();
  }, [isDarkMode]);

  return (
    <div className="dark_mode">
      <input
        className="dark_mode_input"
        type="checkbox"
        id="darkmode-toggle"
        onChange={toggleTheme}
        checked={isDarkMode}
      />
      <label className="dark_mode_label" htmlFor="darkmode-toggle">
        <Sun />
        <Moon />
      </label>
    </div>
  );
};

export default DarkMode;
