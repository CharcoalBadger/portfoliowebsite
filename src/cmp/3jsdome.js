import * as THREE from "three";
import { useEffect, useRef } from "react";
import "./3jsdome.css";
import WaterComponent from "./water";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import createClickableImage from "./createshaunografia";
import { Raycaster } from "./raycast";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Threejsdome() {
  const mainCanva = useRef();

  useEffect(() => {
    console.log("Threejsdome component initialized");
    console.trace();
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.set(0, 50, 0);

    const ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);

    const renderer = new THREE.WebGLRenderer();
    scene.fog = new THREE.FogExp2(0x003329, 0.001);
    renderer.setClearColor(scene.fog.color);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Here you create a new variable to hold the reference
    const canvas = mainCanva.current;
    canvas.appendChild(renderer.domElement);

    // Create the water component
    const water = WaterComponent();
    // Add the fog condition and add it to the scene
    water.fog = scene.fog !== undefined;
    scene.add(water);

    // Create an array to hold clickable objects
    let clickableObjects = [];

    const positions = [
      new THREE.Vector3(-200, 50, 0),
      new THREE.Vector3(-10, 50, 237),
      new THREE.Vector3(200, 50, 0),
      new THREE.Vector3(40, 50, -237),
    ];

    const imagesData = [
      {
        imagePath: "intro.jpg",
        link: "https://example1.com",
      },
      {
        imagePath: "shaunimage.png",
        link: "https://shaunografia.com/",
      },
      {
        imagePath: "sandsimage.png",
        link: "https://sandscarvingstudio.com/",
      },
      {
        imagePath: "about.jpg",
        link: "https://example3.com",
      },
    ];

    // Iterate over imagesData and create clickable images for each entry
    for (let i = 0; i < imagesData.length; i++) {
      const { imagePath, link } = imagesData[i];
      const position = positions[i];
      const imageMesh = createClickableImage(
        scene,
        imagePath,
        link,
        position,
        100,
        100
      );

      scene.add(imageMesh);

      clickableObjects.push({
        object: imageMesh,
        action: () => {
          window.open(link, "_blank");
        },
      });
    }

    // Create a Raycaster instance
    const raycaster = new Raycaster(scene, camera, clickableObjects);

    // Add mouse move and click event listeners
    renderer.domElement.addEventListener(
      "mousemove",
      raycaster.onMouseMove.bind(raycaster)
    );
    renderer.domElement.addEventListener(
      "click",
      raycaster.onMouseClick.bind(raycaster)
    );

    const animate = function () {
      // rotate each image to face the camera
      for (let i = 0; i < imagesData.length; i++) {
        clickableObjects[i].object.lookAt(camera.position);
      }

      // controls.update();
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Don't forget to cleanup event listeners on unmount
    return () => {
      renderer.domElement.removeEventListener(
        "mousemove",
        raycaster.onMouseMove
      );
      renderer.domElement.removeEventListener("click", raycaster.onMouseClick);
      canvas.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="canvas-container" ref={mainCanva}>
      <div className="stage-1">
        <p className="canva-text">Hello, World!</p>
      </div>
      <div className="stage-2">
        <p className="canva-text">This is section 2!</p>
      </div>
      <div className="stage-3">
        <p className="canva-text">Welcome to section 3!</p>
      </div>
      <div className="stage-4">
        <p className="canva-text">You are in the last section!</p>
      </div>
    </div>
  );
}
