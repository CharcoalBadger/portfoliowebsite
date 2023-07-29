import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import "./App.css";
import Lenis from "@studio-freight/lenis";
import Navbar from "./cmp/navbar";
import PanoramicImage from "./cmp/panoramicimage";
import Preloader from "./cmp/preloader";

const LazyProject = lazy(() => import("./cmp/project"));
const LazyAbout = lazy(() => import("./cmp/about"));
const LazyContactform = lazy(() => import("./cmp/contactform"));
const LazyFooter = lazy(() => import("./cmp/footer"));

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

    const timer = setTimeout(() => {
      timerDone = true;
      checkAndSetLoading();
    }, 1500); // 10000 milliseconds equals to 10 seconds

    return () => clearTimeout(timer); // this will clear the timer when the component is unmounted
  }, []);

  const lenis = new Lenis();
  lenis.on("scroll", (e) => {});

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
      {/* Your other components that should load first */}
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

      {/* Lazy load the components */}
      <Suspense fallback={<div>Loading...</div>}>
        <div className="workapp" ref={workRef}>
          <LazyProject />
        </div>
        <div className="aboutapp" ref={aboutRef}>
          <LazyAbout />
        </div>
        <div className="contact" ref={contactRef}>
          <LazyContactform />
        </div>
        <LazyFooter />
      </Suspense>
    </div>
  );
}

export default App;
