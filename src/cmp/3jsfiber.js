import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
// import Rain from "./rain";
import WaterComponent from "./water";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger);

function Scene() {
  // This is where you would add your lights, objects, etc.
  return (
    <>
      <ambientLight intensity={0.5} color={0x555555} />
      <spotLight position={[10, 10, 10]} angle={0.3} />
      {/* Your objects go here */}
    </>
  );
}

export default function Threejsfiber() {
  const [scene, setScene] = useState(null);

  return (
    <Canvas
      camera={{
        fov: 75,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 1000,
        position: [20, 2, 0.1],
      }}
      onCreated={({ gl, scene }) => {
        scene.fog = new THREE.FogExp2(0x003329, 0.001);
        gl.setClearColor(0x003329); // Here you set the color (black in this case)
        setScene(scene);
      }}
    >
      <Scene />
      {/* <Rain /> */}
      {scene && <WaterComponent scene={scene} />}

      <OrbitControls />
    </Canvas>
  );
}
