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

function LazyMan(name) {
  return new _LazyMan(name);
}

class _LazyMan {
  constructor(name) {
    this.tasks = [];

    const task = () => {
      console.log(`Hi! This is ${name}!`);
      this.next();
    };

    this.tasks.push(task);

    setTimeout(() => {
      this.next();
    });
  }

  next() {
    const task = this.tasks.shift();
    task && task();
  }

  eat(food) {
    const task = () => {
      console.log(`Eat ${food}`);
      this.next();
    };

    this.tasks.push(task);
    return this;
  }
  sleep(time) {
    const task = () => {
      setTimeout(() => {
        this.next();
      }, time * 1000);
    };

    this.tasks.push(task);
    return this;
  }

  sleepFirst(time) {
    const task = () => {
      setTimeout(() => {
        this.next();
      }, time * 1000);
    };

    this.tasks.unshift(task);
    return this;
  }
}

LazyMan("Hank");
LazyMan("Hank").sleep(5).eat("dinner");
LazyMan("Hank").eat("dinner").eat("supper");
LazyMan("Hank").eat("supper").sleepFirst(5);

// 第二遍
function LazyMan(value) {
  return new Queue(value);
}
class Queue {
  constructor(value) {
    this.queue = [];

    const _task = () => {
      console.log(`Hi! This is ${value}`);
      this.next();
    };

    this.queue.push(_task);

    setTimeout(() => {
      this.next();
    });
  }

  next() {
    const fn = this.queue.shift();
    fn && fn();
  }

  sleep(delay) {
    const _task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${delay}`);
        this.next();
      }, delay);
    };

    this.queue.push(_task);
    return this;
  }

  eat(value) {
    const _task = () => {
      console.log(`Eat ${value}~`);
      this.next();
    };

    this.queue.push(_task);
    return this;
  }

  sleepFirst(delay) {
    const _task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${delay}`);
        this.next();
      }, delay);
    };

    this.queue.unshift(_task);
    return this;
  }
}
