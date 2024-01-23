import { useCallback, useEffect, useRef } from "react";
import styles from "./index.module.less";
import { Pointer } from "@/types";
import { ERASER_WIDTH, isVisibleElement, quadraticCurveTo } from "@/utils";
import { Button } from "antd";

interface ElementType {
  type: "pen" | "eraser";
  points: Pointer[];
}
/**
 * 实现在可视区域内渲染
 * @returns
 */
const RenderCanvasInScreen = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const elementsRes = useRef<Array<ElementType>>([]); // 目前绘画的数据
  const redoRef = useRef<Array<ElementType>>([]); // 存储撤销的数据
  const isEraser = useRef<boolean>(false); // 是否是橡皮擦
  let start = false; // 是否开始绘制
  let points: Pointer[] = [];
  const appState = useRef({
    scrollX: 0,
    scrollY: 0,
  });

  /*
   * 将鼠标事件的点转化为相对于canvas的坐标上的点
   */
  function addPoint(e: PointerEvent) {
    points.push({
      x: e.clientX - appState.current.scrollX, // 对其进行滚动的偏移
      y: e.clientY - appState.current.scrollY,
    });
  }

  const render = useCallback(
    (ctx: CanvasRenderingContext2D, points?: ElementType | undefined) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const elementList = [
        ...elementsRes.current,
        points || {},
      ] as ElementType[];

      elementList.forEach((element) => {
        if (!Object.keys(element)?.length) return;
        ctx.save();
        ctx.translate(appState.current.scrollX, appState.current.scrollY);
        // 判断是否在可视区域内
        console.log(
          `是否在可视区域内: `,
          isVisibleElement(element.points, {
            minX: -appState.current.scrollX,
            minY: -appState.current.scrollY,
            maxX: window.innerWidth - appState.current.scrollX,
            maxY: window.innerHeight - appState.current.scrollY,
          })
        );

        if (element.type === "eraser") {
          ctx.globalCompositeOperation = "destination-out";
          ctx.lineWidth = ERASER_WIDTH;
        }
        /**
         * 这里为什么是减去scrollX和scrollY呢？
         * 因为鼠标在向下滚动的时候, appState.current.scrollY 是减去了偏移量，也就是这里的 appState.current.scrollY = -偏移量
         * 因此我们需要通过减法来获取滚动后的真实坐标
         */
        if (
          isVisibleElement(element.points, {
            minX: -appState.current.scrollX,
            minY: -appState.current.scrollY,
            maxX: window.innerWidth - appState.current.scrollX,
            maxY: window.innerHeight - appState.current.scrollY,
          })
        ) {
          quadraticCurveTo(ctx, element.points);
        }
        ctx.restore();
      });
    },
    []
  );

  useEffect(() => {
    const onChange = () => {
      const canvas = canvasRef.current;
      console.log(`canvas--->`);
      if (!canvas) return;

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

  // 撤销
  const handleUndo = useCallback((event: PointerEvent) => {
    if (!ctxRef.current) return;
    if (!elementsRes.current) return;
    event.stopPropagation();
    console.log(`elementsRes.current--->1`, elementsRes.current?.slice());
    const last = elementsRes.current.pop();
    console.log(`elementsRes.current--->2`, elementsRes.current?.slice());
    if (redoRef.current?.length > 10) {
      // 重置数据，避免太大
      redoRef.current = [];
    }
    last && redoRef.current.push(last);
    render(ctxRef.current);
  }, []);

  // 取消撤销
  const handleRedo = useCallback((event: PointerEvent) => {
    if (!ctxRef.current) return;
    if (!redoRef.current) return;
    event.stopPropagation();
    const last = redoRef.current.pop();
    last && elementsRes.current.push(last);
    render(ctxRef.current);
  }, []);

  const handleEraser = useCallback((event: PointerEvent) => {
    if (!ctxRef.current) return;
    isEraser.current = true;
    event.stopPropagation();
  }, []);

  const handlePen = useCallback((event: PointerEvent) => {
    if (!ctxRef.current) return;
    isEraser.current = false;
    event.stopPropagation();
  }, []);

  const handleInsertImage = useCallback(() => {}, []);

  const onPointerDown = (e: any) => {
    start = true; // 通过监听鼠标按下事件，来判断是否开始绘制
    addPoint(e); // 将鼠标按下的点添加到points数组中
  };

  const onPointerMove = (e: any) => {
    if (!ctxRef.current) return;
    if (!start) return; // 如果没有按下，则不绘制
    addPoint(e); // 将鼠标移动的点添加到points数组中
    render(ctxRef.current, {
      type: isEraser.current ? "eraser" : "pen",
      points: points.slice(),
    });
  };

  const onPointerUp = () => {
    if (!start) return;
    start = false;
    // 将上层 canvas 绘制的内容保存到下层 canvas 中
    console.log(`points---<>`, points.slice());
    elementsRes.current.push({
      type: isEraser.current ? "eraser" : "pen",
      points: points.slice(),
    });
    points = [];
  };

  useEffect(() => {
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <>
      <div className={styles["btn-wrap"]}>
        <Button onPointerDown={handlePen}>书写</Button>
        <Button onPointerDown={handleEraser}>擦除</Button>
        <Button onPointerDown={handleUndo}>撤销</Button>
        <Button onPointerDown={handleRedo}>取消撤销</Button>
        <Button onPointerDown={handleInsertImage}>插入图片</Button>
      </div>
      <canvas
        ref={canvasRef}
        id="draw"
        className={styles["draw"]}
        onWheel={handleCanvasWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      ></canvas>
    </>
  );
};

export default RenderCanvasInScreen;
