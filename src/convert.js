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

    const svgs = {
      withBackground: [],
      withoutBackground: [],
      withSizeGuide: [],
    };

    const worker = new Worker(new URL("./convert_worker.js", import.meta.url));

    worker.onmessage = (e) => {
      switch (e.data.type) {
        case "progress": {
          progressEl.innerText = `Processing ${e.data.details}`;
          const convertedSvg = makeSvg(e.data.svgData, config.exports);
          for (let [exportType, svgInfo] of Object.entries(convertedSvg)) {
            svgs[exportType].push(svgInfo);
          }
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

function makeSvg(data, exports) {
  const svgInfo = {};
  const { withBackground, withoutBackground, withSizeGuide } = exports;

  const vec = SVG()
    .size(data.w, data.h)
    .viewbox(0, 0, data.w, data.h)
    .attr("shape-rendering", "crispEdges");
  const group = vec.group();
  data.pixels.forEach((pixel) => {
    group
      .rect(pixel.w, pixel.h)
      .fill({ color: pixel.fill, opacity: pixel.opacity })
      .x(pixel.x)
      .y(pixel.y);
  });
  if (withoutBackground) {
    svgInfo.withoutBackground = {
      svg: vec.svg(),
      filename: `${data.filename}_no_bg.svg`,
    };
  }

  if (data.padding > 0 && (withBackground || withSizeGuide)) {
    const bg = data.background;
    const vecBg = SVG()
      .size(bg.w, bg.h)
      .viewbox(0, 0, bg.w, bg.h)
      .attr("shape-rendering", "crispEdges");
    vecBg.rect(bg.w, bg.h).fill(bg.fill).x(bg.x).y(bg.y);
    vecBg.svg(group.svg());
    const bgGroup = vecBg.get(1);
    bgGroup.move(bgGroup.x() + data.padding, bgGroup.y() + data.padding);
    if (withBackground) {
      svgInfo.withBackground = {
        svg: vecBg.svg(),
        filename: `${data.filename}_with_bg.svg`,
      };
    }

    if (withSizeGuide) {
      const vecGuide = SVG()
        .size(bg.w, bg.h)
        .viewbox(0, 0, bg.w, bg.h)
        .attr("shape-rendering", "crispEdges");
      vecGuide.svg(vecBg.svg(false));

      const guide = data.guide;
      const guideGroup = vecGuide.group();
      guideGroup.backward();
      const mask = guideGroup.mask();
      guide.mask.forEach((maskRect) => {
        const rect = guideGroup
          .rect(maskRect.w, maskRect.h)
          .fill(maskRect.fill)
          .x(maskRect.x)
          .y(maskRect.y);
        mask.add(rect);
      });
      const maskedRect = guideGroup
        .rect(guide.masked.w, guide.masked.h)
        .fill(guide.masked.fill)
        .x(guide.masked.x)
        .y(guide.masked.y);
      maskedRect.maskWith(mask);

      svgInfo.withSizeGuide = {
        svg: vecGuide.svg(),
        filename: `${data.filename}_with_guide.svg`,
      };
    }
  }

  return svgInfo;
}

async function downloadSvg(svgs) {
  const zip = new JSZip();
  for (let [exportType, svgInfoList] of Object.entries(svgs)) {
    for (const svgInfo of svgInfoList) {
      zip.file(
        `converted_svgs/${exportType}/${svgInfo.filename}`,
        svgInfo.svg,
        {
          createFolders: true,
        }
      );
    }
  }

  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, "converted_svgs.zip");
  });
}
