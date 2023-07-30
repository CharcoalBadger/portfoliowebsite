import React, { useState, useRef } from "react";
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
  const [submitting, setSubmitting] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
      await fetch("https://formspree.io/f/mwkdpzly", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      form.reset(); // reset the form
      setSubmitting(false); // reset the submitting state
    } catch (error) {
      console.error("Error:", error);
      setSubmitting(false); // reset the submitting state
    }
  };

  const lenis = new Lenis();
  lenis.on("scroll", (e) => {});

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

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

      <h3 className="contact-title">Let's work together</h3>
      <div className="contact-inner">
        <div className="social-container">
          <div className="contact-logo-container">
            <a href="mailto:wwdouglas@hotmail.co.uk">
              <img src="email-color.svg" alt="logo7" className="contact-logo" />
              wwdouglas@hotmail.co.uk
            </a>
          </div>
          <div className="contact-logo-container">
            <a
              href="https://github.com/CharcoalBadger"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="github-color.svg"
                alt="logo8"
                className="contact-logo"
              />
              Github
            </a>
          </div>
          <div className="contact-logo-container">
            <a
              href="https://www.linkedin.com/in/williamdouglas7/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="linkedin-color.svg"
                alt="logo9"
                className="contact-logo"
              />
              LinkedIn
            </a>
          </div>
        </div>
        <form
          name="contact"
          action="https://formspree.io/f/mwkdpzly"
          method="POST"
          onSubmit={handleFormSubmit}
        >
          <input type="hidden" name="form-name" value="contact" />
          <p>
            <input
              className="form-name"
              type="text"
              name="name"
              placeholder="Name*"
              aria-label="Name"
            />
          </p>
          <p>
            <input
              className="form-email"
              type="email"
              name="email"
              placeholder="Email*"
              aria-label="Email"
            />
          </p>
          <p>
            <textarea
              className="form-textarea"
              name="message"
              placeholder="Your Message*"
              aria-label="Your Message"
            ></textarea>
          </p>
          <p>
            <button type="submit">{submitting ? "Thank you!" : "Send"} </button>
          </p>
        </form>
      </div>
    </div>
  );
}
