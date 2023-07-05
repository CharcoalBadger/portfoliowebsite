import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./logosands.css";

gsap.registerPlugin(ScrollTrigger);

export default function Logosands() {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;

    // Set up scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    var light = new THREE.PointLight(0xffffff, 1, 0);
    light.position.set(0, 0, 0); // you can change the position
    scene.add(light);

    // Load 3D model
    const loader = new GLTFLoader();
    loader.load(
      "/3dsands.glb",
      (gltf) => {
        console.log("GLB loaded successfully", gltf);
        const model = gltf.scene;
        scene.add(model);

        // Position and scale the model as needed
        model.position.set(0, -0.4, -1);
        model.scale.set(2, 2, 2);

        // Set up animation using GSAP
        const tl = gsap.timeline({ repeat: -1 });
        tl.to(model.rotation, { y: Math.PI * 2, duration: 4 });

        // Render loop
        function animate() {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        }
        animate();
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error("Error loading GLB", error);
      }
    );

    // Resize handling
    function handleResize() {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="logosands-container" />;
}
