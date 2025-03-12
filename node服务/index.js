const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// const myServer = http.createServer(function(req, res) {
//   console.log(`req`, req)
//   const url = path.join('view', 'index.html')
//   const content = fs.readFileSync(url)
//   res.write(content)
//   res.end() //服务器响应结束
// })

app.get("/", (req, res) => {
  console.log(`req2222`, req);
  console.log(`res`, res);
  const url = path.join("view", "index.html");
  const content = fs.readFileSync(url);
  res.write(content);
  res.end(); //服务器响应结束
});

app.get("/test", (req, res) => {
  console.log(`req`, req);
  console.log(`res`, res);
  console.log(`进来了33333`);
  res.end();
});

app.post("/test2", (req, res) => {
  console.log(`req`, req);
  console.log(`res`, res);
  console.log(`进来了2`);
  res.end();
});

app.listen(3000, function () {
  console.log("开启端口为3000的服务");
});
