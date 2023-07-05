import React, { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import "./sands.css";
import Logosands from "./logosands";

export default function Sands() {
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
    const screenTexture = textureLoader.load("/sandsimage.png");

    loader.load(
      "/laptop1.glb",
      (gltf) => {
        console.log("GLB loaded successfully", gltf);
        const model = gltf.scene;

        // Apply screen texture
        model.traverse((node) => {
          // gltf.scene.traverse((node) => {
          //   if (node.isMesh) {
          //     console.log(
          //       "Found a mesh node:",
          //       node.name,
          //       "with material:",
          //       node.material.name
          //     );
          //   }
          // });

          if (node.isMesh && node.material.name === "material_2") {
            // Replace 'ScreenMaterial' with the actual material name
            node.material.map = screenTexture;
            node.material.needsUpdate = true;
          }
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
          return () => {
            container.removeEventListener("mousemove", rotateModel);
            container.removeEventListener("touchmove", rotateModel);
            // other cleanup code...
          };
        });

        scene.add(model);

        model.position.set(0.1, 0, -300);
        model.scale.set(2, 2, 1.5);
        model.rotation.y = 66.2;
        model.rotation.x = 44.5;

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

    function handleResize() {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="sparent-container">
      <div className="stext-container">
        <Logosands />
        <h1>Sands Carving Studio</h1>
        <p>
          Lorem ipsum dolor sit amet. Ut velit accusamus eos fugit eius eos
          quidem similique ut molestiae dolorem ea quam laborum. Est doloribus
          molestiae ut esse repellat cum voluptas exercitationem et minus
          consectetur est officia perferendis aut consequatur Quis ex dolores
          nemo. Ad possimus officiis id quae.
        </p>
        <h3>HTML | CSS | Javascript </h3>
        <div className="slink-group">
          <a
            href="https://sandscarvingstudio.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="sexternal-logo"
              src="external-link-alt.svg"
              alt="external link logo"
            />
          </a>
        </div>
      </div>
      <div ref={containerRef} className="sands-container" />
    </div>
  );
}
