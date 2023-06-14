import * as THREE from "three";

export default function createGround() {
  // Load the texture
  const textureLoader = new THREE.TextureLoader();
  const groundTexture = textureLoader.load("/grass1.jpg");

  // Load the displacement map
  const displacementTexture = textureLoader.load("/grassdisc.jpg");

  groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
  groundTexture.repeat.set(25, 25);

  // Create the ground
  const groundGeometry = new THREE.PlaneGeometry(500, 500, 64, 64); // increased the segments for better displacement
  const groundMaterial = new THREE.MeshPhongMaterial({
    // changed to MeshPhongMaterial for better lighting
    map: groundTexture,
    displacementMap: displacementTexture, // set displacement map
    displacementScale: 10, // set displacement scale
  });

  const ground = new THREE.Mesh(groundGeometry, groundMaterial);

  // Rotate the ground plane to be horizontal
  ground.rotation.x = -Math.PI / 2;

  return ground;
}
