export { initBuffers } from "./init-buffers.js";
export { drawScene } from "./draw-scene.js";

//  初始化着色器程序，让 WebGL 知道如何绘制我们的数据
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // 创建着色器程序

  const shaderProgram = gl.createProgram(); // 创建着色器程序
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram); // 链接

  // 如果创建失败，alert
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert(
      "Unable to initialize the shader program: " +
        gl.getProgramInfoLog(shaderProgram) // 编译失败可以通过 gl.getProgramInfoLog 获取错误信息
    );
    return null;
  }

  return shaderProgram;
}

// 创建指定类型的着色器，上传 source 源码并编译
function loadShader(gl, type, source) {
  const shader = gl.createShader(type); // 创建

  gl.shaderSource(shader, source); // 绑定

  gl.compileShader(shader); // 编译

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      "An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader)
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export { initShaderProgram };
