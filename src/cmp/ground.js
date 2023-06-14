import * as THREE from "three";

export default function createGround() {
  // Load the texture
  const textureLoader = new THREE.TextureLoader();
  const groundTexture = textureLoader.load("/watertexture.jpg");

  groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
  groundTexture.repeat.set(25, 25);

  // Create the ground
  const groundGeometry = new THREE.PlaneGeometry(500, 500);
  const groundMaterial = new THREE.MeshBasicMaterial({ map: groundTexture });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);

  // Rotate the ground plane to be horizontal
  ground.rotation.x = -Math.PI / 2;

  return ground;
}
