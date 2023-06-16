import createMultiLineText from "./createmultilinetext";

export default function createIntroSection(scene, font, position) {
  const introText =
    "Hello, my name is William.\nPlease click and drag your mouse or use your finger to explore the world.\nAlternatively, you can click on the arrows.";

  createMultiLineText(scene, font, introText, position);
}
