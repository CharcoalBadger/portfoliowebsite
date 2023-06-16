import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import createPortfolioInfo from "./createportfolio";

export default function Threejstest() {
  const containerRef = useRef();
  const fontRef = useRef();

  useEffect(() => {
    let scene, camera, renderer, controls, clickableObject;
    const currentRef = containerRef.current;
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();

    function init() {
      scene = new THREE.Scene();

      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;

      const aspectRatio = canvasWidth / canvasHeight;
      camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
      camera.position.set(0, 0, 0.1);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(canvasWidth, canvasHeight);
      currentRef.appendChild(renderer.domElement);

      const sphereGeometry = new THREE.SphereGeometry(1, 60, 40);
      sphereGeometry.scale(-1, 1, 1);
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load("/nzpano.jpg");
      const sphereMaterial = new THREE.MeshBasicMaterial({ map: texture }); // Renamed here
      const backgroundMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
      scene.add(backgroundMesh);

      // Adding a cube as a clickable object
      const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Renamed here
      clickableObject = new THREE.Mesh(geometry, cubeMaterial);
      clickableObject.position.set(2, 0, 0); // Setting position of cube
      scene.add(clickableObject);

      controls = new OrbitControls(camera, renderer.domElement);

      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(5, 5, 5);
      scene.add(light);

      window.addEventListener("resize", onWindowResize, false);

      const loader = new FontLoader();
      loader.load("/fonts/helvetiker_regular.typeface.json", (loadedFont) => {
        fontRef.current = loadedFont;
        createPortfolioInfo(scene, fontRef.current);
      });

      animate();
    }

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      controls.update();
    }

    function onWindowResize() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    }

    function onMouseMove(event) {
      event.preventDefault();

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    function onMouseClick(event) {
      event.preventDefault();

      // update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);

      // calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects(scene.children);

      for (let i = 0; i < intersects.length; i++) {
        // check if the clicked object is our cube
        if (intersects[i].object === clickableObject) {
          // move the camera to a specific position
          camera.position.set(1, 1, 1);
        }
      }
    }

    window.addEventListener("mousemove", onMouseMove, false);
    window.addEventListener("click", onMouseClick, false);

    init();

    return () => {
      if (currentRef) {
        currentRef.removeChild(renderer.domElement);
        window.removeEventListener("resize", onWindowResize, false);
        window.removeEventListener("mousemove", onMouseMove, false);
        window.removeEventListener("click", onMouseClick, false);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
      }}
    ></div>
  );
}
