import createMultiLineText from "./createmultilinetext";
import createClickableImage from "./createshaunografia";

export default function createPortfolioInfo(scene, font) {
  const introText =
    "Kia ora and welcome to my digital realm!\n\nFeel free to click and drag your mouse, or use your finger on touch-enabled devices to explore.\n\nShould you prefer a more structured approach, utilize the buttons at the bottom of your screen.\n\nDive in, click around, and enjoy the journey!";

  const aboutText =
    "About Me:\nI am a web developer with experience in front-end development.";
  const projectsText =
    "Projects:\nHere are some of the projects I have worked on.";
  const contactText = "Contact:\nYou can reach me at william@example.com.";

  const introTextMesh = createMultiLineText(scene, font, introText, {
    x: 0,
    y: 0,
    z: -1,
  });
  const aboutTextMesh = createMultiLineText(scene, font, aboutText, {
    x: 0.5,
    y: 0,
    z: 1,
  });
  const projectsTextMesh = createMultiLineText(scene, font, projectsText, {
    x: -0.5,
    y: 0,
    z: 1,
  });
  const contactTextMesh = createMultiLineText(scene, font, contactText, {
    x: 0,
    y: -0.5,
    z: 1,
  });

  const imageUrl = "/shaunimage.png"; // Replace with your image URL
  const linkUrl = "https://shaunografia.com/"; // Replace with your link URL

  const imagePosition = { x: 2, y: 0, z: -0.3 }; // Set the position of the image
  const imageSize = { width: 0.1, height: 0.1 }; // Set the size of the image

  createClickableImage(scene, imageUrl, linkUrl, imagePosition, imageSize);

  // Update the font size and position based on screen size
  function updateTextForResponsive() {
    const screenWidth = window.innerWidth;
    let fontSize, textDistance;

    if (screenWidth <= 768) {
      // Mobile
      fontSize = 0.02;
      textDistance = 2;
    } else if (screenWidth > 768 && screenWidth <= 1200) {
      // Tablet
      fontSize = 0.03;
      textDistance = 1.5;
    } else {
      // Desktop
      fontSize = 0.03;
      textDistance = 1;
    }

    introTextMesh.fontSize = fontSize;
    aboutTextMesh.fontSize = fontSize;
    projectsTextMesh.fontSize = fontSize;
    contactTextMesh.fontSize = fontSize;

    introTextMesh.position.setZ(-textDistance);
    aboutTextMesh.position.setZ(textDistance);
    projectsTextMesh.position.setZ(textDistance);
    contactTextMesh.position.setZ(textDistance);
  }

  // Call the updateTextForResponsive function on window resize
  window.addEventListener("resize", updateTextForResponsive);

  // Initial call to updateTextForResponsive
  updateTextForResponsive();
}
