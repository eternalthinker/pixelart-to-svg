import { loadImage } from "./utils";

let config;
let previewTag;
let pixelsPerUnitInput,
  widthInput,
  heightInput,
  paddingInput,
  outputPixelSizeInput,
  withBackgroundCheckbox,
  withoutBackgroundCheckbox,
  withSizeGuideCheckbox;
let hasError = false;

export function initUi(baseConfig) {
  config = baseConfig;
  previewTag = document.querySelector("#preview");
  pixelsPerUnitInput = document.querySelector("#pixelsPerUnit");
  widthInput = document.querySelector("#width");
  heightInput = document.querySelector("#height");
  paddingInput = document.querySelector("#padding");
  outputPixelSizeInput = document.querySelector("#outputPixelSize");
  withBackgroundCheckbox = document.querySelector("#withBackground");
  withoutBackgroundCheckbox = document.querySelector("#withoutBackground");
  withSizeGuideCheckbox = document.querySelector("#withSizeGuide");

  const imageUploadInput = document.querySelector("#imageUploadInput");
  imageUploadInput.addEventListener("change", processImageFile);

  [
    {
      input: pixelsPerUnitInput,
      min: 1,
      configKey: "pixelsPerUnit",
    },
    {
      input: widthInput,
      min: 1,
      configKey: "width",
    },
    {
      input: heightInput,
      min: 1,
      configKey: "height",
    },
    {
      input: paddingInput,
      min: 0,
      configKey: "padding",
    },
    {
      input: outputPixelSizeInput,
      min: 1,
      configKey: "outputPixelSize",
    },
  ].forEach((inputConfig) => {
    inputConfig.input.value = config[inputConfig.configKey];
    inputConfig.input.addEventListener(
      "input",
      numberInputChangeEventListener(inputConfig)
    );
  });
}

function numberInputChangeEventListener({ input, min, configKey }) {
  return (e) => {
    const value = input.value;
    const numberValue = Number(value);
    if (isNaN(numberValue) || numberValue < min) {
      // Add error
      hasError = true;
      input.classList.add("border-red-500");
      return;
    }
    // Remove error
    hasError = false;
    input.classList.remove("border-red-500");
    config[configKey] = numberValue;
  };
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
