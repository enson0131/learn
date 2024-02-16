/**
 * loader 的分类和顺序
 * pre 前置
 * normal 正常/普通
 * inline 行内
 * post 后置
 */
// let { runLoaders } = require("./loader-runner"); // 自行实现
let { runLoaders } = require("loader-runner"); // 官方实现
let path = require("path");
let fs = require("fs");

let filePath = path.resolve(__dirname, "src", "index.js"); // 入口模块

let request = `inline1-loader!inline2-loader!${filePath}`; // 行内 loader

let rules = [
  {
    test: /\.js$/,
    use: ["normal1-loader", "normal2-loader"], // 普通 loader
  },
  {
    test: /\.js$/,
    enforce: "pre",
    use: ["pre1-loader", "pre2-loader"], // 前置 loader
  },
  {
    test: /\.js$/,
    enforce: "post",
    use: ["post1-loader", "post2-loader"], // 后置 loader
  },
];
// normal 执行顺序
// post <- inline <- normal <- pre
// pitch 执行的时候会有顺序
// post -> inline -> normal -> pre

const parts = request.replace(/^-?!+/, "").split("!");
const resource = parts.pop();

// 获取 loader 的绝对路径
const resolveLoader = (loader) => path.resolve(__dirname, "loaders", loader);
const inlineLoaders = parts.slice();
const preLoaders = [];
const normalLoaders = [];
const postLoaders = [];

for (let i = 0; i < rules.length; i++) {
  const rule = rules[i];
  if (rule.test.test(resource)) {
    if (rule.enforce === "pre") {
      preLoaders.push(...rule.use);
    } else if (rule.enforce === "post") {
      postLoaders.push(...rule.use);
    } else {
      normalLoaders.push(...rule.use);
    }
  }
}

console.log(`preLoaders`, preLoaders); // 前
console.log(`normalLoaders`, normalLoaders); // 普通
console.log(`inlineLoaders`, inlineLoaders); // 行内
console.log(`postLoaders`, postLoaders); // 后置

let loaders = []; // 最终生成的 loader

if (request.startsWith("!!")) {
  // 如果行内 loader 以 !! 开头 则移除所有 loader（normal loader & pre loader & post loader）
  loaders = [...inlineLoaders];
} else if (request.startsWith("-!")) {
  // 如果以 -! 开头，则移除 pre loader、normal loader
  loaders = [...postLoaders, ...inlineLoaders];
} else if (request.startsWith("!")) {
  // 如果以 ！开头，则移除 normal loader
  loaders = [...postLoaders, ...inlineLoaders, ...preLoaders];
} else {
  loaders = [...postLoaders, ...inlineLoaders, ...normalLoaders, ...preLoaders];
}

loaders = loaders.map(resolveLoader);

console.log(`loaders`, loaders);

runLoaders(
  {
    resource, // 需要加载和解析的模块
    loaders,
    context: { name: "enson" }, // 基础上下文对象
    readResource: fs.readFile.bind(fs), // 读取文件的方法
  },
  (err, res) => {
    console.log(`err--->`, err);
    console.log(`res--->`, res);
  }
);
