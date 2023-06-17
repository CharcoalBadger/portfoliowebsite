import * as THREE from "three";
export class Raycaster {
  constructor(scene, camera, clickableObjects) {
    this.scene = scene;
    this.camera = camera;
    this.clickableObjects = clickableObjects;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
  }

  onMouseMove(event) {
    event.preventDefault();

    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  onMouseClick(event) {
    event.preventDefault();

    // update the picking ray with the camera and mouse position
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // calculate objects intersecting the picking ray
    const intersects = this.raycaster.intersectObjects(this.scene.children);

    for (let i = 0; i < intersects.length; i++) {
      for (let j = 0; j < this.clickableObjects.length; j++) {
        if (intersects[i].object === this.clickableObjects[j].object) {
          if (this.clickableObjects[j].action) {
            this.clickableObjects[j].action();
          }
        }
      }
    }
  }
}
