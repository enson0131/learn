const https = require("https");

// 创建一个发起 HTTP 请求的函数
function makeRequest(url, requestNumber) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    const options = {
      hostname: "www.baidu.com",
      port: 443,
      path: "/",
      method: "GET",
      headers: {
        "User-Agent": "Node.js HTTP Client",
      },
    };

    const req = https.request(options, (res) => {
      let data = "";

      console.log(`第 ${requestNumber} 次请求开始`);
      console.log(`状态码: ${res.statusCode}`);
      console.log(`响应头:`, res.headers);

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const endTime = Date.now();
        const duration = endTime - startTime;

        console.log(`第 ${requestNumber} 次请求完成`);
        console.log(`请求耗时: ${duration}ms`);
        console.log(`响应数据长度: ${data.length} 字节`);
        console.log(`响应数据前 200 字符: ${data.substring(0, 200)}...`);
        console.log("-----------------------------------");

        resolve({
          requestNumber,
          statusCode: res.statusCode,
          headers: res.headers,
          dataLength: data.length,
          duration,
          data: data.substring(0, 200),
        });
      });
    });

    req.on("error", (err) => {
      console.error(`第 ${requestNumber} 次请求出错:`, err.message);
      reject(err);
    });

    req.end();
  });
}

// 主函数 - 发起两次请求
async function main() {
  console.log("开始向 baidu.com 发起 2 次 HTTP 请求...\n");

  try {
    // 方法1：顺序执行两次请求
    console.log("=== 顺序执行两次请求 ===");
    const result1 = await makeRequest("https://www.baidu.com", 1);
    const result2 = await makeRequest("https://www.baidu.com", 2);

    console.log("\n=== 请求汇总 ===");
    console.log(
      `第1次请求状态码: ${result1.statusCode}, 耗时: ${result1.duration}ms`
    );
    console.log(
      `第2次请求状态码: ${result2.statusCode}, 耗时: ${result2.duration}ms`
    );

    // 方法2：并行执行两次请求
    console.log("\n=== 并行执行两次请求 ===");
    const parallelStart = Date.now();
    const [parallelResult1, parallelResult2] = await Promise.all([
      makeRequest("https://www.baidu.com", 1),
      makeRequest("https://www.baidu.com", 2),
    ]);
    const parallelEnd = Date.now();

    console.log("\n=== 并行请求汇总 ===");
    console.log(`并行执行总耗时: ${parallelEnd - parallelStart}ms`);
    console.log(
      `第1次请求状态码: ${parallelResult1.statusCode}, 耗时: ${parallelResult1.duration}ms`
    );
    console.log(
      `第2次请求状态码: ${parallelResult2.statusCode}, 耗时: ${parallelResult2.duration}ms`
    );
  } catch (error) {
    console.error("请求失败:", error.message);
  }
}

// 运行主函数
main();
