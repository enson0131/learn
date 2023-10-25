class AsyncSeriesHook {
    task = [];

    next (fn) {
        this.task.push(fn);
        return this;
    }

    tap (...args) {
        const finish = args.pop();
        const task = (idx, result) => {
            if (idx >= this.task.length) {
                return finish(result, null);
            }

            const fn = this.task[idx];

            fn(...args).then(res => {
                task(idx + 1, res);
            }).catch(err => {
                finish(null, err);
            })
        }

        task(0, null);
    }

    run (...params) {
        return new Promise((resolve, reject) => {
            const finish = (result, err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }

            this.tap(...params, finish);
        })
    }
}

// 使用方法
// const testhook = new AsyncSeriesHook();
// // lastTaskResult表示上个任务的返回
// testhook.next(async (param1, param2, lastTaskResult) => {
//   console.log('任务1', param1, param2);
//   await Promise.resolve('hook1');
//   return 'result1';
// });
// testhook.next(async (param1, param2, lastTaskResult) => {
//   console.log('任务2', param1, param2, lastTaskResult);
//   await Promise.resolve('hook2');
//   // return Promise.reject('hook2 reject'); // 如果返回reject，则不会往下执行后面的任务
//   return 'result2';
// });
// testhook.next(async (param1, param2, lastTaskResult) => {
//   console.log('任务3', param1, param2, lastTaskResult);
//   await Promise.resolve('hook3');
//   return 'result3';
// });

// const param1 = { sum: 0 };
// const param2 = 'test';
// // param1,param2是传递给各个任务的参数
// testhook.run(param1, param2).then(
//   res => {
//     // res是最后一个任务的返回值
//     console.log('最终回调', res);
//   },
//   err => {
//     // 如果有任意一个任务失败都会中断后面所有任务的执行，并将错误通过Err跑出
//     console.log('有错误了。。。', err);
//   },
// );




