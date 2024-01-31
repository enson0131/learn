console.log(this); // 输出 {} 默认执行文件，使用 node 执行，他会把这个文件当成一个模块，默认把 this 给修改了
console.log(this === global); // false

(function () {
  console.log(this); // 是全局变量 global，也就是 web 浏览器上的 window
  //   console.log(global);
  console.log(this === global); // true
})();

console.log(__dirname); // 当前的文件目录
console.log(__filename); // 当前的文件路径

// process
// platform darwin
console.log(process);
console.log(process.cpuUsage()); // CPU 使用情况
console.log(process.memoryUsage()); // 内存情况
