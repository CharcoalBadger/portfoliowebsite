import React, { useEffect } from "react";
import Maori3d from "./maori3d";
import "./about.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  useEffect(() => {
    ScrollTrigger.create({
      trigger: ".aboutintro-wrapper",
      start: "top top",
      end: "140%",
      pin: ".aboutintro-wrapper",
      pinSpacing: false,
    });
  }, []);

  return (
    <div className="about-container">
      <div className="aboutl-inner">
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
      <div className="aboutr-inner">
        <h3 className="aboutintro">A bit bout' me</h3>
        <p className="aboutpara">
          Kia ora! I'm William, a passionate front-end developer and a proud
          Maori from New Zealand. I draw from the vibrant elements of my culture
          - community, creativity, and innovation - and fuse them with my
          technical skills.
        </p>
        <p className="aboutpara">
          My tools of choice are HTML, CSS, JavaScript, GSAP, and React, which I
          use to create engaging, intuitive, and accessible user experiences.
        </p>
        <p className="aboutparaend">
          Beyond the code, I believe in the power of community and diversity.
          I'm always open to new ideas and approaches that can help shape better
          digital solutions.
        </p>
        <div className="aboutintro-wrapper">
          <h3 className="aboutintro3js">What im currently learning</h3>
          <div className="logos-container">
            <div className="logo-container">
              <img src="3js-color.svg" alt="logo1" className="logo" />
              <p className="logo-name">ThreeJS</p>
            </div>
            <div className="logo-container">
              <img src="bl-color.svg" alt="logo2" className="logo" />
              <p className="logo-name">Blender</p>
            </div>
          </div>
          <p className="aboutpara3js">
            Use your mouse or finger to interact with this 3D model
          </p>
          <Maori3d />
        </div>
      </div>
    </div>
  );
}
