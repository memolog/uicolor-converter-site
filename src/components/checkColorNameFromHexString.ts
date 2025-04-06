import colorNames from "./colorNames";

export default function checkColorNameFromHexString(hexString: string) {
  const hex = hexString.replace(/^#/, "");
  if (hex.length !== 6) {
    return null;
  }
  for (const name in colorNames) {
    let color = colorNames[name];
    if (hex == color.hex) {
      return name;
    }
  }
  return null;
}
