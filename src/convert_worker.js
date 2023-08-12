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
  const {
    width,
    height,
    nRows,
    nCols,
    padding,
    outputPixelSize,
    outputPadding,
    spriteNames,
  } = spriteConfig;
  const outputPaddingFinal = padding === 0 ? 0 : outputPadding;

  const ctx = canvas.getContext("2d", {
    willReadFrequently: true,
    antialias: false,
  });
  ctx.drawImage(pixelImg, 0, 0);

  const spriteSheetWidth = canvas.width;
  const spriteSheetHeight = canvas.height;
  const spriteWidth = spriteSheetWidth / nCols;
  const spriteHeight = spriteSheetHeight / nRows;
  const pixelsPerUnit = spriteWidth / (width + 2 * padding);
  const numSprites = nRows * nCols;
  postMessage({
    type: "info",
    message: `We have ${numSprites} images in ${nRows} rows and ${nCols} columns, ${pixelsPerUnit} ppu`,
  });

  let svgCount = 1;
  for (let row = 0; row < nRows; ++row) {
    for (let col = 0; col < nCols; ++col) {
      let filename = `image${svgCount}`;
      if (spriteNames.length > svgCount - 1) {
        filename = spriteNames[svgCount - 1];
      }
      const svgData = {
        filename,
        padding: outputPadding * outputPixelSize,
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
          w: (width + outputPadding * 2) * outputPixelSize,
          h: (height + outputPadding * 2) * outputPixelSize,
        };

        if (outputPadding > 0) {
          svgData.guide = {
            // A black rectangle on a grey rectangle as mask.
            // A black rectangle as masked, causing only
            // the borders to show with transparency.
            //
            // Stroke is not used as it doesn't scale
            // proportionally with pixels (Eg: in Figma).
            mask: [
              {
                x: (outputPadding - 1) * outputPixelSize,
                y: (outputPadding - 1) * outputPixelSize,
                w: (width + 2) * outputPixelSize,
                h: (height + 2) * outputPixelSize,
                fill: "#3F3F3F",
              },
              {
                x: outputPadding * outputPixelSize,
                y: outputPadding * outputPixelSize,
                w: width * outputPixelSize,
                h: width * outputPixelSize,
                fill: "#000000",
              },
            ],
            masked: {
              x: (outputPadding - 1) * outputPixelSize,
              y: (outputPadding - 1) * outputPixelSize,
              w: (width + 2) * outputPixelSize,
              h: (height + 2) * outputPixelSize,
              fill: "#000000",
            },
          };
        }
      }

      // For each row
      for (let y = 0; y < height; ++y) {
        // For each column
        for (let x = 0; x < width; ++x) {
          const sx = spriteWidth * col + (x + padding) * pixelsPerUnit;
          const sy = spriteHeight * row + (y + padding) * pixelsPerUnit;
          const pixel = ctx.getImageData(sx, sy, 1, 1).data;
          const pixelOpacity = pixel[3] / 255;
          if (isSameRgb(pixel, bgPixel) || pixelOpacity === 0) {
            // Skip transparent pixels.
            // Treat bg color pixels as transparent.
            continue;
          }
          const pixelColor = rgbToHex(pixel[0], pixel[1], pixel[2]);
          svgData.pixels.push({
            fill: pixelColor,
            opacity: pixelOpacity,
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
  if (p1 == null || p2 == null) {
    return false;
  }
  return p1[0] === p2[0] && p1[1] === p2[1] && p1[2] === p2[2];
}
