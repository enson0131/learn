let i = 0
const FnA = () => {
  console.log(1)
  return new Promise((resolve) => {
    resolve(i++)
  })
}
const a = FnA()
setTimeout(() => {
  console.log(2)
  a.then((result) => {
    console.log(result)
  })
}, 0)
console.log(3)
a.then((result) => console.log(result))

// promise的大部分题目 https://juejin.cn/post/6844904077537574919
