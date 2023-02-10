setTimeout(function () {
  console.log('1')
}, 0)
async function async1() {
  console.log('2')
  const data = await async2()
  console.log('3')
  return data
}
async function async2() {
  return new Promise((resolve) => {
    console.log('4')
    resolve('async2的结果')
  }).then((data) => {
    console.log('5')
    return data
  })
}
async1().then((data) => {
  console.log('6')
  console.log(data)
})
new Promise(function (resolve) {
  console.log('7')
  //   resolve()
}).then(function () {
  console.log('8')
})

// 输出结果：247536 async2 的结果 1

// 作者：Big shark@LX
// 链接：https://juejin.cn/post/7004638318843412493
// 来源：稀土掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
