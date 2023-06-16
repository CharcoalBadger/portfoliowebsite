import * as THREE from "three";

export default function createClickableImage(
  scene,
  imageUrl,
  linkUrl,
  position,
  size
) {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(imageUrl);

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
  });
  const geometry = new THREE.PlaneGeometry(size.width, size.height);
  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.set(position.x, position.y, position.z);

  mesh.addEventListener("mousedown", () => {
    window.open(linkUrl, "_blank");
  });

  mesh.cursor = "pointer";

  scene.add(mesh);
}
