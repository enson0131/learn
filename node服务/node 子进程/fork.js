const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

for (var i = 0; i < 3; i++) {
  var worker_process = child_process.fork(
    // fork 同一个子进程会退出
    path.join(__dirname, "./support.js"),
    [i]
  );

  worker_process.on("close", function (code) {
    console.log("子进程已退出，退出码 " + code);
  });
}
