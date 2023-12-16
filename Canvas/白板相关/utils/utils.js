import { unstable_batchedUpdates } from "react-dom";
export const throttleRAF = (fn, opts) => {
  let timerId = null;
  let lastArgs = null;
  let lastArgsTrailing = null;

  const scheduleFunc = (args) => {
    timerId = window.requestAnimationFrame(() => {
      timerId = null;
      fn(...args);
      lastArgs = null;
      if (lastArgsTrailing) {
        lastArgs = lastArgsTrailing;
        lastArgsTrailing = null;
        scheduleFunc(lastArgs);
      }
    });
  };

  const ret = (...args) => {
    if (process.env.NODE_ENV === "test") {
      fn(...args);
      return;
    }
    lastArgs = args;
    if (timerId === null) {
      scheduleFunc(lastArgs);
    } else if (opts?.trailing) {
      lastArgsTrailing = args;
    }
  };
  ret.flush = () => {
    if (timerId !== null) {
      cancelAnimationFrame(timerId);
      timerId = null;
    }
    if (lastArgs) {
      fn(...(lastArgsTrailing || lastArgs));
      lastArgs = lastArgsTrailing = null;
    }
  };
  ret.cancel = () => {
    lastArgs = lastArgsTrailing = null;
    if (timerId !== null) {
      cancelAnimationFrame(timerId);
      timerId = null;
    }
  };
  return ret;
};
export const withBatchedUpdatesThrottled = (func) => {
  return throttleRAF((event) => {
    unstable_batchedUpdates(func, event);
  });
};

export const getBoundsFromPoints = (points) => {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const [x, y] of points) {
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }

  return [minX, minY, maxX, maxY];
};

export const getElementAbsoluteCoords = (element) => {
  const [minX, minY, maxX, maxY] = getBoundsFromPoints(element.points);
  const x1 = minX + element.x;
  const y1 = minY + element.y;
  const x2 = maxX + element.x;
  const y2 = maxY + element.y;
  return [x1, y1, x2, y2, (x1 + x2) / 2, (y1 + y2) / 2];
};

export const distance = (x, y) => Math.abs(x - y);

export const getSizeFromPoints = (points) => {
  const xs = points.map((point) => point[0]);
  const ys = points.map((point) => point[1]);
  return {
    width: Math.max(...xs) - Math.min(...xs),
    height: Math.max(...ys) - Math.min(...ys),
  };
};

let testIdBase = 0;
export const randomId = () => `id${testIdBase++}`;
export const randomInteger = () => Math.floor(Math.random() * 2 ** 31);

export const generateExcalidrawElements = () => {
  const freeDrawElements =
    JSON.parse(localStorage.getItem("free-draw-elements")) || [];
  const result = freeDrawElements.map((ele) => {
    const points = ele.points.map((p) => {
      return [p[0] - ele.x, p[1] - ele.y];
    });
    const { width, height } = getSizeFromPoints(points);
    return {
      id: randomId(),
      type: "freedraw",
      x: ele.x,
      y: ele.y,
      width: width,
      height: height,
      angle: 0,
      strokeColor: ele.strokeStyle,
      backgroundColor: "transparent",
      fillStyle: "hachure",
      strokeWidth: 1,
      strokeStyle: "solid",
      roughness: 1,
      opacity: 100,
      groupIds: [],
      roundness: null,
      seed: randomInteger(),
      version: 1,
      versionNonce: 0,
      isDeleted: false,
      boundElements: null,
      updated: Date.now(),
      link: null,
      locked: false,
      points: points,
      pressures: [],
      simulatePressure: true,
      lastCommittedPoint: points[points.length - 1],
    };
  });
  return result;
};
