const retry = (fn, retryCount = 3) => {
  let count = 0; // 重试的次数
  return new Promise(async (resolve, reject) => {
    while (count <= retryCount) {
      try {
        const res = await fn(); // 这里的写法的话，fn 可以是任意报错，最终都是会在 catch 捕获
        resolve(res);
        break;
      } catch (err) {
        count++;
        if (count > retryCount) {
          reject(err);
        }
      }
    }
  });
};

const retry2 = (fn, times = 1) => {
  let promise = Promise.reject();
  for (let i = 0; i < times; i++) {
    promise = promise.catch(() => fn()); // 这种写法的话，约束了fn出错reject
  }
  promise.catch(() => {
    console.warn(`Failed retrying ${times} times`);
  });
  return promise;
};
