var random = Math.random;
function randomColor() {
  return {
    r: random() * 255,
    g: random() * 255,
    b: random() * 255,
    a: random() * 1,
  };
}

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

function resizeCanvas(canvas, width, height) {
  if (canvas.width !== width) {
    canvas.width = width ? width : window.innerWidth;
  }
  if (canvas.height !== height) {
    canvas.height = height ? height : window.innerHeight;
  }
}

function getContext(canvas) {
  return canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
}

function createSimpleProgramFromScript(gl, vertexScriptId, fragmentScriptId) {
  let vertexShader = createShaderFromScript(
    gl,
    gl.VERTEX_SHADER,
    vertexScriptId
  );
  let fragmentShader = createShaderFromScript(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentScriptId
  );
  let program = createSimpleProgram(gl, vertexShader, fragmentShader);
  return program;
}

function loadTexture(gl, src, attribute, callback) {
  let img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = function () {
    // 激活纹理单元
    gl.activeTexture(gl.TEXTURE0);
    // 创建纹理对象
    let texture = gl.createTexture();
    // 绑定纹理对象
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // 将图片数据上传到纹理对象
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    // 设置纹理的过滤方式
    gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    // 将纹理单元绑定到着色器中的 uniform 变量
    gl.uniform1i(attribute, 0);
    callback && callback();
  };
  // 设置图片的源
  img.src = src;
}
