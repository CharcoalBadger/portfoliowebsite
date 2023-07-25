import React, { useState, useEffect, useRef } from "react";
import "./contactform.css";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TabContent = ({ children, currentTab, tabName }) => {
  if (currentTab !== tabName) return null;
  return <div>{children}</div>;
};

export default function Contactform() {
  const [currentTab, setCurrentTab] = useState("Transparency");
  const containerRef = useRef(null);

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
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center bottom",
        end: "bottom top",
        scrub: true,

        markers: true,
        toggleActions: "play none none reverse",
      },
    });

    tl.to(".displacement", {
      attr: {
        r: 1200,
      },
      duration: 2,
    });
  }, []);

  return (
    <div className="contact-container" ref={containerRef}>
      <div className="process-container">
        <h2>What to Expect</h2>
        <div className="tabs">
          <button onClick={() => setCurrentTab("Transparency")}>Step 1</button>
          <button onClick={() => setCurrentTab("Quality")}>Step 2</button>
          <button onClick={() => setCurrentTab("Trust")}>Step 3</button>
        </div>
        <TabContent currentTab={currentTab} tabName="Transparency">
          <h3>Transparency: The Roadmap to Success</h3>
          <p>
            My work begins with a detailed consultation, where I learn about
            your vision, needs, and objectives for the project. This forms the
            basis for a clear proposal and scope of work, providing a roadmap
            for our collaboration.
          </p>
        </TabContent>
        <TabContent currentTab={currentTab} tabName="Quality">
          <h3>Quality: Crafted with Excellence</h3>
          <p>
            The heart of my work lies in the meticulous design and development
            stage. Here, I employ cutting-edge technologies and methodologies to
            bring your vision to life. Throughout this process, I invite ongoing
            feedback to ensure that the end product aligns perfectly with your
            expectations.
          </p>
        </TabContent>
        <TabContent currentTab={currentTab} tabName="Trust">
          <h3>Trust: Beyond Project Completion</h3>
          <p>
            The relationship I build with you extends beyond the delivery of a
            project. After rigorous testing and deployment, I provide
            comprehensive support to ensure your project's ongoing success. This
            includes handling any necessary revisions and offering maintenance
            as required.
          </p>
        </TabContent>
      </div>

      <h3>Let's work together</h3>
      <div className="contact-inner">
        <div className="social-container">
          <div className="contact-logo-container">
            <a href="mailto:wwdouglas@hotmail.co.uk">
              <img src="email-color.svg" alt="logo7" className="contact-logo" />
              wwdouglas@hotmail.co.uk
            </a>
          </div>
          <div className="contact-logo-container">
            <a href="https://github.com/yourusername">
              <img
                src="github-color.svg"
                alt="logo8"
                className="contact-logo"
              />
              Github
            </a>
          </div>
          <div className="contact-logo-container">
            <a href="https://www.linkedin.com/in/yourusername">
              <img
                src="linkedin-color.svg"
                alt="logo9"
                className="contact-logo"
              />
              LinkedIn
            </a>
          </div>
        </div>
        <form name="contact" method="POST" data-netlify="true">
          <input type="hidden" name="form-name" value="contact" />
          <p>
            <input
              type="text"
              name="name"
              placeholder="Name*"
              aria-label="Name"
            />
          </p>
          <p>
            <input
              type="email"
              name="email"
              placeholder="Email*"
              aria-label="Email"
            />
          </p>
          <p>
            <textarea
              name="message"
              placeholder="Your Message*"
              aria-label="Your Message"
            ></textarea>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
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
