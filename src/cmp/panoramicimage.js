import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./panoramicimage.css";
import { gsap } from "gsap";
import createMultiLineText from "./createmultilinetext";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

function PanoramicImage() {
  const panocontainerRef = useRef(null);

  useEffect(() => {
    if (!panocontainerRef.current) return;

    const container = panocontainerRef.current;

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
    loader.load(
      "/pano-final-dark-3-min-size.png",
      function (texture) {
        let isRendered = false;
        // Once the texture has loaded, create the sphere and add it to the scene
        const geometry = new THREE.SphereGeometry(500, 60, 40);

        // Flip the geometry inside out
        geometry.scale(-1, 1, 1);

        const material = new THREE.MeshBasicMaterial({
          map: texture,
        });

        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        // Animation loop
        let lastTime = 0;
        const rotationSpeed = 0.00001;

        function animate(time) {
          const delta = time - lastTime;
          lastTime = time;
          requestAnimationFrame(animate);

          sphere.rotation.y += rotationSpeed * delta;

          controls.update();
          renderer.render(scene, camera);
          if (!isRendered) {
            console.log("The panoramic image has been rendered.");
            isRendered = true;
          }
        }

        animate(0);
      },
      undefined,
      function (error) {
        console.error("An error occurred while loading the texture", error);
      }
    );

    let font;
    const fontLoader = new FontLoader();

    fontLoader.load(
      "/fonts/helvetiker_regular.typeface.json",
      function (response) {
        font = response;

        // Now you can create the text mesh and add it to the scene
        const textMesh = createMultiLineText(
          scene,
          font,
          "Kia ora! I am a digital enthusiast with a creative spark from New Zealand.",
          {
            x: 0,
            y: 0,
            z: -0.5,
          }
        );

        // Add textMesh to scene
        scene.add(textMesh);
      }
    );
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

    // gsap.fromTo(
    //   ".pano-container",
    //   {
    //     "clip-path": "(0 50%, 100% 50%, 100% 50%, 0 50%)",
    //     opacity: 0,
    //   },
    //   {
    //     "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    //     opacity: 1,
    //     ease: "power1.inOut",
    //     duration: 3,
    //   }
    // );

    gsap.to(".scroll-arrow", {
      y: "-=20", // move up by 20px
      repeat: -1, // repeat indefinitely
      yoyo: true, // reverse the animation on each iteration
      ease: "power1.inOut", // easing function for smooth animation
      duration: 0.8, // animation duration
    });

    // Don't forget to cleanup on component unmount
    return () => {
      window.removeEventListener("resize", onWindowResize);
      while (container.firstChild) {
        container.firstChild.remove();
      }
    };
  }, []);

  return (
    <div className="pano-container">
      <div className="pano-wrapper">
        <div className="panorendererContainer" ref={panocontainerRef} />
        <p className="pano-text">Drag your mouse or finger to explore</p>
        <div className="scroll-arrow"></div>
      </div>
    </div>
  );
}

export default PanoramicImage;
