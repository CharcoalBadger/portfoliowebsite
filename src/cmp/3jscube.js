import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import createPortfolioInfo from "./createportfolio";
import { Raycaster } from "./raycast"; // add import statement here
import createArrow from "./createarrow";

export default function Threejscube() {
  const containerRef = useRef();
  const fontRef = useRef();

  useEffect(() => {
    let scene, camera, renderer, controls, clickableObject;
    const currentRef = containerRef.current;

    function init() {
      scene = new THREE.Scene();

      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;

      const aspectRatio = canvasWidth / canvasHeight;
      camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
      camera.position.set(0, 0, 0.1);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(canvasWidth, canvasHeight);
      // Add the following line to adjust renderer's output encoding
      renderer.outputEncoding = THREE.sRGBEncoding;
      currentRef.appendChild(renderer.domElement);

      const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
      boxGeometry.scale(-1, -1, -1); // Flip the cube inside out
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load("/nzpanodark1.jpg");
      const boxMaterial = new THREE.MeshBasicMaterial({ map: texture });
      const backgroundMesh = new THREE.Mesh(boxGeometry, boxMaterial);
      scene.add(backgroundMesh);

      // Adding a cube as a clickable object
      const geometry = new THREE.BoxGeometry(0.01, 0.01, 0.01);
      const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      clickableObject = new THREE.Mesh(geometry, cubeMaterial);
      clickableObject.position.set(2, 0, 0);
      scene.add(clickableObject);

      // Add this in your init function after the first cube creation
      const linkCubeGeometry = new THREE.BoxGeometry(0.01, 0.01, 0.01);
      const linkCubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // this time we use red
      const linkCube = new THREE.Mesh(linkCubeGeometry, linkCubeMaterial);
      linkCube.position.set(-2, 0, 0); // we position it to the left of the first cube
      scene.add(linkCube);

      controls = new OrbitControls(camera, renderer.domElement);

      window.addEventListener("resize", onWindowResize, false);

      const loader = new FontLoader();
      loader.load("/fonts/helvetiker_regular.typeface.json", (loadedFont) => {
        fontRef.current = loadedFont;
        createPortfolioInfo(scene, fontRef.current, camera);
      });

      animate();

      const arrow1 = createArrow(
        scene,
        camera,
        "/aboutbuttonwhite.png",
        { x: -0.2, y: -0.6, z: -1 },
        { x: 0, y: 0, z: 0 }
      );

      const arrow2 = createArrow(
        scene,
        camera,
        "/projectbuttonwhite.png",
        { x: 0.2, y: -0.6, z: -1 },
        { x: 0, y: 0, z: Math.PI / 2 }
      );

      const arrow3 = createArrow(
        scene,
        camera,
        "/contactbuttonwhite.png",
        { x: 0.0, y: -0.6, z: -1 },
        { x: 0, y: 0, z: Math.PI }
      );

      const clickableObjects = [
        { object: clickableObject, action: () => camera.position.set(1, 1, 1) },
        {
          object: linkCube,
          action: () => window.open("https://shaunografia.com/", "_blank"),
        },
        {
          object: arrow1,
          action: () => {
            camera.position.set(2, 0, 0); // move camera to x=2, y=0, z=0
            controls.update();
          },
        },
        {
          object: arrow2,
          action: () => {
            camera.position.set(0, 2, 0); // move camera to x=0, y=2, z=0
            controls.update();
          },
        },
        {
          object: arrow3,
          action: () => {
            camera.position.set(0, 0, 2); // move camera to x=0, y=0, z=2
            controls.update();
          },
        },
      ];

      // Instantiate the Raycaster here after the scene, camera, and clickableObject have been initialized
      const raycasterInstance = new Raycaster(scene, camera, clickableObjects);

      window.addEventListener(
        "mousemove",
        (e) => raycasterInstance.onMouseMove(e),
        false
      );
      window.addEventListener(
        "click",
        (e) => raycasterInstance.onMouseClick(e),
        false
      );
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

    init();

    return () => {
      if (currentRef) {
        currentRef.removeChild(renderer.domElement);
        window.removeEventListener("resize", onWindowResize, false);
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
