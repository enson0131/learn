// http://w3c.github.io/largest-contentful-paint/
/*
最大内容绘制(LCP) 指标。它提供视口内可见的最大图像或文本块的渲染时间，从页面首次开始加载时开始记录。确定 LCP 时会考虑以下元素：

<img>元素。
SVG 内的<image>元素。
<video>元素的海报图像。
具有background-image的元素。
文本节点组，例如<p> 。
*/

// 修改原因：load事件应该绑定在window对象上，而不是document上
// 另外，为了避免错过早期的LCP事件，应该在绑定观察者后立即断开连接
window.addEventListener("load", () => {
  // 创建性能观察者
  const observer = new PerformanceObserver((entryList) => {
    console.log(entryList);
    const entries = entryList.getEntries();
    console.log("entries", entries);
    const lastEntry = entries[entries.length - 1];
    const lcp = lastEntry.renderTime || lastEntry.loadTime;
    console.log("LCP:", lcp);

    // 断开观察者连接，因为我们只需要最后一次LCP
    observer.disconnect();
  });

  // 开始观察LCP指标
  observer.observe({ entryTypes: ["largest-contentful-paint"] });
});
