import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "./maori3d.css";

const Maori3d = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;

    // scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.6,
      1200
    );
    camera.position.z = 5;
    camera.position.y = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0); // the second argument is the alpha (transparency), set to 0

    const divWidth = mount.clientWidth;
    const divHeight = mount.clientHeight;

    renderer.setSize(divWidth, divHeight);
    console.log(`Renderer size set to ${divWidth} x ${divHeight}`);

    camera.aspect = divWidth / divHeight;
    camera.updateProjectionMatrix();

    mount.appendChild(renderer.domElement);

    window.addEventListener("resize", () => {
      const newDivWidth = mount.clientWidth;
      const newDivHeight = mount.clientHeight;

      renderer.setSize(newDivWidth, newDivHeight);
      camera.aspect = newDivWidth / newDivHeight;
      camera.updateProjectionMatrix();
    });
    const controls = new TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 0.8;
    controls.dynamicDampingFactor = 0.15;
    controls.noZoom = true; // disables zooming
    controls.noPan = true; // disables panning (which is usually initiated with right click)

    // Declare a variable to hold your loaded model
    let model = null;

    const loader = new GLTFLoader();
    loader.load(
      "/earth.glb",
      function (gltf) {
        model = gltf.scene; // Assign the loaded scene to the variable
        model.scale.set(2.3, 2.3, 2.3); // Set the scale of the model
        model.position.set(0, 0, 0);
        scene.add(model);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );

    const lights = [];
    const lightColours = [
      [0x14d14a, 8, 12],
      [0xbe61cf, 6, 12],
      [0x00ffff, 3, 10],
      [0x00ff00, 6, 12],
      [0x16a7f5, 6, 12],
      [0x90f615, 6, 12],
    ];
    const lightPositions = [
      [1, 0, 8],
      [-2, 1, -10],
      [0, 10, 1],
      [0, -10, -1],
      [10, 3, 0],
      [-10, -1, 0],
    ];
    for (let i = 0; i < 6; i++) {
      lights[i] = new THREE.PointLight(
        lightColours[i][0],
        lightColours[i][1],
        lightColours[i][2]
      );
      lights[i].position.set(
        lightPositions[i][0],
        lightPositions[i][1],
        lightPositions[i][2]
      );
      scene.add(lights[i]);
    }

    const render = () => {
      requestAnimationFrame(render);
      controls.update();
      scene.rotation.z -= 0.001;
      scene.rotation.x -= 0.001;

      renderer.render(scene, camera);
    };
    render();

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="maoridiv" />;
};

export default Maori3d;
