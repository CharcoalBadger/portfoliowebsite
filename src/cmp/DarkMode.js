import React, { useEffect, useCallback } from "react";
import { ReactComponent as Sun } from "./Sun.svg";
import { ReactComponent as Moon } from "./Moon.svg";
import "./DarkMode.css";

const DarkMode = ({ isDarkMode, setDarkMode }) => {
  const setDarkTheme = useCallback(() => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    setDarkMode(true);
  }, [setDarkMode]);

  const setLightTheme = useCallback(() => {
    document.querySelector("body").setAttribute("data-theme", "light");
    setDarkMode(false);
  }, [setDarkMode]);

  const toggleTheme = (e) => {
    if (e.target.checked) setDarkTheme();
    else setLightTheme();
  };

  // Apply the dark theme initially
  useEffect(() => {
    if (isDarkMode) setDarkTheme();
    else setLightTheme();
  }, [isDarkMode, setDarkTheme, setLightTheme]);

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
