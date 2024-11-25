import { memo, useCallback, useEffect, useRef } from "react";
import styles from "./index.module.less";
import renderScene from "@/utils/drawAxis";
import { viewportCoordsToSceneCoords } from "@/utils";

/*
 核心: 
    - 点采集的时候需要通过考虑 offsetPoint、scrollPoint 来计算出真实的相对于 canvas 坐标
    - 再绘制元素的时候通过 translate 做坐标转换
*/
const appState: any = {
  offsetLeft: 0,
  offsetTop: 0,
  scrollX: 0,
  scrollY: 0,
};

const elements: any = [];

const renderElements = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  ctx &&
    elements.forEach((ele) => {
      ctx.save();
      ctx.translate(ele.x + appState.scrollX, ele.y + appState.scrollY);
      ctx.strokeStyle = ele.strokeStyle;
      ctx.strokeRect(0, 0, ele.width, ele.height);
      ctx.restore();
    });
};
/**
 * 无限画布
 */
const Canvas = memo(() => {
  const canvasContainer = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = canvas;

    canvas.width = offsetWidth * window.devicePixelRatio;
    canvas.height = offsetHeight * window.devicePixelRatio;

    context.scale(window.devicePixelRatio, window.devicePixelRatio);

    appState.offsetLeft = offsetLeft;
    appState.offsetTop = offsetTop;

    renderScene(canvas, appState);
  }, []);

  const onPointerUpFromCanvasPointerDownHandler =
    (pointerDownState: any) => () => {
      window.removeEventListener(
        "pointermove",
        pointerDownState.eventListeners.onMove
      );
      window.removeEventListener(
        "pointerup",
        pointerDownState.eventListeners.onUp
      );
    };

  const onPointerMoveFromCanvasPointerDownHandler =
    (pointerDownState: any) => (event: PointerEvent) => {
      const pointerCoords = viewportCoordsToSceneCoords(event, appState);
      pointerDownState.lastCoords.x = pointerCoords.x;
      pointerDownState.lastCoords.y = pointerCoords.y;
      appState.draggingElement.width =
        pointerCoords.x - pointerDownState.origin.x;
      appState.draggingElement.height =
        pointerCoords.y - pointerDownState.origin.y;
      if (!canvasRef.current) return;
      renderScene(canvasRef.current, appState);
      renderElements(canvasRef.current);
    };

  const handleCanvasPointerDown = useCallback((e: React.PointerEvent) => {
    const origin = viewportCoordsToSceneCoords(e, appState);
    const pointerDownState = {
      origin,
      lastCoords: { ...origin },
      eventListeners: {
        onMove: null,
        onUp: null,
      },
    };

    const element = {
      x: pointerDownState.origin.x,
      y: pointerDownState.origin.y,
      width: 0,
      height: 0,
      strokeStyle: "#000000",
      backgroundColor: "transparent",
      fillStyle: "hachure",
      strokeWidth: 1,
    };

    appState.draggingElement = element;
    elements.push(element);

    const onPointerMove =
      onPointerMoveFromCanvasPointerDownHandler(pointerDownState);
    const onPointerUp =
      onPointerUpFromCanvasPointerDownHandler(pointerDownState);

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // @ts-ignore
    pointerDownState.eventListeners.onMove = onPointerMove;
    // @ts-ignore
    pointerDownState.eventListeners.onUp = onPointerUp;
  }, []);

  const handleCanvasWheel = useCallback((event: React.WheelEvent) => {
    const { deltaX, deltaY } = event;
    console.log(`deltaX: ${deltaX}, deltaY: ${deltaY}`); // 向右向下为正，向左向上为负
    appState.scrollX = appState.scrollX - deltaX;
    appState.scrollY = appState.scrollY - deltaY;
    renderScene(canvasRef.current!, appState);
    renderElements(canvasRef.current!);
  }, []);

  return (
    <div ref={canvasContainer}>
      <canvas
        ref={canvasRef}
        className={styles["canvas"]}
        onPointerDown={handleCanvasPointerDown}
        onWheel={handleCanvasWheel}
      >
        绘制 canvas
      </canvas>
    </div>
  );
});

export default Canvas;
