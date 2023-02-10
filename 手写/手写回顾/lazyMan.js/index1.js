/**
 实现一个LazyMan，可以按照以下方式调用:
  LazyMan("Hank")输出:
  Hi! This is Hank!

  LazyMan("Hank").sleep(10).eat("dinner")输出
  Hi! This is Hank!
  //等待10秒..
  Wake up after 10
  Eat dinner~

  LazyMan("Hank").eat("dinner").eat("supper")输出
  Hi This is Hank!
  Eat dinner~
  Eat supper~

  LazyMan("Hank").eat("supper").sleepFirst(5)输出
  //等待5秒
  Wake up after 5
  Hi This is Hank!
  Eat supper
 */

/**
 * 思路:
 * 1 通过一个队列去维护，对sleep/eat/sleepFirst方法都会放到队列里面
 * 2 在实例化 LazyMan 时异步执行队列
 */
class LazyMan {
  constructor(name) {
    const next = () => {
      return new Promise((resolve) => {
        console.log(`Hi This is ${name}!`);
        resolve();
      });
    };
    this.queue = [next];
    setTimeout(() => {
      this.run();
    });
  }

  sleep(timer) {
    const next = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`Wake up after ${timer}`);
          resolve();
        }, timer * 1000);
      });
    };
    this.queue.push(next);
    return this;
  }

  sleepFirst(timer) {
    const next = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(`Wake up after ${timer}`);
          resolve();
        }, timer);
      });
    };
    this.queue.unshift(next);
    return this;
  }

  eat(name) {
    const next = () => {
      return new Promise((resolve) => {
        console.log(`Eat ${name}~`);
        resolve();
      });
    };
    this.queue.push(next);
    return this;
  }

  run() {
    if (!this.queue.length) return;
    const fn = this.queue.shift();

    fn().then(() => {
      this.run();
    });
  }
}

new LazyMan("Hank");
// new LazyMan("Hank").sleep(10).eat("dinner");
// new LazyMan("Hank").eat("dinner").eat("supper");
// new LazyMan("Hank").eat("supper").sleepFirst(5);
