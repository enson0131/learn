import { Pointer } from "@/types";
export const ERASER_WIDTH = 15; // 橡皮擦宽度
export const getBoundsFromPoints = (points: Pointer[]) => {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const { x, y } of points) {
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }

  return [minX, minY, maxX, maxY];
};

/**
 * 判断点是否在画布内
 * @param element
 * @param canvasWidth
 * @param canvasHeight
 * @returns
 */
export const isVisibleElement = (
  element: Pointer[],
  screenCoords = {
    minX: 0,
    minY: 0,
    maxX: window.innerWidth,
    maxY: window.innerHeight,
  }
) => {
  const [x1, y1, x2, y2] = getBoundsFromPoints(element);

  return (
    x1 <= screenCoords.maxX &&
    y1 <= screenCoords.maxY &&
    x2 >= screenCoords.minX &&
    y2 >= screenCoords.minY
  );
};

/**
 * 绘制二次贝塞尔曲线
 * @param ctx
 * @param points
 */
export const quadraticCurveTo = (
  ctx: CanvasRenderingContext2D,
  points: Pointer[]
) => {
  ctx.strokeStyle = "red"; // 设置线条颜色
  ctx.lineWidth = 6; // 设置线条宽度
  ctx.lineJoin = "round"; // 设置线条连接处的样式
  ctx.lineCap = "round"; // 设置线条末端的样式

  /*
    beginPath() 是 Canvas 2D API 中的一个方法，用于开始一个新的路径。当你想创建一个新的路径时，你需要调用这个方法。
    例如，你可能会这样使用它：
        context.beginPath();
        context.moveTo(50, 50);
        context.lineTo(200, 50);
        context.stroke();
        在这个例子中，beginPath() 开始一个新的路径，moveTo(50, 50) 将路径的起点移动到 (50, 50)，lineTo(200, 50) 添加一条从当前位置到 (200, 50) 的线，
        最后 stroke() 方法绘制出路径。
        其中 context 是你的 canvas 上下文。
    */
  ctx.beginPath(); // 开始绘制

  ctx.moveTo(points[0].x, points[0].y); // 将画笔移动到起始点

  for (let i = 1; i < points.length; i++) {
    // 取终点，将上一个点作为控制点，平滑过渡
    const cx = (points[i].x + points[i - 1].x) / 2;
    const cy = (points[i].y + points[i - 1].y) / 2;
    ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, cx, cy);
  }

  ctx.stroke(); // 绘制路径
};

/**
 * 获取点击的坐标在画布的位置
 * @param point - 鼠标点击的坐标
 * @param canvasPoint - 画布的左边距和上边距
 * @returns
 */
export const viewportCoordsToSceneCoords = (
  point: { clientX: number; clientY: number },
  canvasPoint: {
    offsetLeft: number;
    offsetTop: number;
    scrollX: number;
    scrollY: number;
  }
) => {
  return {
    x: point.clientX - canvasPoint.offsetLeft - canvasPoint.scrollX, // x: 点击的坐标 - 画布的左边距，即在画布内的坐标
    y: point.clientY - canvasPoint.offsetTop - canvasPoint.scrollY, // y: 点击的坐标 - 画布的上边距，即在画布内的坐标
  };
};
