const cluster = require("cluster");
const express = require("express");

console.log(cluster.isMaster);
if (cluster.isMaster) {
  cluster.fork(); // 开一个进程
  cluster.fork();
} else {
  const app = express();

  const doWork = (duration) => {
    const startTime = Date.now();
    while (Date.now() - startTime < duration) {}
  };

  app.get("/slow", (req, res) => {
    doWork(5000);
    res.send("slow request");
  });

  app.get("/fast", (req, res) => {
    res.send("fast request");
  });

  app.listen(3000);
}
