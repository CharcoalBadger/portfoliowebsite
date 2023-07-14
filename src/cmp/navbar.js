import React from "react";
import "./navbar.css";

export default function Navbar() {
  return (
    <div>
      <div className="navbar-inner">
        <img
          className="navlogo"
          src={"./willogo-white-final-border.png"}
          alt="William Douglas Logo"
        />
        <nav className="navigation">
          <a href="/about">About</a>
          <a href="/work">Work</a>
        </nav>
      </div>
    </div>
  );
}
