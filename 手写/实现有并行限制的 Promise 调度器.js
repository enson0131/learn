/**
 * 
  题目描述:JS 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个

  addTask(1000,"1");
  addTask(500,"2");
  addTask(300,"3");
  addTask(400,"4");

  执行 run() 的输出顺序是：2 3 1 4

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
    this.queue = [];
    this.limit = limit;
    this.currentRunNum = 0; // 当前运行的任务数量
  }

  task() {
    if (this.currentRunNum >= this.limit || !this.queue.length) return;
    this.currentRunNum++;
    const fn = this.queue.shift();
    fn().then(() => {
      this.currentRunNum--;
      this.task();
    });
  }

  run() {
    for (let i = 0; i < this.limit; i++) {
      this.task();
    }
  }

  addTask(time, param) {
    const task = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(param);
          resolve();
        }, time);
      });
    };

    this.queue.push(task);
  }
}

// const scheduler = new Scheduler(2);
// function addTask(time, param) {
//   scheduler.addTask(time, param)
// }

// addTask(1000,"1");
// addTask(500,"2");
// addTask(300,"3");
// addTask(400,"4");

// scheduler.start();

class Scheduler1 {
  constructor(limit) {
    this.tasks = [];
    this.limit = limit;
    this.currentRunNum = 0;
  }

  addTask(timer, param) {
    const task = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(param);
          resolve();
        }, timer);
      });
    };

    this.tasks.push(task);
  }

  run() {
    for (let i = 0; i < this.limit; i++) {
      this.runTask();
    }
  }

  runTask() {
    if (!this.tasks.length) return;
    if (this.currentRunNum >= this.limit) return;

    this.currentRunNum++;
    const task = this.tasks.shift();

    task().then(() => {
      this.currentRunNum--;
      this.runTask();
    });
  }
}

const scheduler1 = new Scheduler1(2);
function addTask(time, param) {
  scheduler1.addTask(time, param);
}

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");

scheduler1.run();
