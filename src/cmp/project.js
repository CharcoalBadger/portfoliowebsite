import React from "react";
import "./project.css";
import Shaunografia from "./shaunografia";
import Sands from "./sands";

export default function Project() {
  return (
    <div className="project-container">
      <h1>Projects</h1>
      <div className="project-inner">
        <Shaunografia />
        <Sands />
      </div>
    </div>
  );
}
