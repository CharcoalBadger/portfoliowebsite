import * as THREE from "three";

export default function createArrow(
  scene,
  camera,
  imagePath,
  position,
  rotation
) {
  const spriteMap = new THREE.TextureLoader().load(imagePath);
  const spriteMaterial = new THREE.SpriteMaterial({
    map: spriteMap,
    color: 0xffffff,
    depthTest: false, // Disable depth testing for the sprite material
  });
  const arrowSprite = new THREE.Sprite(spriteMaterial);

  arrowSprite.position.set(position.x, position.y, position.z);
  arrowSprite.rotation.set(rotation.x, rotation.y, rotation.z);
  arrowSprite.scale.set(0.1, 0.1, 1); // Adjust scale if needed

  // Add the arrow sprite to the camera and the camera to the scene
  camera.add(arrowSprite);
  scene.add(camera);

  return arrowSprite;
}
