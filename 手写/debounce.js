// 防抖
function debounce(cb, delay) {
  let timer;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb.apply(this, args);
      clearTimeout(timer)
    }, delay) 
  }
}

// 节流
function throttle(cb, delay) {
  let timer;
  return function(...args) {
    if (timer) return;
    timer = setTimeout(() => {
      cb.apply(this, args);
      clearTimeout(timer);
    }, delay)
  }
}