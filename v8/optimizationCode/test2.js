const v8 = require("v8-natives");

// 模拟同步任务
function asyncTask(id = 1, delay = 1) {
  for (let i = 0; i < 100; i++) {}
  return 1;
}

var count = 10000;

// // 使用Promise.all等待所有任务完成
async function runTasks() {
  const tasks = [];

  for (let i = 1; i <= count; i++) {
    tasks.push({ id: i, delay: 1000 });
  }

  console.log("开始所有任务1");
  const start = new Date().getTime();
  const p = [];
  const start2 = new Date().getTime();
  for (const task of tasks) {
    p.push(asyncTask(task.id, task.delay));
  }
  const end2 = new Date().getTime();
  console.log("所有任务1 for 循环的耗时", end2 - start2);

  const results = await Promise.all(p);
  const end = new Date().getTime();
  console.log("所有任务1完成，结果：", end - start);
}

// 使用for await等待所有任务完成
async function runTasks2() {
  const tasks = [];

  for (let i = 1; i <= count; i++) {
    tasks.push({ id: i, delay: 1000 });
  }

  console.log("开始所有任务2");
  const start = new Date().getTime();
  for (const task of tasks) {
    await asyncTask(task.id, task.delay);
  }
  const end = new Date().getTime();
  console.log("所有任务2完成，结果：", end - start);
}

function runTasks3() {
  const tasks = [];

  for (let i = 1; i <= count; i++) {
    tasks.push({ id: i, delay: 1000 });
  }

  console.log("开始所有任务3");
  const start = new Date().getTime();
  // 使用 C 风格 for 循环：最快的迭代方式
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    // task();
    asyncTask(task.id, task.delay);
  }
  const end = new Date().getTime();
  console.log("所有任务3完成，结果：", end - start);
}
runTasks3(); // 同步循环     1w 数据量 2ms，10w 数据量 15ms
runTasks2(); // for of wait 1w 数据量 29ms，10w 数据量 209ms
runTasks(); // Promise.all 1w 数据量 9ms，10w 数据量 52ms
// 执行 node --allow-natives-syntax --trace-opt --trace-deopt test2.js
//node --trace-opt --trace-deopt --trace-turbo --allow-natives-syntax --print-bytecode  test2.js > v8.log 2>&1
v8.helpers.printStatus(runTasks3);
v8.helpers.printStatus(runTasks2);
v8.helpers.printStatus(runTasks);
v8.helpers.printStatus(asyncTask);

// console.log("runTasks3 优化状态:", v8.getOptimizationStatus(runTasks3));
// console.log("runTasks2优化状态:", v8.getOptimizationStatus(runTasks2));
// console.log("runTasks优化状态:", v8.getOptimizationStatus(runTasks));
// console.log("asyncTask优化状态:", v8.getOptimizationStatus(asyncTask));

/*
| 状态                                | 含义                   |
| --------------------------------- | -------------------- |
| Function, Concurrently Optimizing | 已经在用优化版，但后台线程还在进一步优化 |
| Optimized, Interpreted            | 已优化，但偶尔需要回退到解释执行     |
| Not optimized                      | 未优化                       |
| Function, No Optimization Needed   | 不需要优化                   |
| Function, Optimization In Progress | 正在优化                     |
| Function, Optimization In Progress, Concurrent | 正在优化，但后台线程还在进一步优化 |
| Function, Optimization In Progress, Concurrent, Inlining | 正在优化，但后台线程还在进一步优化，并且正在内联 |
| Function, Optimization In Progress, Concurrent, Inlining, Concurrent Inlining | 正在优化，但后台线程还在进一步优化，并且正在内联，并且后台线程还在进一步内联 |
| Function, Optimization In Progress, Concurrent, Inlining, Concurrent Inlining, Concurrent Inlining | 正在优化，但后台线程还在进一步优化，并且正在内联，并且后台线程还在进一步内联，并且后台线程还在进一步内联 |
| Function, Optimization In Progress, Concurrent, Inlining, Concurrent Inlining, Concurrent Inlining, Concurrent Inlining | 正在优化，但后台线程还在进一步优化，并且正在内联，并且后台线程还在进一步内联，并且后台线程还在进一步内联，并且后台线程还在进一步内联 |
| Function, Optimization In Progress, Concurrent, Inlining, Concurrent Inlining, Concurrent Inlining, Concurrent Inlining, Concurrent Inlining | 正在优化，但后台线程还在进一步优化，并且正在内联，并且后台线程还在进一步内联，并且后台线程还在进一步内联，并且后台线程还在进一步内联，并且后台线程还在进一步内联 |
*/
