import * as THREE from "three";

export default function createClickableImage(
  scene,
  imagePath,
  link,
  position,
  width,
  height
) {
  const texture = new THREE.TextureLoader().load(imagePath);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide, // make the material double sided
    transparent: true,
  });
  const geometry = new THREE.PlaneGeometry(width, height);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(position);
  scene.add(mesh);
  return mesh;
}
