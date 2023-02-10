function flatern(arr) {
  const result = [];
  if (!Array.isArray(arr)) {
    return [arr]
  }
  arr.forEach(element => {
    if (Array.isArray(element)) {
      const cacheArr = flatern(element);
      result.push(...cacheArr);
    } else {
      result.push(element);
    }
  });
  return result;
}

console.log(flatern([1, 2, [3, 4, 5, [6, 7], [[[9]]]]]))



function flat(arr) {
  const isDeep = arr.some(item => item instanceof Array);

  if (!isDeep) {
    return arr;
  }

  const res = Array.prototype.concat.apply([], arr);
  return flat(res);
}
console.log(flat([1, 2, [3, 4, 5, [6, 7], [[[9]]]]]))