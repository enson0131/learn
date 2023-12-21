import { useCallback, useEffect, useRef } from "react";
import styles from "./index.module.less";
import { Pointer } from "@/types";
import { quadraticCurveTo } from "@/utils";
/**
 * 实现在可视区域内渲染
 * @returns
 */
const RenderCanvasInScreen = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const elementsRes = useRef<Array<Pointer[]>>([]);
  const appState = useRef({
    scrollX: 0,
    scrollY: 0,
  });

  const render = useCallback(
    (ctx: CanvasRenderingContext2D, points?: Pointer[] | undefined) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const pointList = [...elementsRes.current, points || []];
      ctx.save();
      ctx.translate(appState.current.scrollX, appState.current.scrollY);
      pointList.forEach((points) => {
        if (!points.length) return;
        // 判断是否在可视区域内
        quadraticCurveTo(ctx, points);
      });
      ctx.restore();
    },
    []
  );

  useEffect(() => {
    let points: Pointer[] = [];
    /*
     * 将鼠标事件的点转化为相对于canvas的坐标上的点
     */
    function addPoint(e: PointerEvent) {
      points.push({
        x: e.clientX - appState.current.scrollX, // 对其进行滚动的偏移
        y: e.clientY - appState.current.scrollY,
      });
    }

    const onChange = () => {
      const canvas = canvasRef.current;
      console.log(`canvas--->`);
      if (!canvas) return;
      let start = false; // 是否开始绘制
      const ctx = canvas.getContext("2d")!;
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // scale 前先恢复变换矩阵，不然会重复 scale
      ctx.scale(dpr, dpr); // 解决高清屏模糊问题
      ctxRef.current = ctx;

      canvas.addEventListener("pointerdown", (e) => {
        console.log(`pointerdown-->`, e);
        start = true; // 通过监听鼠标按下事件，来判断是否开始绘制
        addPoint(e); // 将鼠标按下的点添加到points数组中
      });

      canvas.addEventListener("pointermove", (e) => {
        if (!start) return; // 如果没有按下，则不绘制
        addPoint(e); // 将鼠标移动的点添加到points数组中
        render(ctx, points);
      });

      canvas.addEventListener("pointerup", () => {
        if (!start) return;
        start = false;
        // 将上层 canvas 绘制的内容保存到下层 canvas 中
        elementsRes.current.push(points);
        points = [];
      });
    };

    window.addEventListener("resize", onChange);
    window.addEventListener("change", onChange);
    // window.addEventListener("scroll", onChange);
    onChange();
    return () => {
      window.removeEventListener("resize", onChange);
      window.removeEventListener("change", onChange);
      // window.removeEventListener("scroll", onChange);
    };
  }, []);

  const handleCanvasWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    if (!ctxRef.current) return;
    const { deltaX, deltaY } = e;
    appState.current.scrollX = appState.current.scrollX - deltaX;
    appState.current.scrollY = appState.current.scrollY - deltaY;
    render(ctxRef.current);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        id="draw"
        className={styles["draw"]}
        onWheel={handleCanvasWheel}
      ></canvas>
    </>
  );
};

export default RenderCanvasInScreen;
