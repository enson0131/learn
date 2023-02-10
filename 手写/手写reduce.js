Array.prototype._reduce = function(callBack, init) {
  const arr = this;
  let len = arr.length;
  let i = 0;

  if (typeof init === 'undefined') {
    init = arr[0];
    i = 1;
  }

  for(let j = i; j < len; j++) {
    init = callBack(init, arr[j], j, arr);
  }

  return init;
}