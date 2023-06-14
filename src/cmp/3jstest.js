import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import createTree from "./tree"; // assuming the path to tree.js
import createGround from "./ground";

export default function Threejstest() {
  const containerRef = useRef();

  useEffect(() => {
    let scene, camera, renderer, controls;
    const treePool = [];

    function init() {
      scene = new THREE.Scene();

      const canvasWidth = 4174;
      const canvasHeight = 1800;

      const aspectRatio = canvasWidth / canvasHeight;
      camera = new THREE.PerspectiveCamera(55, aspectRatio, 0.1, 1000);
      camera.position.set(5, 3, 5);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.appendChild(renderer.domElement);

      // Add light sources
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 2, 4);
      scene.add(directionalLight);

      const sphereGeometry = new THREE.SphereGeometry(500, 60, 40);
      sphereGeometry.scale(-1, 1, 1);
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load("/orangeforest.jpg");
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const backgroundMesh = new THREE.Mesh(sphereGeometry, material);
      scene.add(backgroundMesh);

      controls = new OrbitControls(camera, renderer.domElement);

      // Creating a pool of trees
      for (let i = 0; i < 100; i++) {
        const tree = createTree();
        tree.position.set(
          Math.random() * 100 - 50,
          0,
          Math.random() * 100 - 50
        );
        scene.add(tree);
        treePool.push(tree);
      }

      const ground = createGround();
      scene.add(ground);

      animate();
    }

    function animate() {
      requestAnimationFrame(animate);

      // Move trees towards the camera
      for (let i = 0; i < treePool.length; i++) {
        const tree = treePool[i];
        tree.position.z += 0.1;

        // If the tree has passed the camera, reposition it in front
        if (tree.position.z > camera.position.z) {
          tree.position.z -= 100;
        }
      }

      renderer.render(scene, camera);
      controls.update();
    }

    init();
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
