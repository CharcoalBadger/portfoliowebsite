import * as THREE from "three";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

function Rain() {
  const { scene } = useThree();

  useEffect(() => {
    let rainGeo = new THREE.BufferGeometry();
    let rainPositions = [];
    let rainCount = 15000;
    for (let i = 0; i < rainCount; i++) {
      rainPositions.push(
        Math.random() * 400 - 200,
        Math.random() * 500 - 250,
        Math.random() * 400 - 200
      );
    }
    rainGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(rainPositions, 3)
    );

    let rainMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.1,
      transparent: true,
    });
    let rain = new THREE.Points(rainGeo, rainMaterial);
    scene.add(rain);

    // animate the rain
    const animate = function () {
      let positions = rainGeo.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= 0.1 + Math.random() * 0.1;
        if (positions[i] < -200) {
          positions[i] = 200;
        }
      }
      rainGeo.attributes.position.needsUpdate = true;
      rain.rotation.y += 0.001;
      requestAnimationFrame(animate);
    };

    animate();

    // cleanup
    return () => {
      scene.remove(rain);
    };
  }, [scene]); // pass scene as a dependency

  return null; // it doesn't render anything itself
}

export default Rain;
