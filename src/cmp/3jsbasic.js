import { useEffect } from "react";
import * as THREE from "three";

export default function Threejsbasic() {
  useEffect(() => {
    // Create a new scene
    const scene = new THREE.Scene();
    console.log("Threejsdome component initialized");

    // Set the background color to green
    scene.background = new THREE.Color(0x00ff00); // green

    // Create a camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Set the camera position
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer();

    // Set the size of the renderer
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Append the renderer to the document body
    document.body.appendChild(renderer.domElement);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();

    // This will be called when the component unmounts
    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return null; // This component doesn't render anything itself
}
