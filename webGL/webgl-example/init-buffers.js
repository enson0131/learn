function initBuffers(gl) {
  const positionBuffer = initPositionBuffer(gl);
  const colorBuffer = initColorBuffer(gl);

  return {
    position: positionBuffer,
    color: colorBuffer,
  };
}

function initPositionBuffer(gl) {
  // 创建缓冲区
  const positionBuffer = gl.createBuffer();

  // 绑定缓冲区
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // 矩形顶点坐标
  const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];

  // 将顶点坐标传递给 WebGL 构建形状
  // 通过创建一个 Float32Array 从 JavaScript 数组中，然后使用它来填充当前缓冲区
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  return positionBuffer;
}

function initColorBuffer(gl) {
  const colors = [
    1.0,
    1.0,
    1.0,
    1.0, // 白
    1.0,
    0.0,
    0.0,
    1.0, // 红
    0.0,
    1.0,
    0.0,
    1.0, // 绿
    0.0,
    0.0,
    1.0,
    1.0, // 蓝
  ];

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return colorBuffer;
}

export { initBuffers };
