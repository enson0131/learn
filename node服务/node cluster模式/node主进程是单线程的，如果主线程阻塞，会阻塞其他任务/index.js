const express = require("express");

const app = express();

app.get("/slow", (req, res) => {
  let startTime = Date.now();
  while (Date.now() - startTime < 10000) {}
  res.send("slow request");
});

app.get("/fast", (req, res) => {
  res.send("fast request");
});

app.listen(3000);

const startTime = Date.now();
fetch("http://localhost:3000/slow").then((res) => {
  console.log("slow耗时：", Date.now() - startTime);
});

fetch("http://localhost:3000/fast").then((res) => {
  console.log("fast耗时：", Date.now() - startTime);
});
