const curry = (fn, ...args) => {
  const len = fn.len;
  let argsArr = [...args]
  const res = function (...param) {
    argsArr = [...argsArr, ...param];
    if (argsArr.length === len) {
      fn(...argsArr)
    } else {
      return res;
    }
  }
  return res;
}