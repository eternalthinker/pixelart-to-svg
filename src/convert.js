import { SVG } from "@svgdotjs/svg.js";
import * as JSZip from "jszip";
import { saveAs } from "file-saver";

export async function exportSvg(config, progressEl, onFinish) {
  try {
    const pixelImg = await createImageBitmap(config.pixelImg);
    const offscreenCanvas = new OffscreenCanvas(
      pixelImg.width,
      pixelImg.height
    );

    const svgs = {};

    const worker = new Worker(new URL("./convert_worker.js", import.meta.url));

    worker.onmessage = (e) => {
      switch (e.data.type) {
        case "progress": {
          progressEl.innerText = `Processing ${e.data.details}`;
          makeSvg(e.data.svgData).then((svg) => {
            if (!svgs.hasOwnProperty(e.data.exportType)) {
              svgs[e.data.exportType] = [];
            }
            svgs[e.data.exportType].push({
              svg,
              filename: e.data.filename,
            });
          });
          break;
        }
        case "end": {
          progressEl.innerText = "";
          onFinish();
          downloadSvg(svgs);
          break;
        }
        case "info": {
          console.log("W:", e.data);
          break;
        }
        default:
          throw { error: "Unknown message from worker", message: e.data };
      }
    };

    worker.postMessage(
      {
        canvas: offscreenCanvas,
        pixelImg,
        spriteConfig: config.sprite,
        exportTypes: config.exports,
      },
      [offscreenCanvas]
    );
  } catch (err) {
    console.log(err);
  }
}

async function makeSvg(data) {
  return Promise.resolve(true);
}

async function downloadSvg(svgs) {}
