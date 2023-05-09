import { loadImage } from "./utils";

let config;
let previewTag;

export function initUi(baseConfig) {
  config = baseConfig;
  previewTag = document.querySelector("#preview");

  const imageUploadInput = document.querySelector("#imageUploadInput");
  imageUploadInput.addEventListener("change", processImageFile);
}

function processImageFile(e) {
  const file = e.currentTarget.files[0];
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = async function () {
    const pixelImg = await loadImage(reader.result);
    config.pixelImgBase64 = reader.result;
    config.pixelImg = pixelImg;

    previewTag.src = pixelImg.src;
  };
  reader.readAsDataURL(file);
}
