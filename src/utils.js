export async function loadImage(imgPath) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = function () {
      resolve(image);
    };
    image.onerror = function () {
      reject(new Error(`Image ${imgPath} cannot be loaded`));
    };
    image.src = imgPath;
  });
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.padStart(2, "0");
}

export function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}