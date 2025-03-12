/**
 * 因为浏览器会在下一次渲染之前执行 requestAnimationFrame 的回调
 * 因此可以通过计算每秒内的rAF的执行次数来计算当前页面的FPS
 */

let lastTime = performance.now();
let frame = 0;

const loop = function () {
  let now = performance.now();
  frame++;
  if (now > 1000 + lastTime) {
    let fps = Math.round((frame * 1000) / (now - lastTime));
    // 记录一秒的帧数
    console.log(`fps-记录一秒的帧数`, fps);
    return fps;
  }
  window.requestAnimationFrame(loop);
};

loop();

// 卡顿异常监控
// let cycleFlag = true;
// const firstCollectionTimestamp =
//   window.performance && window.performance.timing && window.performance.now
//     ? window.performance.timing.navigationStart + window.performance.now()
//     : null; // 首次采集的时间

// //
// function stuck() {
//   if (!cycleFlag) return;

//   const STUCK_INTERVAL = 60 * 1000; // fps检测, 每 60s 检测一次 10s 内的 fps
//   // 如果页面连续 3 个帧没有超过 30 fps, 我们认为这个页面是卡顿的，需要上报异常
//   const frameCount = 3; // 累计帧数
//   const limitFPS = 30; // 限定的 FPS 值
//   const UserAgent = navigator.userAgent.toLowerCase();
//   let isCheckNow = false; // 是否在检查帧数

//   function checkFPS() {
//     // 如果在检查直接return
//     if (isCheckNow) return;

//     // 如果不存在performance直接return
//     if (!window.performance || !window.performance.now) return;

//     // 如果页面隐藏直接return
//     if (document.visibilityState && document.visibilityState === "hidden")
//       return;

//     if (!window.requestAnimationFrame) return;

//     // mac os 不兼容，先过滤
//     if (/mac os/.test(UserAgent)) return;

//     isCheckNow = true;

//     // 记录帧数开始的时间
//     let startTimestamp = window.performance.timing
//       ? window.performance.timing.navigationStart + performance.now()
//       : null;
//     let lastTime = window.performance.now();
//     let frame = 0; // 帧数
//     let currentCount = 0; // 执行检查的次数
//     let otherCount = 0; // 如果 fps 一直都是 0, 有可能出现死循环
//     let checkCount = 10; // 收集 10 秒内的连续 10 次的 FPS
//     let limitCount = 20; // 20次空循环阀值
//     let fpsList = []; // 帧数列表

//     const loop = function () {
//       const now = window.performance.now();
//       // 记录帧结束的时间
//       const endTimestamp = window.performance.timing
//         ? window.performance.timing.navigationStart + performance.now()
//         : null;
//       frame++;
//       // 收集一秒的 FPS
//       if (now > 1000 + lastTime) {
//         const fps = Math.round((frame * 1000) / (now - lastTime));
//         otherCount++;
//         if (fps > 0) {
//           currentCount++;
//           fpsList.push({
//             fps,
//             startTime: startTimestamp,
//             endTime: endTimestamp,
//           });
//         }
//         frame = 0;
//         lastTime = now;
//         startTimestamp = endTimestamp;
//       }

//       // 加个限制，防止死循环
//       if (otherCount > limitCount) return;

//       // 只检测 10 次
//       if (currentCount === checkCount) {
//         // 上报
//         checkNeedToExport(fpsList);
//         return;
//       }
//       window.requestAnimationFrame(loop);
//     };
//     loop();
//   }

//   /**
//    * 根据获取到的FPS判断是否页面卡顿，需要上报
//    */
//   function checkNeedToExport(list) {
//     console.log(`list------>`, list);
//     let count = 0;

//     for (let value of list) {
//       if (value.fps < limitFPS) {
//         count++;
//         if (count >= frameCount) {
//           // 如果有连续3s帧数小于30,则为卡顿 https://blog.csdn.net/qiwoo_weekly/article/details/124162196
//           const param = {
//             firstCollectionTimestamp, // 首次采集时间
//             url: document.URL,
//             data: JSON.stringify(list),
//           };
//           console.log(`有卡顿~`);
//           // 上报
//           cycleFlag = false; // 有卡顿上报后就不在检测了
//           return;
//         }
//       } else {
//         count = 0;
//       }
//     }

//     console.log(`没有卡顿~`);
//   }

//   // console.log(checkNeedToExport(list))

//   checkFPS();

//   // 这里的卡顿以每分钟收集一次，满足条件上报（页面流畅的情况下是每分钟收集一次，页面卡顿情况下会超过60s）
//   // 触发卡顿上报后不再收集
//   // setTimeout(stuck, STUCK_INTERVAL);
// }

// stuck();
