export const config = {
  pixelImg: undefined,
  pixelImgBase64: undefined,
  sprite: {
    pixelsPerUnit: 10,
    width: 24,
    height: 24,
    padding: 4,
    outputPixelSize: 10,
  },
  exports: {
    withBackground: true, // Only if padding >= 1
    withoutBackground: false,
    withSizeGuide: false, // Only if padding >= 1
  },
};
