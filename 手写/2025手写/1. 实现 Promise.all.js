/**
 * 实现 Promise.all
 * 1. Promise.all 所有请求都 resolve, 返回 resolve
 * 2. 如果有一个 reject, 则直接 reject
 * @param {*} pArr
 * @returns
 */
const PromiseAll = (pArr) => {
  return new Promise((reslove, reject) => {
    const resArr = [];

    for (let index in pArr) {
      const p = pArr[index];
      Promise.resolve(p)
        .then((res) => {
          resArr[index] = res; // 通过下标保证值是有序的
          if (resArr.length === pArr.length) reslove(resArr);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};
