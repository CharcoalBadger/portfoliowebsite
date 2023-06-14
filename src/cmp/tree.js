import * as THREE from "three";

export default function createTree() {
  // Create the trunk
  const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5);
  const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8b4513 });
  const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);

  // Create the crown
  const crownGeometry = new THREE.ConeGeometry(0.25, 0.5, 4);
  const crownMaterial = new THREE.MeshBasicMaterial({ color: 0x008000 });
  const crown = new THREE.Mesh(crownGeometry, crownMaterial);
  crown.position.y = 0.5;

  // Combine trunk and crown into a single tree object
  const tree = new THREE.Group();
  tree.add(trunk);
  tree.add(crown);

  return tree;
}
