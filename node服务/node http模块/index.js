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
