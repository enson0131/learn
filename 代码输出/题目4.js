// .then的链式调用就相当于再执行了一次Promise.resolve()，记做一次微任务
Promise.resolve()
  .then(() => {
    console.log(1)
  })
  .then(() => {
    console.log(2)
  })
Promise.resolve()
  .then(() => {
    console.log(3)
  })
  .then(() => {
    console.log(4)
  })
// 1 3 2 4
