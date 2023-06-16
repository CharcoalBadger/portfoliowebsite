import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./panoramicimage.css";

function PanoramicImage() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Create the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Load the panoramic image and create a texture
    const loader = new THREE.TextureLoader();
    const texture = loader.load("/nzpano.jpg");

    // Create a spherical geometry and map the texture to it
    const geometry = new THREE.SphereGeometry(500, 60, 40);

    // Flip the geometry inside out
    geometry.scale(-1, 1, 1);

    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Set up the camera and controls
    camera.position.set(0, 0, 0.1);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;

    controls.rotateSpeed = 0.3;

    // camera.aspect = window.innerWidth / window.innerHeight;
    camera.aspect = container.clientWidth / container.clientHeight;

    // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(container.clientWidth, container.clientHeight);

    function onWindowResize() {
      // camera.aspect = window.innerWidth / window.innerHeight;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();

      // renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setSize(container.clientWidth, container.clientHeight);
    }

    window.addEventListener("resize", onWindowResize, false);

    // Animation loop
    let lastTime = 0;
    const rotationSpeed = 0.00005;

    function animate(time) {
      const delta = time - lastTime;
      lastTime = time;
      requestAnimationFrame(animate);

      sphere.rotation.y += rotationSpeed * delta;

      controls.update();
      renderer.render(scene, camera);
    }

    animate(0);

    // Don't forget to cleanup on component unmount
    return () => {
      window.removeEventListener("resize", onWindowResize);
      while (container.firstChild) {
        container.firstChild.remove();
      }
    };
  }, []);

  return (
    <div id="container">
      <div id="rendererContainer" ref={containerRef} />
      <div className="overlay">
        <div className="inner">
          <div className="text-container">
            <p>Click and drag with your mouse or swipe with your finger</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanoramicImage;
