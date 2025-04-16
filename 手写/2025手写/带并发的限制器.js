async function asyncPool(limit, iterable, iteratorFn) {
  const ret = []; // 所有的 Promise 函数集合
  const executing = new Set(); // 正在执行的 Promise

  for (const item of iterable) {
    // 构造 Promise
    const p = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p);
    executing.add(p);

    const clear = () => executing.delete(p);

    p.then(clear).catch(clear);

    if (executing.size >= limit) {
      await Promise.race(executing); // 等待有结果返回在继续执行
    }
  }

  return Promise.all(ret);
}

// 使用方法
const timeout = (i) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(i);
      resolve(i);
    }, i);
  });
};

asyncPool(2, [1000, 500, 300, 400], timeout).then((results) => {
  console.log(results);
});

/**
 输出
    500
    300
    1000
    400
 */
