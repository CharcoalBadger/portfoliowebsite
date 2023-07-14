import React, { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import "./shaunografia.css";
import Logoshaun from "./3dlogoshaun";

export default function Shaunografia() {
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
      "/laptop1.glb",
      (gltf) => {
        console.log("GLB loaded successfully", gltf);
        const model = gltf.scene;

        // Apply screen texture
        model.traverse((node) => {
          gltf.scene.traverse((node) => {
            if (node.isMesh) {
              console.log(
                "Found a mesh node:",
                node.name,
                "with material:",
                node.material.name
              );
            }
          });

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

        model.position.set(0.1, -30, -300);
        model.scale.set(2.5, 2.5, 1.5);
        model.rotation.y = 65.8;
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
    <div className="parent-container">
      <div className="text-container">
        <Logoshaun />
        <h1>Shaunografia</h1>
        <p>
          The Shaunografia website is a minimalist, mobile-friendly platform,
          created for a freelance photographer to uniquely showcase their work
          and service offerings beyond traditional social media.
        </p>
        <p>
          Emphasizing visual content over text, the site uses the GreenSock
          Animation Platform (GSAP) to craft distinctive animations, delivering
          a captivating user experience while highlighting the photographer's
          work. Iterative design processes led to a refined final product that
          seamlessly caters to both desktop and mobile users, receiving
          enthusiastic client approval for its balance of aesthetics,
          functionality, and creative spirit.
        </p>
        <h3>React | Github | GSAP </h3>
        <div className="link-group">
          <a
            href="https://github.com/CharcoalBadger/Shaunografia"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="github-logo"
              src="github-alt-1.svg"
              alt="github logo"
            />
          </a>
          <a
            href="https://shaunografia.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="external-logo"
              src="external-link-alt.svg"
              alt="external link logo"
            />
          </a>
        </div>
      </div>
      <div ref={containerRef} className="shaunografia-container" />
    </div>
  );
}
