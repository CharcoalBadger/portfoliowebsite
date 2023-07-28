import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Lenis from "@studio-freight/lenis";
import Navbar from "./cmp/navbar";
import Project from "./cmp/project";
import About from "./cmp/about";
import PanoramicImage from "./cmp/panoramicimage";
import Contactform from "./cmp/contactform";
import Footer from "./cmp/footer";
import Preloader from "./cmp/preloader";

function App() {
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const contactRef = useRef(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timerDone = false;

    const checkAndSetLoading = () => {
      if (timerDone) {
        setLoading(false);
      }
    };

    const image = new Image();
    image.src = "/pano-final-dark-3.png";
    image.onload = () => {
      // Even though the image is loaded, we won't stop loading
      // until the timer is done.
      console.log("Image loaded");
    };

    const timer = setTimeout(() => {
      timerDone = true;
      checkAndSetLoading();
    }, 1300); // 10000 milliseconds equals to 10 seconds

    return () => clearTimeout(timer); // this will clear the timer when the component is unmounted
  }, []);

  const lenis = new Lenis();
  lenis.on("scroll", (e) => {
    console.log(e);
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  const handleNavClick = (ref) => {
    lenis.scrollTo(ref.current);
  };

  return (
    <div>
      <Navbar
        onNavClick={handleNavClick}
        aboutRef={aboutRef}
        workRef={workRef}
        contactRef={contactRef}
      />
      <div style={{ display: loading ? "block" : "none" }}>
        <Preloader />
      </div>
      <PanoramicImage
        style={{ visibility: loading ? "hidden" : "visible" }}
        setLoading={setLoading}
      />
      <div className="workapp" ref={workRef}>
        <Project />
      </div>
      <div className="aboutapp" ref={aboutRef}>
        <About />
      </div>
      <div className="contact" ref={contactRef}>
        <Contactform />
      </div>
      <Footer />
    </div>
  );
}

export default App;
