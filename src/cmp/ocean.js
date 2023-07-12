import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const OceanComponent = () => {
  const containerRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();

  useEffect(() => {
    const container = containerRef.current;

    // Initialize the renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Create the scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create the camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;

    // Other necessary initialization code

    // Render function
    const render = () => {
      requestAnimationFrame(render);
      // Update and render the scene
      renderer.render(scene, camera);
    };

    // Call the render function
    render();

    // Clean up the scene
    return () => {
      renderer.dispose();
      // Other clean-up code
    };
  }, []);

  return <div ref={containerRef} />;
};

export default OceanComponent;
