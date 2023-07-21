import React, { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

export default function Maori3d() {
  const mount = useRef(null);

  useEffect(() => {
    const currentRef = mount.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0xffffff, 0); // Set clear color to white, fully transparent

    const ambientLight = new THREE.AmbientLight(0x404040, 1.0);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 0, 0.1);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load(
      "/earth.glb",
      function (gltf) {
        gltf.scene.scale.set(1.5, 1.5, 1.5); // Set the scale of the model
        gltf.scene.position.set(0, 1.5, 0);
        // gltf.scene.rotation.y = 65.8;
        // gltf.scene.rotation.x = 44.5;
        scene.add(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 2; // restrict to horizontal rotation
    controls.minPolarAngle = Math.PI / 2; // restrict to horizontal rotation

    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);

      controls.update();
      renderer.render(scene, camera);
    };

    renderer.setSize(mount.current.clientWidth, window.innerHeight);
    camera.aspect = mount.current.clientWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    mount.current.appendChild(renderer.domElement);

    animate();

    // Cleanup on unmount
    return () => {
      currentRef.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mount} />;
}
