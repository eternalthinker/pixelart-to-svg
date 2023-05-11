import { rgbToHex } from "./utils";

onmessage = async (e) => {
  try {
    await convertToSvgData(e.data);

    postMessage({
      type: "end",
    });
  } catch (err) {
    postMessage({
      type: "error",
      error: err,
    });
  }
};

async function convertToSvgData(data) {
  const { canvas, pixelImg, spriteConfig } = data;
  const { pixelsPerUnit, width, height, padding, outputPixelSize } =
    spriteConfig;

  const ctx = canvas.getContext("2d", {
    willReadFrequently: true,
    antialias: false,
  });
  ctx.drawImage(pixelImg, 0, 0);

  const spriteSheetWidth = canvas.width;
  const spriteSheetHeight = canvas.height;
  const spriteWidth = (width + padding * 2) * pixelsPerUnit;
  const spriteHeight = (height + padding * 2) * pixelsPerUnit;
  const numRows = Math.floor(spriteSheetHeight / spriteHeight);
  const numCols = Math.floor(spriteSheetWidth / spriteWidth);
  const numSprites = numRows * numCols;
  postMessage({
    type: "info",
    message: `We have ${numSprites} images in ${numRows} rows and ${numCols} columns`,
  });

  let svgCount = 1;
  for (let row = 0; row < numRows; ++row) {
    for (let col = 0; col < numCols; ++col) {
      const svgData = {
        filename: `image${svgCount}`,
        padding: padding * outputPixelSize,
        w: width * outputPixelSize,
        h: height * outputPixelSize,
        pixels: [],
      };
      let bgPixel;

      if (padding > 0) {
        bgPixel = ctx.getImageData(
          spriteWidth * col,
          spriteHeight * row,
          1,
          1
        ).data;
        const bgColor = rgbToHex(bgPixel[0], bgPixel[1], bgPixel[2]);
        svgData.background = {
          fill: bgColor,
          x: 0,
          y: 0,
          w: (width + padding * 2) * outputPixelSize,
          h: (height + padding * 2) * outputPixelSize,
        };

        svgData.guide = {
          fill: {
            opacity: 0,
          },
          stroke: {
            w: outputPixelSize,
            opacity: 0.25,
            color: "#000000",
          },
          x: (padding - 0.5) * outputPixelSize,
          y: (padding - 0.5) * outputPixelSize,
          w: (width + 1) * outputPixelSize,
          h: (height + 1) * outputPixelSize,
        };
      }

      // For each row
      for (let y = 0; y < height; ++y) {
        // For each column
        for (let x = 0; x < width; ++x) {
          const sx = spriteWidth * col + (x + padding) * pixelsPerUnit;
          const sy = spriteHeight * row + (y + padding) * pixelsPerUnit;
          const pixel = ctx.getImageData(sx, sy, 1, 1).data;
          if (isSameRgb(pixel, bgPixel)) {
            // Treat bg color pixels as transparent
            continue;
          }
          const pixelColor = rgbToHex(pixel[0], pixel[1], pixel[2]);
          svgData.pixels.push({
            fill: pixelColor,
            x: x * outputPixelSize,
            y: y * outputPixelSize,
            w: outputPixelSize,
            h: outputPixelSize,
          });
        }
      }

      postMessage({
        type: "progress",
        details: `${svgCount}/${numSprites}`,
        svgData,
      });

      svgCount += 1;
    }
  }
}

// Compare two bitmap pixel data
function isSameRgb(p1, p2) {
  return p1[0] === p2[0] && p1[1] === p2[1] && p1[2] === p2[2];
}
