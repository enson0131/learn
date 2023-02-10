var p1 = new Promise((resolve) => {
  console.log(1)
  resolve(2)
})
var p2 = new Promise((resolve) => {
  console.log(3)
  resolve(p1)
})
p1.then((re) => {
  console.log(re)
})
p2.then((re) => {
  console.log(re)
})
// 1 3 2 {Promise: resolved, result: 2}
