import React from "react";
import "./credit.css";

export default function Credit({ onClose, contentRef }) {
  return (
    <div className="credit-container" onClick={onClose}>
      <div className="credit-content" ref={contentRef}>
        <h2>Credits</h2>
        <p>
          Images created using Skybox AI by{" "}
          <a
            href="https://www.blockadelabs.com/index.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Blockade Labs, Inc.
          </a>
        </p>
        <p>
          Stable Diffusion technology licensed under{" "}
          <a
            href="https://huggingface.co/spaces/CompVis/stable-diffusion-license"
            target="_blank"
            rel="noopener noreferrer"
          >
            CreativeML OpenRAIL-M
          </a>
        </p>
        <p>
          3D Model "Samsung Ativ Book 9" by{" "}
          <a
            href="https://sketchfab.com/3dsharesg"
            target="_blank"
            rel="noopener noreferrer"
          >
            3dsharesg
          </a>
        </p>
        <p>
          Available under a{" "}
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Creative Commons Attribution-NonCommercial-ShareAlike 4.0
            International License
          </a>
        </p>
        <p>
          Original work available at{" "}
          <a
            href="https://sketchfab.com/3d-models/samsung-ativ-book-9-5e5725666200416cbf650ddce1f84eb4"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://sketchfab.com/3d-models/samsung-ativ-book-9-5e5725666200416cbf650ddce1f84eb4
          </a>
        </p>
        <p>
          This work has been modified by changing the content displayed on the
          screen.
        </p>

        <p>
          3D Model "Earth" by{" "}
          <a
            href="https://sketchfab.com/PatelDev"
            target="_blank"
            rel="noopener noreferrer"
          >
            PatelDev
          </a>
        </p>
        <p>
          Available under a{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Creative Commons Attribution 4.0 International License
          </a>
        </p>
        <p>
          Original work available at{" "}
          <a
            href="https://sketchfab.com/3d-models/earth-f7a76c63ff1846afb2d606e5c8369c15"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://sketchfab.com/3d-models/earth-f7a76c63ff1846afb2d606e5c8369c15
          </a>
        </p>
        <p>
          This work has been modified by adding lights to the scene and making
          it auto rotate.
        </p>
      </div>
    </div>
  );
}
