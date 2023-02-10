const observer = new PerformanceObserver((entryList) => {
  console.log(entryList)
  const entries = entryList.getEntries();
  console.log('entries', entries);
  const lastEntry = entries[entries.length - 1];
  const lcp = lastEntry.renderTime || lastEntry.loadTime;
  console.log('LCP:', lcp)
});
observer.observe({entryTypes: ['largest-contentful-paint']});