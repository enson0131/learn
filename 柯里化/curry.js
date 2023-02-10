function curry(fn) {
  return _curry.call(this, fn, len);
}

function _curry(fn, len, ...args) {
  return function(...rest) {
      const param = [...args, ...rest];
      if (param.length >= len) {
        return fn.apply(this, param);
      }else {
        return _curry(fn, len, ...param)
      }
  }
}



function myNew(fn, ...args) {
  const obj = Object.create(fn.prototype);
  const result = fn.call(obj, ...args);

  if (typeof result === 'object' && result !== null) {
    return result
  } else {
    return obj
  }
} 
let timer;
function deDounce(fn,delay){
  if (timer) clearTimeout(timer);
  timer = new setTimeout(() => {
    fn();
  }, delay);
}


