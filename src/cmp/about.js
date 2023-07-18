import React, { useEffect } from "react";
import "./about.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  useEffect(() => {
    gsap.to(".whatiuse-section", {
      scrollTrigger: {
        trigger: ".whatiuse-section",
        start: "bottom bottom",
        end: "top top",
        scrub: true,
        markers: true,
      },

      x: "-120%",
    });

    ScrollTrigger.create({
      trigger: ".whatiuse-section",
      start: "top top", // Change this according to where your first animation ends
      end: "2000%",
      pin: ".whatiuse-section",
      pinSpacing: false,
      markers: true,
    });

    gsap.to(".versioncontrol-section", {
      scrollTrigger: {
        trigger: ".versioncontrol-section",
        start: "bottom bottom",
        end: "top top",
        scrub: true,
        markers: true,
      },

      x: "-45%",
    });

    ScrollTrigger.create({
      trigger: ".versioncontrol-section",
      start: "top top", // Change this according to where your first animation ends
      end: "1400%",
      pin: ".versioncontrol-section",
      pinSpacing: false,
      markers: true,
    });

    gsap.to(".contentcreation-section", {
      scrollTrigger: {
        trigger: ".contentcreation-section",
        start: "bottom bottom",
        end: "top top",
        scrub: true,
        markers: true,
      },

      x: "30%",
    });

    ScrollTrigger.create({
      trigger: ".contentcreation-section",
      start: "top top", // Change this according to where your first animation ends
      end: "950%",
      pin: ".contentcreation-section",
      pinSpacing: false,
      markers: true,
    });

    gsap.to(".deployment-section", {
      scrollTrigger: {
        trigger: ".deployment-section",
        start: "bottom bottom",
        end: "top top",
        scrub: true,
        markers: true,
      },

      x: "120%",
    });

    ScrollTrigger.create({
      trigger: ".deployment-section",
      start: "top top", // Change this according to where your first animation ends
      end: "400%",
      pin: ".deployment-section",
      pinSpacing: false,
      markers: true,
    });
  }, []);

  return (
    <div className="about-container">
      <div className="about-inner">
        <div className="whatiuse-section">
          <h3 className="whatiuse">What I Use</h3>
          <div className="logos-container">
            <div className="logo-container">
              <img src="html-color.svg" alt="logo1" className="logo" />
              <p className="logo-name">HTML</p>
            </div>
            <div className="logo-container">
              <img src="css-color.svg" alt="logo2" className="logo" />
              <p className="logo-name">CSS</p>
            </div>
            <div className="logo-container">
              <img src="js-color.svg" alt="logo3" className="logo" />
              <p className="logo-name">JavaScript</p>
            </div>
            <div className="logo-container">
              <img src="gsap-color.svg" alt="logo4" className="logo" />
              <p className="logo-name">GSAP</p>
            </div>
            <div className="logo-container">
              <img src="react-color.svg" alt="logo4" className="logo" />
              <p className="logo-name">React</p>
            </div>
          </div>
        </div>

        <div className="versioncontrol-section">
          <h3 className="versioncontrol">Version Control</h3>
          <div className="logos-container">
            <div className="logo-container">
              <img src="github-color.svg" alt="logo1" className="logo" />
              <p className="logo-name">Github</p>
            </div>
          </div>
        </div>
        <div className="contentcreation-section">
          <h3 className="contentcreation">Content Creation</h3>
          <div className="logos-container">
            <div className="logo-container">
              <img src="ps-color.svg" alt="logo1" className="logo" />
              <p className="logo-name">Photoshop</p>
            </div>
            <div className="logo-container">
              <img src="dvr-color.svg" alt="logo2" className="logo" />
              <p className="logo-name">DaVinci Resolve</p>
            </div>
            <div className="logo-container">
              <img src="vectary-color.svg" alt="logo3" className="logo" />
              <p className="logo-name">Vectary</p>
            </div>
          </div>
        </div>
        <div className="deployment-section">
          <h3 className="deployment">Deployment</h3>
          <div className="logos-container">
            <div className="logo-container">
              <img src="netlify-color.svg" alt="logo1" className="logo" />
              <p className="logo-name">Netlify</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
