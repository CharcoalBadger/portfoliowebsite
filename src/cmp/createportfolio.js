import createMultiLineText from "./createmultilinetext";
import createClickableImage from "./createshaunografia";

export default function createPortfolioInfo(scene, font) {
  const introText =
    "Hello, my name is William.\nPlease click and drag your mouse or use your finger to explore the world.\nAlternatively, you can click on the arrows.";
  const aboutText =
    "About Me:\nI am a web developer with experience in front-end development.";
  const projectsText =
    "Projects:\nHere are some of the projects I have worked on.";
  const contactText = "Contact:\nYou can reach me at william@example.com.";

  createMultiLineText(scene, font, introText, { x: 0, y: 0, z: -0.4 });
  createMultiLineText(scene, font, aboutText, { x: 0.5, y: 0, z: 1 });
  createMultiLineText(scene, font, projectsText, { x: -0.5, y: 0, z: 1 });
  createMultiLineText(scene, font, contactText, { x: 0, y: -0.5, z: 1 });

  const imageUrl = "/shaunimage.png"; // Replace with your image URL
  const linkUrl = "https://shaunografia.com/"; // Replace with your link URL

  const imagePosition = { x: 0, y: 0, z: -0.3 }; // Set the position of the image
  const imageSize = { width: 0.1, height: 0.1 }; // Set the size of the image

  createClickableImage(scene, imageUrl, linkUrl, imagePosition, imageSize);
}
