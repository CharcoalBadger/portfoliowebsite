import { Text } from "troika-three-text";

export default function createMultiLineText(scene, font, text, position) {
  const textMesh = new Text();
  textMesh.text = text;
  textMesh.font = font;
  textMesh.fontSize = 0.03; // Adjust the font size as needed
  textMesh.anchorX = "center";
  textMesh.anchorY = "middle";
  textMesh.position.set(position.x, position.y, position.z);
  textMesh.frustumCulled = false; // Set frustumCulled to false

  scene.add(textMesh);
  return textMesh;
}
