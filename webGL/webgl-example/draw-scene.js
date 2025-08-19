let squareRotation = 0.0;

function drawScene(gl, programInfo, buffers, deltaTime) {
  squareRotation += deltaTime; // 旋转角度

  gl.clearColor(0.0, 0.0, 0.0, 1.0); // 清除颜色
  gl.clearDepth(1.0); // 清除深度
  gl.enable(gl.DEPTH_TEST); // 启用深度测试
  gl.depthFunc(gl.LEQUAL); // 近处遮挡远处

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  //用于模拟相机中的透视失真。
  //我们的视场角是45度，宽度/高度
  //与画布显示尺寸匹配的比例
  //我们只想看到0.1单位之间的对象
  //距离相机100单位。
  const fieldOfView = (45 * Math.PI) / 180; // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // 注意：glmatrix.js 总是将第一个参数作为目标来接收结果。
  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  // 设置绘制位置为“identity”点，即场景的中心。
  const modelViewMatrix = mat4.create();

  // 现在稍微移动绘制位置，以便开始绘制正方形。
  mat4.translate(
    modelViewMatrix, // 目标矩阵
    modelViewMatrix, // 要转换的矩阵
    [-0.0, 0.0, -6.0]
  ); // 要转换的量

  mat4.rotate(
    modelViewMatrix, // 目标矩阵
    modelViewMatrix, // 要旋转的矩阵
    squareRotation, // 旋转角度
    [0, 0, 1]
  ); // 围绕 z 轴旋转

  // 告诉 WebGL 如何从位置缓冲区中提取位置
  // 到顶点位置属性。
  {
    const numComponents = 2; // 每次迭代提取2个值
    const type = gl.FLOAT; // 缓冲区中的数据是32位浮点数
    const normalize = false; // 不归一化
    const stride = 0; // 从一组值到下一组值获取多少字节
    // 0 = 使用 type 和 numComponents 以上
    const offset = 0; // 从缓冲区开始获取多少字节
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }

  // 告诉 WebGL 如何从颜色缓冲区中提取颜色
  // 到顶点颜色属性。
  setColorAttribute(gl, buffers, programInfo);

  // 告诉 WebGL 使用我们的程序进行绘制

  gl.useProgram(programInfo.program);

  // 设置着色器uniforms

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix
  );
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  );

  {
    const offset = 0;
    const vertexCount = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount); // 绘制三角形带
  }
}

// 告诉 WebGL 如何从位置缓冲区中提取位置
// 到顶点位置属性。
function setPositionAttribute(gl, buffers, programInfo) {
  const numComponents = 2; // 每次迭代提取2个值
  const type = gl.FLOAT; // 缓冲区中的数据是32位浮点数
  const normalize = false; // 不归一化
  const stride = 0; // 从一组值到下一组值获取多少字节
  // 0 = 使用 type 和 numComponents 以上
  const offset = 0; // how many bytes inside the buffer to start from
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}

// 告诉 WebGL 如何从颜色缓冲区中提取颜色
// 到顶点颜色属性。
function setColorAttribute(gl, buffers, programInfo) {
  const numComponents = 4; // 每次迭代提取4个值
  const type = gl.FLOAT;
  const normalize = false; // 不归一化
  const stride = 0; // 从一组值到下一组值获取多少字节
  const offset = 0; // 从缓冲区开始获取多少字节
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexColor,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
}

export { drawScene };
