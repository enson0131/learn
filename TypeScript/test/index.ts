enum IwbSVGElement {
  IWB_ELLIPSE = "svg:ellipse", // 椭圆
  IWB_CIRCLE = "svg:circle",
  IWB_RECT = "svg:rect",
  IWB_POLYGON = "svg:polygon",
  IWB_POLYLINE = "svg:polyline",
  IWB_LINE = "svg:line",
  IWB_TEXT_AREA = "svg:textarea", // 一行文字
  // IWB_TEXT_SPAN = 'svg:tspan', // 文案
  IWB_IMAGE = "svg:image", // 图片
}

console.log(Object.values(IwbSVGElement));
console.log(Object.keys(IwbSVGElement));
