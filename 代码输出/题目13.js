console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
const promise = new Promise((resolve, reject) => {
  console.log(3)
  resolve(7)
  console.log(4)
})
promise
  .then((value) => {
    console.log(5)
    console.log(value)
    return Promise.resolve(8)
  })
  .then((value) => {
    console.log(value)
  })
console.log(6)
