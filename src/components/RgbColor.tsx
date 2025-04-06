import { useState, type FormEvent } from "react";
import checkColorNameFromHexString from "./checkColorNameFromHexString";

export default function HtmlColor() {
  const [bgColor, setBgColor] = useState("");
  const [desc, setDesc] = useState("");
  const [output, setOutput] = useState("");

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }
    let value = target.value;
    if (typeof value !== "string") {
      return;
    }
    const inputValue = value
      .split(
        /[,\b\r\n\s\u0000-\u0029\u003a-\u003b\u007b-\u00a0\u3000-\u301b\uff08-\uff09\uff3b\uff3d\uff5b\uff5d]/
      )
      .map((item) => item.trim())
      .filter((item) => item !== "");
    let len = inputValue.length;
    let ret = [];
    let decimals = [];
    let hex = [];
    if (len !== 3) {
      return;
    }
    for (let i = 0; i < len; i++) {
      let decimalCode = parseInt(inputValue[i], 10);
      if (decimalCode !== decimalCode || decimalCode > 255 || decimalCode < 0) {
        return;
      }
      decimals.push(decimalCode);
      let hexCode = decimalCode.toString(16);
      if (hexCode.length == 1) {
        hexCode = "0" + hexCode;
      }
      let swiftCode = Math.round((decimalCode / 255) * 100) / 100;
      hex.push(hexCode);
      ret.push(swiftCode);
    }
    const color = checkColorNameFromHexString(hex.join("")) || "";
    const newDesc = `#${hex.join("")} (${decimals.join(",")}) ${color}`;
    const newBgColor = `#${hex.join("")}`;
    const newOutput = `UIColor(red:${ret[0]}, green:${ret[1]}, blue:${ret[2]}, alpha:1.0) // ${newDesc}`;

    setBgColor(newBgColor);
    setDesc(newDesc);
    setOutput(newOutput);
  };

  return (
    <section className="rgb-to-code">
      <label htmlFor="rgb">RGB (commna or space separated)</label>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="255 255 255"
          id="rgb"
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
