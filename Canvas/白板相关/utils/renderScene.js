import { elements } from "./index";
import { getElementAbsoluteCoords, distance } from "./util";
// let previewCanvas = null;
const elementWithCanvasCache = new WeakMap();

export const deleteElementCache = (element) => {
  elementWithCanvasCache.delete(element);
};
const generateCanvas = (ele) => {
  const prevElementWithCanvas = elementWithCanvasCache.get(ele);

  if (prevElementWithCanvas) {
    return prevElementWithCanvas;
  }
  // 离屏canvas绘制
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // const offscreenContainer = document.getElementById("offscreen");

  // if (previewCanvas) {
  //   offscreenContainer.removeChild(previewCanvas);
  // }
  // previewCanvas = canvas;
  // offscreenContainer.appendChild(previewCanvas);

  let [x1, y1, x2, y2] = getElementAbsoluteCoords({
    ...ele,
    points: ele.points.map((p) => {
      return [p[0] - ele.x, p[1] - ele.y];
    }),
  });
  let canvasOffsetX = 0;
  let canvasOffsetY = 0;
  const padding = 20;
  canvas.width = distance(x1, x2) * window.devicePixelRatio + padding * 2;
  canvas.height = distance(y1, y2) * window.devicePixelRatio + padding * 2;
  canvasOffsetX =
    ele.x > x1 ? distance(ele.x, x1) * window.devicePixelRatio : 0;

  canvasOffsetY =
    ele.y > y1 ? distance(ele.y, y1) * window.devicePixelRatio : 0;

  context.translate(canvasOffsetX, canvasOffsetY);
  context.save();
  context.translate(padding, padding);
  context.scale(window.devicePixelRatio, window.devicePixelRatio);

  context.lineWidth = 3;
  context.strokeStyle = ele.strokeStyle;
  ele.points.forEach((point, index) => {
    let [x, y] = point;
    x = x - ele.x;
    y = y - ele.y;
    if (!index) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  });

  context.stroke();

  context.restore();

  elementWithCanvasCache.set(ele, canvas);
  return canvas;
};
const renderElements = (ctx, appState) => {
  elements.forEach((ele) => {
    // 离屏canvas绘制
    // const canvas = document.createElement("canvas");
    // const context = canvas.getContext("2d");

    // const offscreenContainer = document.getElementById("offscreen");

    // if (previewCanvas) {
    //   offscreenContainer.removeChild(previewCanvas);
    // }
    // previewCanvas = canvas;
    // offscreenContainer.appendChild(previewCanvas);
    const canvas = generateCanvas(ele);
    let [x1, y1, x2, y2] = getElementAbsoluteCoords({
      ...ele,
      points: ele.points.map((p) => {
        return [p[0] - ele.x, p[1] - ele.y];
      }),
    });

    const padding = 20;

    // 真正绘制
    x1 = Math.floor(x1);
    x2 = Math.ceil(x2);
    y1 = Math.floor(y1);
    y2 = Math.ceil(y2);
    const cx = ((x1 + x2) / 2 + appState.scrollX) * window.devicePixelRatio;
    const cy = ((y1 + y2) / 2 + appState.scrollY) * window.devicePixelRatio;

    ctx.save();
    ctx.scale(1 / window.devicePixelRatio, 1 / window.devicePixelRatio);
    ctx.translate(cx, cy);

    ctx.drawImage(
      canvas,
      (-(x2 - x1) / 2) * window.devicePixelRatio - padding,
      (-(y2 - y1) / 2) * window.devicePixelRatio - padding,
      canvas.width,
      canvas.height
    );
    // ctx.beginPath();
    // ctx.lineWidth = 3;
    // ctx.strokeStyle = "blue";

    // ele.points.forEach((point, index) => {
    //   if (!index) {
    //     ctx.moveTo(...ele.points[0]);
    //   } else {
    //     ctx.lineTo(...point);
    //   }
    // });

    // ctx.stroke();

    ctx.restore();
  });
};
const renderScene = (canvas, appState) => {
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  renderElements(context, appState);
  localStorage.setItem("free-draw-elements", JSON.stringify(elements));
};

export default renderScene;
