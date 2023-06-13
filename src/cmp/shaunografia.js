import React from "react";
import "./shaunografia.css";

export default function Shaunografia() {
  return (
    <div className="shaunografia-container">
      <h1>Shaunografia</h1>
      <a
        className="image-link"
        href="https://shaunografia.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          className="shaunografia-image"
          src="/shaunimage.png"
          alt="Shaunografia website"
        />
      </a>
    </div>
  );
}
