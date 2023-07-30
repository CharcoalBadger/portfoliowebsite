import React, { useEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import * as THREE from "three";
import "./sands.css";
import Logosands from "./logosands";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Breakpoints for mobile, tablet, and desktop
const breakpoints = {
  desktop768: 768,
  desktop1024: 1024,
  desktop1280: 1280,
  desktop1366: 1366,
  desktop1440: 1440,
  desktop1600: 1600,
  desktop1920: 1920,
};

const getScaleForWidth = (width) => {
  if (width <= breakpoints.desktop768) {
    return [0.1, 0.1, 0.1]; // scale for default
  } else if (width < breakpoints.desktop1024) {
    return [1, 1, 0.8]; // additional scale
  } else if (width < breakpoints.desktop1280) {
    return [1.3, 1.3, 1]; // additional scale
  } else if (width < breakpoints.desktop1366) {
    return [1.7, 1.7, 1.2]; // additional scale
  } else if (width < breakpoints.desktop1440) {
    return [1.7, 1.7, 1.2]; // additional scale
  } else if (width < breakpoints.desktop1600) {
    return [1.7, 1.7, 1.2]; // additional scale
  } else if (width < breakpoints.desktop1920) {
    return [2, 2, 1.3]; // additional scale
  } else {
    return [2.5, 2.5, 1.5]; // scale for desktop
  }
};

const getPositionForWidth = (width) => {
  if (width <= breakpoints.desktop768) {
    return [0.1, 0.1, 0.1]; // position for default
  } else if (width < breakpoints.desktop1024) {
    return [0.2, -30, -300]; // additional position
  } else if (width < breakpoints.desktop1280) {
    return [0.3, -30, -300]; // additional position
  } else if (width < breakpoints.desktop1366) {
    return [0.4, -30, -300]; // additional position
  } else if (width < breakpoints.desktop1440) {
    return [0.5, -30, -300]; // additional position
  } else if (width < breakpoints.desktop1600) {
    return [0.6, -30, -300]; // additional position
  } else if (width < breakpoints.desktop1920) {
    return [0.1, -30, -300]; // position for tablet
  } else {
    return [0.1, -30, -300]; // position for desktop
  }
};

export default function Sands() {
  const containerRef = useRef();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const lenis = new Lenis();
  lenis.on("scroll", (e) => {});

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  useEffect(() => {
    const container = containerRef.current;
    const scale = getScaleForWidth(windowWidth);
    let position = getPositionForWidth(windowWidth);

    // Set up scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    var pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 400, 100);
    scene.add(pointLight);

    const loader = new GLTFLoader();

    // Prepare the video element
    const video = document.createElement("video");
    video.loop = true;
    video.muted = true;
    video.preload = "none"; // Prevents the browser from preloading the video

    // Video texture needs to be prepared but don't set the video source yet
    const screenTexture = new THREE.VideoTexture(video);

    let playPromise;

    // Intersection Observer setup
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Set the video source and play the video when it becomes visible
          video.src = "/sands-recording-1k-new.mp4";
          playPromise = video.play();
        } else {
          // Pause the video when it's not visible
          if (playPromise) {
            playPromise.then(
              () => video.pause(),
              (error) => console.error(error)
            );
          }
        }
      });
    }, observerOptions);

    observer.observe(container);

    // Add DRACOLoader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/");
    loader.setDRACOLoader(dracoLoader);

    loader.load("/laptop1Draco.glb", (gltf) => {
      const model = gltf.scene;

      // Apply screen texture
      model.traverse((node) => {
        if (node.isMesh && node.material.name === "material_2") {
          // Replace 'ScreenMaterial' with the actual material name
          node.material.map = screenTexture;
          node.material.needsUpdate = true;
        }
        let rotationSpeed = 0.00001; // adjust as needed
        let lastTouchX = null;

        function rotateModel(e) {
          let currentX =
            e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
          if (lastTouchX !== null) {
            let deltaX = currentX - lastTouchX;
            model.rotation.y += deltaX * rotationSpeed; // rotate on y-axis
          }
          lastTouchX = currentX;
        }

        container.addEventListener("mousemove", rotateModel);
        container.addEventListener("touchmove", rotateModel);
        return () => {
          container.removeEventListener("mousemove", rotateModel);
          container.removeEventListener("touchmove", rotateModel);
          // other cleanup code...
        };
      });

      scene.add(model);

      model.position.set(...position);
      model.scale.set(...scale);
      model.rotation.y = 66.2;
      model.rotation.x = 44.5;

      function animate() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          screenTexture.needsUpdate = true;
        }
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
      animate();
    });

    function handleResize() {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    let tlsa = gsap.timeline({
      scrollTrigger: {
        trigger: ".saparent-container",
        start: "center bottom",
        end: "bottom center",
        scrub: true,
        toggleActions: "play none none reverse",
      },
    });

    tlsa.to(".sadisplacement", {
      attr: {
        r: 450,
      },
      duration: 2,
    });

    return () => {
      observer.unobserve(container);
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
    };
  }, [windowWidth]);

  return (
    <div className="saparent-container">
      <svg
        viewBox="0 0 1920 960"
        fill="none"
        preserveAspectRatio="xMidYMin slice"
      >
        <defs>
          <filter id="sadisplacementFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01"
              numOctaves="1"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="50"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <mask id="sacircleMask">
            <circle
              cx="960" //x position
              cy="480" //y position
              r="0" //radius
              fill="white"
              className="sadisplacement"
            />
          </mask>
        </defs>
        <image
          style={{ transform: "translateX(-20%)" }}
          // href="https://images.unsplash.com/photo-1617957718587-60a442884bee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
          href="/gradient-rad.png"
          width="100%"
          height="100%"
          mask="url(#sacircleMask)"
        />
        {/* <rect
        
          fill="#2DA639"
          width="100%"
          height="100%"
          mask="url(#circleMask)"
        /> */}
      </svg>
      <div className="stext-container">
        <Logosands />
        <h1>Sands Carving Studio</h1>
        <p>
          The Sands Carving Studio website revamp was primarily undertaken to
          correct non-functional components and enhance its overall user
          interface and experience.
        </p>
        <p>
          Initial requirements encompassed the incorporation of a new video with
          a custom video player, which evolved into a comprehensive site
          overhaul. This ranged from redesigning the navigation and footer to
          remodeling product pages, along with crafting custom functionalities
          such as accordion-style FAQ sections and product filters. This project
          was completed in Shopify after a dedicated two-day learning period.
          The result was a renewed, user-friendly e-commerce website that
          significantly impressed the client, leading to further collaboration
          opportunities for additional upgrades.
        </p>
        <h3>HTML | CSS | Javascript </h3>
        <div className="slink-group">
          <a
            href="https://sandscarvingstudio.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="sexternal-logo"
              src="external-color.svg"
              alt="external link logo"
            />
          </a>
        </div>
      </div>
      <div ref={containerRef} className="sands-container" />
    </div>
  );
}
