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
  const { canvas, pixelImg, spriteConfig, exportTypes } = data;
  const { pixelsPerUnit, width, height, padding, outputPixelSize } =
    spriteConfig;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(pixelImg, 0, 0);

  const spriteSheetWidth = canvas.width;
  const spriteSheetHeight = canvas.height;
  const spriteWidth = (width + padding * 2) * pixelsPerUnit;
  const spriteHeight = (height + padding * 2) * pixelsPerUnit;
  const numRows = Math.floor(spriteSheetHeight / spriteHeight);
  const numCols = Math.floor(spriteSheetWidth / spriteWidth);
  postMessage({
    type: "info",
    message: `We have ${
      numRows * numCols
    } images in ${numRows} rows and ${numCols} columns`,
  });
}
