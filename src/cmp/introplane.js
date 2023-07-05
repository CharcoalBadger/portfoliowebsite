import * as THREE from "three";

export default function Introplane() {
  let planeMesh, buttonMesh;
  let isExpanded = false;

  const textureLoader = new THREE.TextureLoader();

  const boxGeometry = new THREE.BoxGeometry(0.2, 0.4, 0.1); // Adjust the third parameter for the depth
  const boxTexture = textureLoader.load("/aboutportfolio.png"); // Replace with your image path
  const boxMaterial = new THREE.MeshBasicMaterial({
    map: boxTexture,
    side: THREE.DoubleSide,
  });
  planeMesh = new THREE.Mesh(boxGeometry, boxMaterial);

  const buttonGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const buttonTexture = textureLoader.load("/aboutportfolio.png"); // Replace with your image path
  const buttonMaterial = new THREE.MeshBasicMaterial({ map: buttonTexture });
  buttonMesh = new THREE.Mesh(buttonGeometry, buttonMaterial);
  buttonMesh.position.set(0.4, 0.9, 0); // Adjust the y-coordinate as needed

  function togglePlane() {
    if (isExpanded) {
      planeMesh.scale.y = 0.1;
      planeMesh.position.y = 0.9; // Half of the scaled height
    } else {
      planeMesh.scale.y = 1;
      planeMesh.position.y = 0; // Reset the position when the plane is expanded
    }
    isExpanded = !isExpanded;
  }

  return { planeMesh, buttonMesh, togglePlane };
}
