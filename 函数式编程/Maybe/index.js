const isEmpty = (x) => x === null || x === undefined;

const Maybe = (x) => ({
  map: (fn) => (isEmpty(x) ? Maybe(null) : Maybe(fn(x))), // map 的作用是将函数 fn 作用于 x，然后返回一个新的 Maybe 函子
  valueof: () => x,
  inspect: () => `Maybe(${x})`,
});
