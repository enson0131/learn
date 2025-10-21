/**
 * 
  题目描述:JS 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个

  addTask(1000,"1");
  addTask(500,"2");
  addTask(300,"3");
  addTask(400,"4");
  的输出顺序是：2 3 1 4

  整个的完整执行流程：

  一开始1、2两个任务开始执行
  500ms时，2任务执行完毕，输出2，任务3开始执行
  800ms时，3任务执行完毕，输出3，任务4开始执行
  1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
  1200ms时，4任务执行完毕，输出4

  思路:
  1 创建一个队列，将所有的调用函数全部添加进来
  2 因为最多只有俩个弹窗，优先获取前俩个函数进行执行
  3 通过currentRunNum判断当前正在运行的函数数量，避免多次运行
 */

class Scheduler {
  constructor(limit) {
    this.limit = limit;
    this.tasks = [];
    this.count = 0;
  }

  addTask(time, number) {
    const next = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(number);
        }, time);
      });
    };

    this.tasks.push(next);
  }

  run() {
    for (let i = 0; i <= this.limit; i++) {
      this.request();
    }
  }

  request() {
    if (!this.tasks.length || this.count >= this.limit) return;

    this.count++;
    const fn = this.tasks.shift();
    fn().then((res) => {
      console.log(res);
      this.count--;
      this.request();
    });
  }
}

const scheduler = new Scheduler(2);

scheduler.addTask(1000, "1");
scheduler.addTask(500, "2");
scheduler.addTask(300, "3");
scheduler.addTask(400, "4");

// scheduler.run();

class LimitRequest {
  constructor(limit) {
    this.limit = limit;
    this.queue = [];
  }

  //   add = (fn) => {
  //     const task = async () => {
  //       return await fn();
  //     };
  //     this.queue.push(task);
  //   };

  addTask(time, number) {
    const next = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(number);
          resolve(number);
        }, time);
      });
    };

    this.queue.push(next);
  }

  run = () => {
    for (let i = 0; i < this.limit; i++) {
      this.startTask();
    }
  };

  startTask = () => {
    if (!!this.queue.length) {
      const fn = this.queue.shift();
      fn().then(this.startTask);
    }
  };
}

const limitRequest = new LimitRequest(2);

limitRequest.addTask(1000, "1");
limitRequest.addTask(500, "2");
limitRequest.addTask(300, "3");
limitRequest.addTask(400, "4");

// limitRequest.run();

/**
 * 异步池 用于限制并发数
 * @param poolLimit 并发数
 * @param params 参数
 * @param iteratorFn 迭代函数
 * @returns 结果
 */
async function asyncPool(poolLimit, params, iteratorFn) {
  // 用于保存所有异步请求
  const ret = [];
  // 用户保存正在进行的请求
  const executing = new Set();
  for (const param of params) {
    // 构造出请求 Promise

    const p = Promise.resolve()
      .then(async () => await iteratorFn(param))
      .then((result) => {
        return Promise.resolve({
          result,
          error: null,
          key: param,
        });
      })
      .catch((error) => {
        return Promise.reject({
          result: null,
          error,
          key: param,
        });
      })
      .finally(() => executing.delete(p));

    ret.push(p);
    executing.add(p);

    // 如果正在执行的请求数大于并发数，就使用 Promise.race 等待一个最快执行完的请求
    if (executing.size >= poolLimit) {
      await Promise.race(executing);
    }
  }

  // 返回所有结果
  return Promise.allSettled(ret);
}

const timeout = (i) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(i);
      resolve(i);
    }, i);
  });
};

asyncPool(2, [1000, 5000, 3000, 2000], timeout).then((results) => {
  console.log(results);
});
