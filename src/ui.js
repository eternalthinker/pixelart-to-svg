import { loadImage, localStorageNumber } from "./utils";
import { exportSvg } from "./convert";
import { SVG } from "@svgdotjs/svg.js";

let config;
let previewTag;
let widthInput,
  heightInput,
  nRowsInput,
  nColsInput,
  paddingInput,
  outputPixelSizeInput,
  outputPaddingInput,
  withBackgroundCheckbox,
  withoutBackgroundCheckbox,
  withSizeGuideCheckbox,
  spriteNamesText;
let exportButton, exportDescription;
let hasError = false;

let checkboxConfigs;

export function initUi(baseConfig) {
  config = baseConfig;

  previewTag = document.querySelector("#preview");
  widthInput = document.querySelector("#width");
  heightInput = document.querySelector("#height");
  nRowsInput = document.querySelector("#nRows");
  nColsInput = document.querySelector("#nCols");
  paddingInput = document.querySelector("#padding");
  outputPixelSizeInput = document.querySelector("#outputPixelSize");
  outputPaddingInput = document.querySelector("#outputPadding");
  withBackgroundCheckbox = document.querySelector("#withBackground");
  withoutBackgroundCheckbox = document.querySelector("#withoutBackground");
  withSizeGuideCheckbox = document.querySelector("#withSizeGuide");
  exportButton = document.querySelector("#exportButton");
  exportDescription = document.querySelector("#exportDescription");
  spriteNamesText = document.querySelector("#spriteNames");

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
      input: nRowsInput,
      min: 1,
      configKey: "nRows",
    },
    {
      input: nColsInput,
      min: 1,
      configKey: "nCols",
    },
    {
      input: paddingInput,
      min: 0,
      configKey: "padding",
      onValidChange: (value) => {
        outputPaddingInput.value = value;
      },
    },
    {
      input: outputPixelSizeInput,
      min: 1,
      configKey: "outputPixelSize",
    },
    {
      input: outputPaddingInput,
      min: 0,
      configKey: "outputPadding",
    },
  ].forEach((inputConfig) => {
    const storedValue = localStorageNumber(inputConfig.configKey);
    if (storedValue != null) {
      config.sprite[inputConfig.configKey] = storedValue;
    }
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

  spriteNamesText.addEventListener("change", (e) => {
    const value = spriteNamesText.value.replace(" ", "");
    if (value.length === 0) {
      return;
    }
    const spriteNames = value.split(/\r?\n/g).map((s) => s.trim());
    config.sprite.spriteNames = spriteNames;
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

function numberInputChangeEventListener({
  input,
  min,
  configKey,
  onValidChange,
}) {
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
    localStorageNumber(configKey, numberValue);
    onValidChange?.(numberValue);
  };
}

function checkboxChangeEventListener({ checkbox, configKey }) {
  return (e) => {
    const checked = checkbox.checked;
    config.exports[configKey] = checked;
  };
}

async function processImageFile(e) {
  let file = e.currentTarget.files[0];
  if (!file) {
    return;
  }
  // if (/\.svg$/i.test(file.name)) {
  //   // Make sure svg has crisp edges
  //   const svgContent = await file.text();
  //   const uploadSvgContainer = SVG().svg(svgContent);
  //   const uploadSvg = uploadSvgContainer.get(0);
  //   const crispSvg = SVG()
  //     .attr(uploadSvg.attr())
  //     .attr("shape-rendering", null)
  //     .attr("shape-rendering", "crispEdges");
  //   crispSvg.svg(uploadSvg.svg(false));
  //   file = new File([crispSvg.svg()], file.name, { type: file.type });
  // }
  const reader = new FileReader();
  reader.onload = async function () {
    const pixelImg = await loadImage(reader.result);
    config.pixelImgBase64 = reader.result;
    config.pixelImg = pixelImg;

    previewTag.src = pixelImg.src;
  };
  reader.readAsDataURL(file);
}
