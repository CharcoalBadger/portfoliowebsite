import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import "./portfoliointro.css";

export default function Portfoliointro({ isDarkMode }) {
  const parallaxRef = useRef(null);
  const leafRef = useRef(null);
  const treeRef = useRef(null);
  const hill1Ref = useRef(null);
  const plantRef = useRef(null);

  useLayoutEffect(() => {
    const parallaxContainer = parallaxRef.current;
    const leaf = leafRef.current;
    const tree = treeRef.current;
    const hill1 = hill1Ref.current;
    const plant = plantRef.current;

    let initialMouseX = null;
    let initialMouseY = null;

    const mouseMoveHandler = (e) => {
      // If initialMouseX is not set yet, set it to the current mouse X position
      if (initialMouseX === null) {
        initialMouseX = e.clientX;
      }

      // If initialMouseY is not set yet, set it to the current mouse Y position
      if (initialMouseY === null) {
        initialMouseY = e.clientY;
      }

      // Calculate the difference between the current and initial mouse X positions
      const offsetX = e.clientX - initialMouseX;

      // Calculate the difference between the current and initial mouse Y positions
      const offsetY = e.clientY - initialMouseY;

      // If offsetX is positive (i.e., the mouse has moved to the right), move the leaf upwards
      // If offsetX is negative (i.e., the mouse has moved to the left), move the leaf to its original position
      // If offsetY is positive (i.e., the mouse has moved downwards), move the leaf upwards
      // If offsetY is negative (i.e., the mouse has moved upwards), move the leaf to its original position

      const movementScaleFactor = 0.03; // Adjust this value as needed

      const xMovement =
        offsetX > 0 ? -Math.abs(offsetX) * movementScaleFactor : 0;
      const yMovement =
        offsetY > 0 ? -Math.abs(offsetY) * movementScaleFactor : 0;

      // Apply the movement to the image. Now, both X and Y mouse movements will cause vertical image movement.
      gsap.to(leaf, {
        y: yMovement + xMovement,
        duration: 0.8,
      });
      gsap.to(hill1, {
        y: yMovement - xMovement,
        duration: 0.8,
      });
      gsap.to(plant, {
        y: -yMovement + -xMovement,
        duration: 0.8,
      });

      // Calculate the rotation angle for the tree
      // Here we assume a smaller scale factor as the movement should be subtle
      // Calculate the rotation angle for the tree
      const rotationScaleFactor = 0.003; // halved the value from 0.05 to 0.025
      const treeRotation =
        offsetX > 0 ? Math.abs(offsetX) * rotationScaleFactor : 0;

      // Apply the rotation to the tree
      gsap.to(tree, {
        rotation: treeRotation,
        transformOrigin: "50% 100%", // rotate around the bottom center of the tree
        duration: 0.8,
      });
    };

    parallaxContainer.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      parallaxContainer.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return (
    <div className="portfolio-container">
      <div className="parallax" ref={parallaxRef}>
        <h2 className="ptext">William Douglas</h2>
        {isDarkMode ? (
          <>
            <img src="/hill1.png" alt="hill1" className="hill1" />
            <img src="/hill2.png" alt="hill2" className="hill2" />
            <img src="/hill3.png" alt="hill3" className="hill3" />
            <img src="/hill4.png" alt="hill4" className="hill4" />
            <img src="/hill5.png" alt="hill5" className="hill5" />
            {/* <img src="/tree.png" alt="tree" className="tree" ref={treeRef} /> */}
            <img src="/leaf.png" alt="leaf" className="leaf" ref={leafRef} />
            <img
              src="/plant.png"
              alt="plant"
              className="plant wide-image"
              ref={plantRef}
            />
          </>
        ) : (
          <>
            <img src="/hill1.png" alt="hill1" className="hill1" />
            <img src="/hill2.png" alt="hill2" className="hill2" />
            <img src="/hill3.png" alt="hill3" className="hill3" />
            <img src="/hill4.png" alt="hill4" className="hill4" />
            <img src="/hill5.png" alt="hill5" className="hill5" />
            {/* <img src="/tree.png" alt="tree" className="tree" ref={treeRef} /> */}
            <img src="/leaf.png" alt="leaf" className="leaf" ref={leafRef} />
            <img
              src="/plant.png"
              alt="plant"
              className="plant wide-image"
              ref={plantRef}
            />
          </>
        )}
      </div>
      {/* <div className="intro">
        <h1>William Douglas</h1>
        <h2>Front-End Developer</h2>
        <p>
          I'm a web developer based in the vibrant landscapes of New Zealand. I
          am passionate about the digital world and have dedicated myself to
          crafting web experiences that are both immersive and engaging
        </p>
        <button className="intro-contact-button">Get in touch</button>
        <button className="intro-download-button">Download CV</button>
      </div>
      <img
        className="intro-background-image"
        src={
          isDarkMode
            ? "./willogo-black-final-border.png"
            : "./willogo-white-final-border.png"
        }
        alt="William Douglas Logo"
      /> */}
    </div>
  );
}
