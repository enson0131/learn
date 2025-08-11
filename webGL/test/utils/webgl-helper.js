function $$(str) {
  if (!str) return null;
  if (str.startsWith("#")) {
    return document.querySelector(str);
  }
  let result = document.querySelectorAll(str);
  if (result.length == 1) {
    return result[0];
  }
  return result;
}

function getCanvas(id) {
  return $$(id);
}

function createShader(gl, type, source) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  //检测是否编译正常。
  let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

/**
 *
 *
 * @param {*} gl，webgl绘图环境
 * @param {*} type，着色器类型
 * @param {*} str，着色器源码
 * @returns 返回着色器对象
 */
function createShaderFromString(gl, type, str) {
  return createShader(gl, type, str);
}
function createShaderFromScript(gl, type, scriptId) {
  let sourceScript = $$("#" + scriptId);
  if (!sourceScript) {
    return null;
  }
  return createShader(gl, type, sourceScript.innerHTML);
}

function createSimpleProgram(gl, vertexShader, fragmentShader) {
  if (!vertexShader || !fragmentShader) {
    console.warn("着色器不能为空");
    return;
  }
  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  let success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}
