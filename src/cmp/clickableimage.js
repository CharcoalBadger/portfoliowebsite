import * as THREE from "three";

export default function ClickableImage({
  scene,
  imagePath,
  link,
  x,
  y,
  z,
  width,
  height,
}) {
  const position = new THREE.Vector3(x, y, z); // Create a Vector3 object from x, y, z

  const texture = new THREE.TextureLoader().load(imagePath);
  const material = new THREE.MeshStandardMaterial({
    // Use MeshStandardMaterial or MeshPhongMaterial
    map: texture,
    side: THREE.DoubleSide, // make the material double sided
    transparent: true,
  });
  const geometry = new THREE.PlaneGeometry(width, height);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(position);
  scene.add(mesh);

  // Enable raycasting for interaction
  mesh.raycast = () => {
    const intersection = new THREE.Intersection();
    intersection.object = mesh;
    return [intersection];
  };

  // Handle click event
  mesh.onClick = () => {
    window.open(link, "_blank");
  };

  return mesh;
}
