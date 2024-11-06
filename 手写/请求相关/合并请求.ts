/**
 * 案例:
      - const a = createAutoMergedRequest(fetchData);
      - const b = createAutoMergedRequest(fetchData);
      - const c = createAutoMergedRequest(fetchData);

      a();
      b();
      c();

   思路: 
     1 通过 createAutoMergedRequest 方法接受一个请求函数，返回一个闭包函数，这个闭包函数接受参数，将参数存储到队列中
     2 执行这个闭包函数，将队列里面的相同 key 的请求合并成一个请求
 */

/**
 * 创建一个自动合并请求的函数
 * 在一定窗口期内的所有请求都会被合并提交合并发送
 * @param fetch 合并后的请求函数
 * @param windowMs 窗口期
 */

interface IQueue {
  params: any;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}

function createAutoMergedRequest<S, R>(
  fetch: (params: S[]) => Promise<R>,
  windowMs = 1000
): (params: S) => Promise<R> {
  let queue: Array<IQueue> = []; // 存储请求队列
  let timer: NodeJS.Timeout | null = null; // 定时器

  const submitQueue = async () => {
    const _queue = [...queue];
    queue = []; // 清空队列
    timer = null;
    const params = _queue.map((q) => q.params);

    try {
      const list = await fetch(params);
      _queue.forEach((q1, i) => {
        q1.resolve(list[i]);
      });
    } catch (err) {
      _queue.forEach((q2) => {
        q2.reject(err);
      });
    }
  };

  return function (params) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      submitQueue();
    }, windowMs);

    return new Promise<R>((resolve, reject) => {
      queue.push({ params, resolve, reject });
    });
  };
}
