var canvas, ctx, width, height, canvasDpr;

onmessage = function (e) {
  console.log(`worker e---->`, e);
  const {
    type,
    offScreenCanvas,
    width: canvasWidth,
    height: canvasHeight,
    dpr,
    points,
  } = e.data;

  switch (type) {
    case "init":
      canvas = offScreenCanvas;
      ctx = canvas.getContext("2d");
      width = canvasWidth;
      height = canvasHeight;
      canvasDpr = dpr;
      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;
      ctx.scale(dpr, dpr);
      postMessage({ type: "init" });
      break;
    case "render":
      console.log(`render - points---->`, points);
      render(ctx, points);
      break;
  }
};

/**
 * 绘制函数
 * @param {*} ctx - canvas 尺寸
 * @param {*} points - 鼠标移动的点集
 */
function render(ctx, points) {
  ctx.clearRect(0, 0, width, height); // 清空画布 - 如果没有这块的话容易出现锯齿
  ctx.strokeStyle = "red"; // 设置线条颜色
  ctx.lineWidth = 8; // 设置线条宽度
  /*
        lineJoin 是 Canvas 2D API 中的一个属性，用于设置或返回两条线相交时的样式。它有三个可能的值：
        "bevel"：在相交处创建一个斜角。
        "round"：在相交处创建一个圆角。
        "miter"：默认值，在相交处创建一个尖角。
    */
  ctx.lineJoin = "round"; // 设置线条连接处的样式

  /*
        lineCap 是 Canvas 2D API 中的一个属性，用于设置或返回线条的结束端点样式。它有三个可能的值：
        "butt"：这是默认值，线条的结束端点将是平直的边缘。
        "round"：线条的结束端点将是一个半圆。
        "square"：线条的结束端点将是一个矩形，其长度等于线条的宽度。
    */
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
}
