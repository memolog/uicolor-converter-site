import { useState, type FormEvent } from "react";
import colorNames from "./colorNames";
import checkColorNameFromHexString from "./checkColorNameFromHexString";
import chroma from "chroma-js";

function makePallet(hex: string, rgb: number[], swiftCodes: number[]) {
  const color = checkColorNameFromHexString(hex) || "";
  const desc = `#${hex} (${rgb.join(",")}) ${color}`;
  const bgColor = `#${hex}`; // 新しい背景色
  const output = `UIColor(red:${swiftCodes[0]}, green:${swiftCodes[1]}, blue:${swiftCodes[2]}, alpha:1.0) // ${desc}`;

  return { desc, bgColor, output };
}

function handleByHand(value: string) {
  let swiftCodes = [];
  let rgb = [];
  let hex = [];

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
    rgb = colorCode.rgb;
    colorCode.rgb.forEach(function (decimalCode) {
      if (decimalCode !== decimalCode || decimalCode > 255 || decimalCode < 0) {
        throw new Error("Invalid Color");
      }
      let swiftCode = Math.round((decimalCode / 255) * 100) / 100;
      swiftCodes.push(swiftCode);
    });
  } else {
    const len = inputValue.length;
    for (let i = 0; i < len; i += 2) {
      let hexCode = inputValue.substr(i, 2);
      let decimalCode = parseInt(hexCode, 16);
      if (decimalCode !== decimalCode || decimalCode > 255 || decimalCode < 0) {
        throw new Error("Invalid Color");
      }
      rgb.push(decimalCode);
      let swiftCode = Math.round((decimalCode / 255) * 100) / 100;
      hex.push(hexCode);
      swiftCodes.push(swiftCode);
    }
  }

  return makePallet(hex.join(""), rgb, swiftCodes);
}

function handleByChroma(value: string) {
  const inputValue = chroma.valid(value)
    ? value
    : chroma.valid(`#${value}`)
    ? `#${value}`
    : value;

  if (!chroma.valid(inputValue)) {
    return;
  }

  const hex = chroma(inputValue).hex().replace(/^#/, "");
  const rgb = chroma(inputValue).rgb();
  const swiftCodes = rgb.map((code) => Math.round((code / 255) * 100) / 100);

  return makePallet(hex, rgb, swiftCodes);
}

export default function HtmlColor() {
  const [palette, setPalette] = useState<
    {
      desc: string;
      bgColor: string;
      output: string;
    }[]
  >([]);

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }

    const value = target.value;
    if (typeof value !== "string") {
      return;
    }

    const palette = handleByChroma(value);
    if (!palette) {
      return;
    }

    const palettes = new Map<
      string,
      { desc: string; bgColor: string; output: string }
    >();
    palettes.set(palette.bgColor, palette);

    for (let i = 0; i < 10; i++) {
      const lighter = chroma(palette.bgColor)
        .brighten((i + 1) * 0.5)
        .hex();
      palettes.set(lighter, handleByChroma(lighter)!);
    }

    for (let i = 0; i < 10; i++) {
      const darker = chroma(palette.bgColor)
        .darken((i + 1) * 0.5)
        .hex();
      palettes.set(darker, handleByChroma(darker)!);
    }

    setPalette([...palettes.values()]);
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
      {palette.length > 0 && (
        <div className="output-container">
          {palette.map(({ desc, bgColor, output }) => {
            return (
              <div className="color-container" key={bgColor}>
                <span
                  className="color-sample"
                  style={{ backgroundColor: bgColor }}
                ></span>
                <span>{desc}</span>
                <div>{output}</div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
