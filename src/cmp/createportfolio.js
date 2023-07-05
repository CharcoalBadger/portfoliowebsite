import createMultiLineText from "./createmultilinetext";
import createClickableImage from "./createshaunografia";

export default function createPortfolioInfo(scene, font, camera) {
  const introText =
    "Kia ora and welcome to my digital realm!\n\nFeel free to click and drag your mouse,\n\nUse your finger on touch-enabled devices,\n\nOr use the buttons at the bottom of your screen.\n\nDive in, click around, and enjoy the journey!";
  const aboutText =
    "Kia ora! My name is William.\n\nI'm a front-end developer with a passion for creating dynamic, engaging web experiences.\n\nMy specialty lies in leveraging modern technologies like React, HTML, CSS, and GSAP to bring designs to life.\n\nAt present, I'm immersing myself in the captivating world of Three.js,\n\na powerful tool for creating 3D graphics.\n\nIn fact, this very portfolio is a testament to my ongoing exploration and learning in this area.\n\nMy ultimate goal is to become a full-stack developer.\n\nI'm driven by the desire to manage projects from start to finish,\n\noverseeing every aspect from database management to user interface design.\n\nI believe this comprehensive approach will enable me to deliver more cohesive and effective solutions.";
  const projectsText =
    "Projects:\nHere are some of the projects I have worked on.";
  const contactText = "Contact:\nYou can reach me at william@example.com.";

  const introTextMesh = createMultiLineText(scene, font, introText, {
    x: 0.01,
    y: 0,
    z: -1,
  });
  const aboutTextMesh = createMultiLineText(scene, font, aboutText, {
    x: -5,
    y: 0,
    z: 0,
  });
  const projectsTextMesh = createMultiLineText(scene, font, projectsText, {
    x: 1,
    y: 0,
    z: 0,
  });
  const contactTextMesh = createMultiLineText(scene, font, contactText, {
    x: 0.01,
    y: 0,
    z: -1,
  });

  const imageUrl = "/shaunimage.png"; // Replace with your image URL
  const linkUrl = "https://shaunografia.com/"; // Replace with your link URL

  const imagePosition = { x: 2, y: 0, z: -0.3 }; // Set the position of the image
  const imageSize = { width: 0.1, height: 0.1 }; // Set the size of the image

  createClickableImage(scene, imageUrl, linkUrl, imagePosition, imageSize);

  function updateTextOrientation() {
    aboutTextMesh.lookAt(camera.position);
    projectsTextMesh.lookAt(camera.position);
    contactTextMesh.lookAt(camera.position);
    introTextMesh.lookAt(camera.position);
  }

  // Update the font size and position based on screen size
  function updateTextForResponsive() {
    const screenWidth = window.innerWidth;
    let fontSize,
      introTextDistance,
      aboutTextDistance,
      projectsTextDistance,
      contactTextDistance;

    if (screenWidth <= 601) {
      // Mobile
      fontSize = 0.02;
      introTextDistance = -0.7; // Use negative value for introTextDistance and aboutTextDistance to move towards the camera
      aboutTextDistance = -0.3;
      projectsTextDistance = 0;
      contactTextDistance = 0.7;
    } else if (screenWidth > 601 && screenWidth <= 768) {
      // Small Tablet
      fontSize = 0.025;
      introTextDistance = -0.8; // Same for tablet and desktop
      aboutTextDistance = -0.8;
      projectsTextDistance = 1.0;
      contactTextDistance = 1.1;
    } else if (screenWidth > 768 && screenWidth <= 1200) {
      // Tablet
      fontSize = 0.03;
      introTextDistance = -0.9;
      aboutTextDistance = -0.9;
      projectsTextDistance = 0;
      contactTextDistance = 1.2;
    } else {
      // Desktop
      fontSize = 0.03;
      introTextDistance = -1.0;
      aboutTextDistance = 0;
      projectsTextDistance = 0;
      contactTextDistance = 1.0;
    }

    introTextMesh.fontSize = fontSize;
    aboutTextMesh.fontSize = fontSize;
    projectsTextMesh.fontSize = fontSize;
    contactTextMesh.fontSize = fontSize;

    introTextMesh.position.setZ(introTextDistance);
    aboutTextMesh.position.setZ(aboutTextDistance);
    projectsTextMesh.position.setZ(projectsTextDistance);
    contactTextMesh.position.setZ(contactTextDistance);

    // update text orientation as well when screen is resized
    updateTextOrientation();
  }

  // Call the updateTextForResponsive function on window resize
  window.addEventListener("resize", updateTextForResponsive);

  // Initial call to updateTextForResponsive
  updateTextForResponsive();

  // return the function for external use
  return updateTextOrientation;
}
