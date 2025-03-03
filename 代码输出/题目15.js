const async1 = async () => {
  console.log("async1");
  setTimeout(() => {
    console.log("timer1");
  }, 2000);
  await new Promise((resolve) => {
    console.log("promise1");
  });
  console.log("async1 end");
  return "async1 success";
};
console.log("script start");
async1().then((res) => console.log(res));
console.log("script end");
// ⚠️ Note: .then和.catch必须是一个函数，如果不是函数，会创建一个函数并将上一次返回的值作为函数返回值！
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .catch(4)
  .then((res) => console.log(res)); // 输出1
setTimeout(() => {
  console.log("timer2");
}, 1000);
