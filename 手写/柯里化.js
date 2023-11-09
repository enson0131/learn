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



const currying = (fn, ...args) => {
  const len = fn.length;
  return (...params) => {
    args = [...args, ...params];
    if (args.length === len) {
      return fn(...args);
    } else {
      return currying(fn, ...args);
    }
  }
}


const add = (a, b, c) => {
  console.log(a + b + c);
}

const curryAdd = currying(add);

curryAdd(1)(2)(3);

