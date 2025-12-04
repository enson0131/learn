const v8 = require("v8-natives");

function hotFunction(a, b) {
  return a + b;
}

// 预热
for (let i = 0; i < 1e5; i++) {
  hotFunction(i, i + 1);
}

// 检查状态
// console.log("优化状态:", v8.getOptimizationStatus(hotFunction));

// // 强制优化
// v8.optimizeFunctionOnNextCall(hotFunction);
// hotFunction(1, 2);

// // 再次检查
// console.log("优化后状态:", v8.getOptimizationStatus(hotFunction));

// // 去优化
// v8.deoptimizeFunction(hotFunction);
// console.log("去优化后状态:", v8.getOptimizationStatus(hotFunction));

// 获取更多信息
// console.log("\n详细优化信息:");
v8.helpers.printStatus(hotFunction);

// 执行 node --allow-natives-syntax --trace-opt --trace-deopt test1.js
