// 获取首次绘制时间(FP)
function getFP() {
  return new Promise((resolve) => {
    // 使用 Performance Observer API 监听绘制性能
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      // 遍历所有性能条目
      for (const entry of entries) {
        if (entry.name === "first-paint") {
          observer.disconnect();
          resolve(entry.startTime);
          break;
        }
      }
    });

    // 开始观察绘制性能指标
    observer.observe({ entryTypes: ["paint"] });

    // 如果页面已经完成首次绘制，直接从性能时间轴获取
    const entries = performance.getEntriesByType("paint");
    for (const entry of entries) {
      if (entry.name === "first-paint") {
        observer.disconnect();
        resolve(entry.startTime);
        break;
      }
    }
  });
}

getFP();
