export const config = {
  pixelImg: undefined,
  pixelImgBase64: undefined,
  sprite: {
    width: 24,
    height: 24,
    nRows: 1,
    nCols: 1,
    padding: 4,
    outputPixelSize: 10,
    spriteNames: [],
  },
  exports: {
    withBackground: true, // Only if padding >= 1
    withoutBackground: true,
    withSizeGuide: true, // Only if padding >= 1
  },
};
