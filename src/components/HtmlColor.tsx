import { useState, type FormEvent } from "react";
import colorNames from "./colorNames";
import checkColorNameFromHexString from "./checkColorNameFromHexString";

export default function HtmlColor() {
  const [bgColor, setBgColor] = useState("");
  const [desc, setDesc] = useState("");
  const [output, setOutput] = useState("");

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    let ret = [];
    let decimals = [];
    let hex = [];

    const target = e.currentTarget;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    const value = target.value;
    if (typeof value !== "string") {
      return;
    }

    let inputValue = value.replace(/^#/, "");
    const colorCode = colorNames[inputValue];
    if (inputValue.length !== 6 && inputValue.length !== 3 && !colorCode) {
      return;
    }

    // Make 3 digit hex to 6 digit hex
    if (inputValue.length === 3) {
      inputValue = inputValue.replace(
        /([0-9A-Fa-f])([0-9A-Fa-f])([0-9A-Fa-f])/,
        function (match, r, g, b) {
          return r + r + g + g + b + b;
        }
      );
    }

    if (colorCode) {
      hex.push(colorCode.hex);
      decimals = colorCode.rgb;
      colorCode.rgb.forEach(function (decimalCode) {
        if (
          decimalCode !== decimalCode ||
          decimalCode > 255 ||
          decimalCode < 0
        ) {
          throw new Error("Invalid Color");
        }
        let swiftCode = Math.round((decimalCode / 255) * 100) / 100;
        ret.push(swiftCode);
      });
    } else {
      const len = inputValue.length;
      for (let i = 0; i < len; i += 2) {
        let hexCode = inputValue.substr(i, 2);
        let decimalCode = parseInt(hexCode, 16);
        if (
          decimalCode !== decimalCode ||
          decimalCode > 255 ||
          decimalCode < 0
        ) {
          throw new Error("Invalid Color");
        }
        decimals.push(decimalCode);
        let swiftCode = Math.round((decimalCode / 255) * 100) / 100;
        hex.push(hexCode);
        ret.push(swiftCode);
      }
    }
    const color = checkColorNameFromHexString(hex.join("")) || "";
    const newDesc = `#${hex.join("")} (${decimals.join(",")}) ${color}`;
    const newBgColor = `#${hex.join("")}`; // 新しい背景色
    const newOutput = `UIColor(red:${ret[0]}, green:${ret[1]}, blue:${ret[2]}, alpha:1.0) // ${newDesc}`;

    setBgColor(newBgColor);
    setDesc(newDesc);
    setOutput(newOutput);
  };

  return (
    <section className="html-color-to-code">
      <label htmlFor="html-color-code">HTML Color Code/Name</label>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="FFFFFF"
          id="html-color-code"
          onInput={handleInput}
        />
      </div>
      {bgColor && (
        <div className="output-container">
          <span
            className="color-sample"
            style={{ backgroundColor: bgColor }}
          ></span>
          <span>{desc}</span>
          <div>{output}</div>
        </div>
      )}
    </section>
  );
}
