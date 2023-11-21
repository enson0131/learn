const Box = (x) => ({
  map: (f) => Box(f(x)), // map 调用了 f 方法将 x 做为参数传入，然后将返回值包装成 Box 函子
  valueof: () => x,
  inspect: () => `Box(${x})`,
});
