import * as THREE from "three";
import { Clock } from "three";
import { useEffect, useRef } from "react";
import { Water } from "three/examples/jsm/objects/Water.js";
import { useLoader, useFrame } from "@react-three/fiber";

function WaterComponent({ scene }) {
  const waterNormals = useLoader(
    THREE.TextureLoader,
    "/watertexture.jpg",
    (texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    }
  );

  const water = useRef();
  const clock = new Clock();

  useEffect(() => {
    let waterGeometry = new THREE.PlaneBufferGeometry(1500, 1500);
    waterGeometry.rotateX(-Math.PI / 2);
    water.current = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: waterNormals,
      alpha: 1.0,
      sunDirection: new THREE.Vector3(0.707, 0.707, 0),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: scene.fog !== undefined,
    });
    scene.add(water.current);

    // Clean up on unmount
    return () => {
      scene.remove(water.current);
    };
  }, [waterNormals, scene]);

  useFrame(() => {
    if (water.current) {
      water.current.material.uniforms["time"].value = clock.getElapsedTime();

      // Adjust the following properties for a more realistic water effect
      water.current.material.uniforms["alpha"].value = 1.0; // Adjust transparency
      water.current.material.uniforms["distortionScale"].value = 3.7; // Adjust distortion scale
      water.current.material.uniforms["sunColor"].value.set(1, 1, 1); // Adjust sun color
      water.current.material.uniforms["waterColor"].value.set(0, 0.12, 0.06); // Adjust water color
    }
  });

  return null;
}

export default WaterComponent;
