/**
  node 11 以下是先输出所有宏任务再执行微任务
  node 11 以上是先输出一个宏任务再执行微任务，在执行下一个宏任务（和网页一致）
 */

setTimeout(() => {
  console.log("timer1");
}, 0);

setTimeout(() => {
  console.log("timer2");
  Promise.resolve().then((res) => {
    console.log("promise1");
  });
  Promise.resolve().then((res) => {
    console.log("promise2");
  });
}, 0);

setTimeout(() => {
  console.log("timer3");
}, 0);
