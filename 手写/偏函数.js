// partial application
// 偏函数的好处在于可以固定参数，减少重复参数的传递
const warp = (fn, ...args) => {
  return (...params) => {
    fn(...args, ...params);
  };
};
