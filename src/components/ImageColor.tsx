import { useState, type FormEvent, type SyntheticEvent } from "react";
// @ts-ignore
import ColorThief from "colorthief";

export default function ImageColor() {
  const [imageSource, setImageSource] = useState("");
  const [palette, setPalette] = useState<
    {
      desc: string;
      bgColor: string;
      output: string;
    }[]
  >([]);

  const handleInput = (e: FormEvent<HTMLInputElement>) => {
    // Show the image with image element
    const target = e.currentTarget;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }
    const file = target.files?.[0];
    if (!file) {
      return;
    }
    setImageSource(URL.createObjectURL(file));
  };

  const imageOnLoad = (ev: SyntheticEvent<HTMLImageElement>) => {
    const img = ev.currentTarget;
    if (!(img instanceof HTMLImageElement)) {
      return;
    }

    const colorThief = new ColorThief();
    const newPalette = colorThief.getPalette(img).map((image: any) => {
      let ret: number[] = [];
      let decimals: number[] = [];
      let hex: string[] = [];
      image.forEach((colorCode: any) => {
        let decimalCode = parseInt(colorCode, 10);
        if (
          decimalCode !== decimalCode ||
          decimalCode > 255 ||
          decimalCode < 0
        ) {
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
      });

      const color = hex.join("");
      const desc = `#${hex.join("")} (${decimals.join(",")})`;
      const bgColor = `#${hex.join("")}`;
      const output = `UIColor(red:${ret[0]}, green:${ret[1]}, blue:${ret[2]}, alpha:1.0) // ${desc}`;

      return { desc, bgColor, output };
    });

    setPalette(newPalette);
  };

  return (
    <section className="image-to-color">
      <label htmlFor="html-color-code">Color Codes from Image</label>
      <div className="input-group">
        <input type="file" onInput={handleInput} />
      </div>
      {imageSource && (
        <div className="image-preview">
          <img
            src={imageSource}
            onLoad={imageOnLoad}
            style={{ width: 100, objectFit: "contain" }}
          />
        </div>
      )}
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
