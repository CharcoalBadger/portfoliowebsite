import React, { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import "./shaunophone.css";

export function Shaunophone() {
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
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const loader = new GLTFLoader();

    // Load the screen texture
    const textureLoader = new THREE.TextureLoader();
    const screenTexture = textureLoader.load("/shaunimage.png");

    loader.load(
      "/mobile9.glb",
      (gltf) => {
        console.log("GLB loaded successfully", gltf);
        const model = gltf.scene;

        // Apply screen texture
        model.traverse((node) => {
          if (node.isMesh) {
            console.log(
              "Found a mesh node Mobilee:",
              node.name,
              "with material:",
              node.material.name
            );
            if (node.material.name === "blinn7") {
              node.material.map = screenTexture;
              node.material.needsUpdate = true;
            }
          }
        });

        let rotationSpeed = 0.00001; // adjust as needed
        let lastTouchX = null;

        function rotateModel(e) {
          let currentX =
            e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
          if (lastTouchX !== null) {
            let deltaX = currentX - lastTouchX;
            model.rotation.y += deltaX * rotationSpeed; // rotate on y-axis
          }
          lastTouchX = currentX;
        }

        container.addEventListener("mousemove", rotateModel);
        container.addEventListener("touchmove", rotateModel);

        scene.add(model);

        model.position.set(0, -1, 0);
        model.scale.set(5, 5, 5);
        model.rotation.y = 3;
        model.rotation.x = 3;

        function animate() {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        }
        animate();

        // clean up on component unmount
        return () => {
          container.removeEventListener("mousemove", rotateModel);
          container.removeEventListener("touchmove", rotateModel);
          window.removeEventListener("resize", handleResize);
          container.removeChild(renderer.domElement);
        };
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.error("Error loading GLB", error);
      }
    );

    function handleResize() {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="shparent-container">
      <div ref={containerRef} className="shaunophone-container" />
    </div>
  );
}
