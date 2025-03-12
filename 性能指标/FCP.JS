// http://w3c.github.io/largest-contentful-paint/
// https://web.developers.google.cn/articles/fcp
/*
首次内容绘制 (FCP) 衡量从用户首次导航到页面到页面内容的任何部分呈现在屏幕上的时间。
对于此指标，“内容”是指文本、图片（包括背景图片）、 <svg>元素或非白色<canvas>元素。
*/

// 获取FCP指标
function getFCP() {
  return new Promise((resolve) => {
    // 使用 PerformanceObserver 监听 FCP
    const entryHandler = (list) => {
      const entries = list.getEntries();
      // 获取最后一个 FCP 条目
      const lastEntry = entries[entries.length - 1];
      observer.disconnect();
      resolve({
        name: "FCP",
        value: lastEntry ? lastEntry.startTime : 0,
        rating: getRating(lastEntry ? lastEntry.startTime : 0),
      });
    };

    // 创建性能观察器
    const observer = new PerformanceObserver(entryHandler);

    try {
      // 观察 paint 相关的性能条目
      observer.observe({
        entryTypes: ["paint"],
        buffered: true,
      });
    } catch (e) {
      console.error("FCP 指标采集失败:", e);
    }
  });
}

// 根据 FCP 时间评估性能等级
function getRating(value) {
  if (value <= 1800) {
    return "good";
  }
  if (value <= 3000) {
    return "needs-improvement";
  }
  return "poor";
}

// 使用示例
getFCP().then((metric) => {
  console.log("FCP 指标:", metric);
});
