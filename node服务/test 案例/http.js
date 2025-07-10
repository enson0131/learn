const https = require("https");

const startTime = Date.now();

const doRequest = (num) => {
  https
    .request("https://www.baidu.com/", (res) => {
      res.on("data", (data) => {});
      res.on("end", () => {
        console.log(`${num}：`, Date.now() - startTime);
      });
    })
    .end();
};

doRequest(1);
doRequest(2);
doRequest(3);
doRequest(4);
doRequest(5);
doRequest(6);
doRequest(7);
doRequest(8);
doRequest(9);
doRequest(10);
doRequest(11);
doRequest(12);
doRequest(13);
