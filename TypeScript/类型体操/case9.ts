// 柯里化 function(a, b, c){}() => fn(a)(b)(c): (a) => (b) => (c) => Result

type curriedFunc<Param, Result> = Param extends [infer P, ...infer Rest]
  ? (args: P) => curriedFunc<Rest, Result>
  : Result;

declare function curing<Func>(
  args: Func
): Func extends (...args: infer Rest) => infer Result
  ? curriedFunc<Rest, Result>
  : never;

const func = (a: number, b: string, c: boolean) => 1;
const curingFn = curing(func);

// 通过函数重载的形式设定函数类型
function curried(fn: Function, len: number, ...args: any[]): any;
// 手写函数柯里化
function curried(fn: Function, len: number, ...args: any[]) {
  return function (...rest: any[]) {
    const param = [...args, ...rest];
    if (param.length >= len) {
      return fn(...param);
    } else {
      return curried(fn, len, ...param);
    }
  };
}

const a = curried((...args: any[]) => console.log(...args, "柯里化输出"), 3);
console.log(`a(1)(2)(3);-->`, a(1)(2)(3));
