import React, { useEffect } from "react";
import "./project.css";
import Shaunografia from "./shaunografia";
import Sands from "./sands";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Project() {
  const lenis = new Lenis();
  lenis.on("scroll", (e) => {
    console.log(e);
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  useEffect(() => {
    let tlp = gsap.timeline({
      scrollTrigger: {
        trigger: ".sh-wrapper",
        start: "center bottom",
        end: "bottom top",
        scrub: true,
        toggleActions: "play none none reverse",
      },
    });

    tlp.to(".displacement", {
      attr: {
        r: 1200,
      },
      duration: 2,
    });
  }, []);
  return (
    <div className="project-container">
      <div className="project-inner">
        <div className="sh-wrapper">
          <Shaunografia />
        </div>
        <div className="sa-wrapper">
          <Sands />
        </div>
      </div>
      <svg
        viewBox="0 0 1920 960"
        fill="none"
        preserveAspectRatio="xMidYMin slice"
      >
        <defs>
          <filter id="displacementFilter">
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
          <mask id="circleMask">
            <circle
              cx="600" //x position
              cy="800" //y position
              r="0" //radius
              fill="white"
              className="displacement"
            />
          </mask>
        </defs>
        <image
          // style={{ transform: "translateX(-20%)" }}
          // href="https://images.unsplash.com/photo-1617957718587-60a442884bee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
          href="/gradient-2.png"
          width="100%"
          height="100%"
          mask="url(#circleMask)"
        />
        {/* <rect
          fill="#2DA639"
          width="100%"
          height="100%"
          mask="url(#circleMask)"
        /> */}
      </svg>
    </div>
  );
}
