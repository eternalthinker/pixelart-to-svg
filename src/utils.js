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
