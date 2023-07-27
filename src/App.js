import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import Lenis from "@studio-freight/lenis";
import Navbar from "./cmp/navbar";
import Project from "./cmp/project";
import About from "./cmp/about";
import PanoramicImage from "./cmp/panoramicimage";
import Contactform from "./cmp/contactform";
import Footer from "./cmp/footer";
import Opener from "./cmp/opener";

function App() {
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const contactRef = useRef(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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

  if (loading) {
    return <Opener />; // If the page is loading, render the Opener component
  }

  return (
    <div>
      <Navbar
        onNavClick={handleNavClick}
        aboutRef={aboutRef}
        workRef={workRef}
        contactRef={contactRef}
      />

      <PanoramicImage />
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
