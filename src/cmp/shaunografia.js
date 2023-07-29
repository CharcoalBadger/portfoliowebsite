import React, { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import * as THREE from "three";
import "./shaunografia.css";
import Logoshaun from "./3dlogoshaun";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Shaunografia() {
  const containerRef = useRef();

  const lenis = new Lenis();
  lenis.on("scroll", (e) => {});

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  useEffect(() => {
    const container = containerRef.current;

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

    var pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 400, 100);
    scene.add(pointLight);

    const loader = new GLTFLoader();

    // Load the screen texture
    // const textureLoader = new THREE.TextureLoader();
    // const screenTexture = textureLoader.load("/shaunimage.png");

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
          video.src = "/shaunografia-recording-5k.mp4";
          playPromise = video.play();
        } else {
          // Pause the video when it's not visible
          if (playPromise) {
            playPromise.then(
              () => video.pause(),
              (error) => console.error(error)
            );
            // Optional: Remove the video source when it's not visible
            // video.src = '';
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
        // gltf.scene.traverse((node) => {
        //   if (node.isMesh) {
        //     console.log(
        //       "Found a mesh node:",
        //       node.name,
        //       "with material:",
        //       node.material.name
        //     );
        //   }
        // });

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

      model.position.set(0.1, -30, -300);
      model.scale.set(2.5, 2.5, 1.5);
      model.rotation.y = 65.8;
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
    }
    window.addEventListener("resize", handleResize);

    let tlsh = gsap.timeline({
      scrollTrigger: {
        trigger: ".shparent-container",
        start: "center bottom",
        end: "bottom center",
        scrub: true,
        toggleActions: "play none none reverse",
      },
    });

    tlsh.to(".shdisplacement", {
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
  }, []);

  return (
    <div className="shparent-container">
      <svg
        viewBox="0 0 1920 960"
        fill="none"
        preserveAspectRatio="xMidYMin slice"
      >
        <defs>
          <filter id="shdisplacementFilter">
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
          <mask id="shcircleMask">
            <circle
              cx="960" //x position
              cy="480" //y position
              r="0" //radius
              fill="white"
              className="shdisplacement"
            />
          </mask>
        </defs>
        <image
          style={{ transform: "translateX(20%)" }}
          // href="https://images.unsplash.com/photo-1617957718587-60a442884bee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
          href="/gradient-rad.png"
          width="100%"
          height="100%"
          mask="url(#shcircleMask)"
        />
        {/* <rect
        
          fill="#2DA639"
          width="100%"
          height="100%"
          mask="url(#circleMask)"
        /> */}
      </svg>

      <div className="text-container">
        <Logoshaun />
        <h1>Shaunografia</h1>
        <p>
          The Shaunografia website is a minimalist, mobile-friendly platform,
          created for a freelance photographer to uniquely showcase their work
          and service offerings beyond traditional social media.
        </p>
        <p>
          Emphasizing visual content over text, the site uses the GreenSock
          Animation Platform (GSAP) to craft distinctive animations, delivering
          a captivating user experience while highlighting the photographer's
          work. Iterative design processes led to a refined final product that
          seamlessly caters to both desktop and mobile users, receiving
          enthusiastic client approval for its balance of aesthetics,
          functionality, and creative spirit.
        </p>
        <h3>React | Github | GSAP </h3>
        <div className="link-group">
          <a
            href="https://github.com/CharcoalBadger/Shaunografia"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="github-logo"
              src="github-color.svg"
              alt="github logo"
            />
          </a>
          <a
            href="https://shaunografia.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="external-logo"
              src="external-color.svg"
              alt="external link logo"
            />
          </a>
        </div>
      </div>
      <div ref={containerRef} className="shaunografia-container" />
    </div>
  );
}
