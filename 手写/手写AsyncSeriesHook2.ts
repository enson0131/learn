/**
 * 指责链的模式运用
 * 思路:
 * 本质就是通过将 通过队列存储 promise
 * 通过 for 循环将结果传递给下一个循环
 * 如有错误通过外层 promise 抛出
 * const hooks = new AsyncHooks();
 *
 * hooks.next(fn).next(fn).run(...args);
 */
class AsyncSeriesHook2 {
  tasks: any[];
  constructor() {
    this.tasks = [];
  }

  next(fn: any) {
    this.tasks.push(fn);
    return this;
  }

  run(...args: any) {
    let result: any = null;
    const finishFn = new Promise<any>(async (resolve, reject) => {
      for (let task of this.tasks) {
        result = await task(result, ...args).catch((err: any) => {
          reject(err);
        });
      }
      resolve(result);
    });

    return finishFn;
  }
}
