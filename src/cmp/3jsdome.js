import * as THREE from "three";
import { useEffect, useRef } from "react";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Water } from "three/examples/jsm/objects/Water.js";
import createClickableImage from "./createshaunografia";
import { Raycaster } from "./raycast";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Threejsdome() {
  const containerRef = useRef();

  useEffect(() => {
    console.log("Threejsdome component initialized");
    console.trace();
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.set(20, 2, 0.1);

    const ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);

    const renderer = new THREE.WebGLRenderer();
    scene.fog = new THREE.FogExp2(0x003329, 0.001);
    renderer.setClearColor(scene.fog.color);
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    //Add OrbitControls
    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.addEventListener("change", function () {
    //   console.log(
    //     `Camera Position: x = ${camera.position.x}, y = ${camera.position.y}, z = ${camera.position.z}`
    //   );
    // });
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.05;
    // controls.screenSpacePanning = false;
    // controls.minDistance = 100;
    // controls.maxDistance = 500;
    // controls.maxPolarAngle = Math.PI;

    const flash = new THREE.PointLight(0x062d89, 30, 500, 1.7);
    flash.position.set(200, 300, 100);
    scene.add(flash);

    // Add water
    let waterGeometry = new THREE.PlaneBufferGeometry(1500, 1500);
    waterGeometry.rotateX(-Math.PI / 2);
    let water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load(
        "/watertexture.jpg",
        function (texture) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }
      ),
      alpha: 1.0,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: scene.fog !== undefined,
    });
    scene.add(water);

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

    // Create an array to hold clickable objects
    let clickableObjects = [];

    const positions = [
      new THREE.Vector3(-200, 50, 0),
      new THREE.Vector3(-10, 50, 237),
      new THREE.Vector3(200, 50, 0),
      new THREE.Vector3(40, 50, -237),
    ];

    const imagesData = [
      {
        imagePath: "intro.jpg",
        link: "https://example1.com",
      },
      {
        imagePath: "shaunimage.png",
        link: "https://shaunografia.com/",
      },
      {
        imagePath: "sandsimage.png",
        link: "https://sandscarvingstudio.com/",
      },
      {
        imagePath: "about.jpg",
        link: "https://example3.com",
      },
    ];

    // Iterate over imagesData and create clickable images for each entry
    for (let i = 0; i < imagesData.length; i++) {
      const { imagePath, link } = imagesData[i];
      const position = positions[i];
      const imageMesh = createClickableImage(
        scene,
        imagePath,
        link,
        position,
        100,
        100
      );

      scene.add(imageMesh);

      clickableObjects.push({
        object: imageMesh,
        action: () => {
          window.open(link, "_blank");
        },
      });
    }

    // Create a Raycaster instance
    const raycaster = new Raycaster(scene, camera, clickableObjects);

    // Add mouse move and click event listeners
    renderer.domElement.addEventListener(
      "mousemove",
      raycaster.onMouseMove.bind(raycaster)
    );
    renderer.domElement.addEventListener(
      "click",
      raycaster.onMouseClick.bind(raycaster)
    );

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        markers: true,
      },
    });

    tl.to(camera.position, { x: 20, y: 5, z: 0.1, duration: 3 })
      .to(camera.position, { x: 10, y: 5, z: 5, duration: 3 })
      .to(camera.position, { x: -10, y: -5, z: -5, duration: 3 })
      .to(camera.rotation, { y: Math.PI / 4, duration: 3 }, "<"); // rotation change starts at the beginning of the timeline

    const animate = function () {
      if (Math.random() > 0.93 || flash.power > 100) {
        if (flash.power < 100)
          flash.position.set(
            Math.random() * 400,
            300 + Math.random() * 200,
            100
          );
        flash.power = 50 + Math.random() * 500;
      }

      let positions = rainGeo.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= 0.1 + Math.random() * 0.1;
        if (positions[i] < -200) {
          positions[i] = 200;
        }
      }
      rainGeo.attributes.position.needsUpdate = true;
      rain.rotation.y += 0.001;

      water.material.uniforms["time"].value += 1.0 / 60.0; // add this line to make water move

      // rotate each image to face the camera
      for (let i = 0; i < imagesData.length; i++) {
        clickableObjects[i].object.lookAt(camera.position);
      }

      // controls.update();
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
    // Don't forget to cleanup event listeners on unmount
    return () => {
      window.removeEventListener("mousemove", raycaster.onMouseMove);
      window.removeEventListener("click", raycaster.onMouseClick);

      // Kill GSAP animations
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: "100vh", overflow: "scroll" }} />
  );
}
