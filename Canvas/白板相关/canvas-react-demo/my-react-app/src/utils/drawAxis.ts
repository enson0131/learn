const drawAxis = (
  ctx: CanvasRenderingContext2D,
  appState: { scrollX: number; scrollY: number }
) => {
  const { scrollX, scrollY } = appState;
  ctx.save();

  const rectH = 100; // 纵轴刻度间距
  const rectW = 100; // 横轴刻度间距
  const tickLength = 8; // 刻度长度
  const canvas = ctx.canvas; // 获取 html 中的 canvas 元素

  // https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/translate
  ctx.translate(scrollX, scrollY); //

  ctx.strokeStyle = "red"; // 设置线条颜色
  ctx.fillStyle = "red"; // 设置填充颜色

  // 绘制横轴和纵轴
  ctx.save();
  ctx.beginPath(); // beginPath() 方法在开始每条线之前调用
  ctx.setLineDash([10, 10]); // 设置虚线. 它使用一组值来指定描述模式的线和间隙的交替长度。
  ctx.moveTo(0, -scrollY); // moveTo() 方法可把一个新的子路径的起始点移动到画布中的 (x, y) 坐标
  ctx.lineTo(0, canvas.height - scrollY); // lineTo() 方法添加一个新点，然后创建从该点到画布中最后指定点的线条
  ctx.moveTo(-scrollX, 0);
  ctx.lineTo(canvas.width - scrollX, 0); // 绘制横轴
  ctx.stroke(); // stroke() 方法会实际地绘制出通过 moveTo() 和 lineTo() 方法定义的路径。默认颜色是黑色
  ctx.restore();

  // 绘制横轴/纵轴刻度
  ctx.beginPath();
  ctx.lineWidth = 2; // 设置线条宽度
  ctx.textBaseline = "middle"; //  描述绘制文本时使用的文本基线。
  ctx.font = "16px Arial"; // 设置字体样式

  // 绘制正横轴刻度
  for (let i = 0; i < canvas.width / rectW; i++) {
    ctx.moveTo(i * rectW, 0);
    ctx.lineTo(i * rectW, tickLength); // 绘制刻度长度
    ctx.fillText(i.toString(), i * rectW, tickLength + 5); // fillText() 方法在画布上绘制填色的文本
  }

  for (let i = 1; i < scrollX / rectW; i++) {
    // 绘制横轴负数刻度
    ctx.moveTo(-i * rectW, 0);
    ctx.lineTo(-i * rectW, tickLength);
    ctx.fillText(`${-i}`, -i * rectW, tickLength + 5);
  }

  // 绘制正纵轴刻度
  for (let i = 0; i < canvas.height / rectH; i++) {
    ctx.moveTo(0, i * rectH);
    ctx.lineTo(tickLength, i * rectH);
    ctx.fillText(i.toString(), tickLength + 5, i * rectH);
  }

  for (let i = 0; i < scrollY / rectH; i++) {
    // 绘制纵轴负数刻度
    ctx.moveTo(0, -i * rectH);
    ctx.lineTo(tickLength, -i * rectH);
    ctx.fillText(`${-i}`, tickLength + 5, -i * rectH);
  }

  ctx.stroke();

  ctx.restore();
};

const renderScene = (
  canvas: HTMLCanvasElement,
  appState: { scrollX: number; scrollY: number }
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawAxis(ctx, appState);
};

export default renderScene;
