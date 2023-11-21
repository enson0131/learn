class Monad {
  constructor(value) {
    this.val = value;
  }

  map(f) {
    return Monad.of(f(this.val));
  }

  // 扁平化 Monad
  flatMap(f) {
    return this.map(f).valueof();
  }

  valueof() {
    return this.val;
  }
}

Monad.of = (x) => new Monad(x);

const monad = Monad.of(1);
const nestedMonad = Monad.of(monad);

// 输出 Monad {val: 1}，符合“不嵌套”的预期
console.log(nestedMonad.flatMap((x) => x));

/**
 * Monad 的 map 只是将 f 传入，然后将返回值包装成 Monad 函子
 * 而 flatMap 则是将 f 传入，然后将返回值解包，最终返回值并不会放入 Monad 函子中
 * 👇 Monad 的极简实现
 */

const Monad2 = (x) => ({
  map: (fn) => Monad2(fn(x)),
  flatMap: (fn) => fn(x),
  valueof: () => x,
  inspect: () => `Monad2(${x})`,
});
