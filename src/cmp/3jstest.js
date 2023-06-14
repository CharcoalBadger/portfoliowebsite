import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Water } from "three/examples/jsm/objects/Water.js";

export default function Threejstest() {
  const containerRef = useRef();

  useEffect(() => {
    let scene, camera, renderer, controls, water;

    function init() {
      scene = new THREE.Scene();

      const canvasWidth = 4174;
      const canvasHeight = 1800;

      const aspectRatio = canvasWidth / canvasHeight;
      camera = new THREE.PerspectiveCamera(55, aspectRatio, 0.1, 1000);
      camera.position.set(5, 3, 5);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(canvasWidth, canvasHeight);
      containerRef.current.appendChild(renderer.domElement);

      const sphereGeometry = new THREE.SphereGeometry(500, 60, 40);
      sphereGeometry.scale(-1, 1, 1);
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load("/neon-city-main.jpg");
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const backgroundMesh = new THREE.Mesh(sphereGeometry, material);
      scene.add(backgroundMesh);

      controls = new OrbitControls(camera, renderer.domElement);

      var light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(5, 5, 5);
      scene.add(light);

      const circleRadius = Math.min(canvasWidth, canvasHeight) / 100;
      const segments = 64; // Number of segments used to create the circle geometry
      const waterGeometry = new THREE.CircleGeometry(circleRadius, segments);
      water = new Water(waterGeometry, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load(
          "/watertexture.jpg",
          function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          }
        ),
        alpha: 1.0,
        sunDirection: light.position.clone().normalize(),
        sunColor: 0xffffff,
        waterColor: 0x00aec6,
        distortionScale: 3.7,
        fog: scene.fog !== undefined,
      });
      water.rotation.x = -Math.PI / 2;
      scene.add(water);

      animate();
    }

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      controls.update();
      water.material.uniforms["time"].value += 1.0 / 60.0;
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
