import { loadImage } from "./utils";
import { exportSvg } from "./convert";

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
let exportButton, exportDescription;
let hasError = false;

let checkboxConfigs;

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
  exportButton = document.querySelector("#exportButton");
  exportDescription = document.querySelector("#exportDescription");

  checkboxConfigs = [
    {
      checkbox: withBackgroundCheckbox,
      configKey: "withBackground",
    },
    {
      checkbox: withoutBackgroundCheckbox,
      configKey: "withoutBackground",
    },
    {
      checkbox: withSizeGuideCheckbox,
      configKey: "withSizeGuide",
    },
  ];

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
    inputConfig.input.value = config.sprite[inputConfig.configKey];
    inputConfig.input.addEventListener(
      "input",
      numberInputChangeEventListener(inputConfig)
    );
  });

  checkboxConfigs.forEach((checkboxConfig) => {
    checkboxConfig.checkbox.checked = config.exports[checkboxConfig.configKey];
    checkboxConfig.checkbox.addEventListener(
      "click",
      checkboxChangeEventListener(checkboxConfig)
    );
  });

  exportButton.addEventListener("click", handleExport);
}

function handleExport() {
  exportDescription.innerText = "";
  exportDescription.classList.remove("text-gray-500");
  exportDescription.classList.remove("text-red-500");
  if (config.pixelImg == null) {
    exportDescription.classList.add("text-red-500");
    exportDescription.innerText = "Upload a pixel art before exporting.";
    return;
  }
  if (hasError) {
    exportDescription.classList.add("text-red-500");
    exportDescription.innerText = "There are errors in the form fields.";
    return;
  }
  const anyExportTypeSelected = checkboxConfigs.some((checkboxConfig) => {
    return config.exports[checkboxConfig.configKey];
  });
  if (!anyExportTypeSelected) {
    exportDescription.classList.add("text-red-500");
    exportDescription.innerText =
      "At least one export type should be selected.";
    return;
  }
  exportButton.disabled = true;
  exportDescription.classList.add("text-gray-500");
  exportSvg(config, exportDescription, () => (exportButton.disabled = false));
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
    config.sprite[configKey] = numberValue;
  };
}

function checkboxChangeEventListener({ checkbox, configKey }) {
  return (e) => {
    const checked = checkbox.checked;
    config.exports[configKey] = checked;
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
