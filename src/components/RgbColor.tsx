import { useState, type FormEvent } from "react";
import checkColorNameFromHexString from "./checkColorNameFromHexString";
import chroma from "chroma-js";

function makePallet(hex: string, rgb: number[], swiftCodes: number[]) {
  const color = checkColorNameFromHexString(hex) || "";
  const desc = `#${hex} (${rgb.join(",")}) ${color}`;
  const bgColor = `#${hex}`; // 新しい背景色
  const output = `UIColor(red:${swiftCodes[0]}, green:${swiftCodes[1]}, blue:${swiftCodes[2]}, alpha:1.0) // ${desc}`;

  return { desc, bgColor, output };
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
    const desc = `#${hex.join("")} (${decimals.join(",")}) ${color}`;
    const bgColor = `#${hex.join("")}`;
    const output = `UIColor(red:${ret[0]}, green:${ret[1]}, blue:${ret[2]}, alpha:1.0) // ${desc}`;

    const palette = { desc, bgColor, output };
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
