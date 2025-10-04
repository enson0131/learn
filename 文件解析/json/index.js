const JSON5 = require("json5");

const jsonStr = fs.readFileSync("index.json", "utf8");

const json5 = JSON5.parse(jsonStr);

console.log(json5);
