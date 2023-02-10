setTimeout(function () {
  console.log('setTimeout1') //
  new Promise(function (resolve) {
    console.log('promise0') //
    resolve()
  }).then(function () {
    console.log('settimeout promise resolveed') //
  })
})
setTimeout(function () {
  console.log('setTimeout2') //
})
const P = new Promise(function (resolve) {
  console.log('promise') //
  for (var i = 0; i < 10000; i++) {
    if (i === 10) {
      console.log('for') //
    }
    if (i === 9999) {
      resolve('resolve')
    }
  }
})
  .then(function (val) {
    console.log('resolve1') //
  })
  .then(function (val) {
    console.log('resolve2') //
  })
new Promise(function (resolve) {
  console.log('promise2') //
  resolve('resolve')
}).then(function (val) {
  console.log('resolve3') //
})
console.log('console') //

// promise for promise2 console resolve1 resolve3 resolve2 setTimeout1 promise0 settimeout promise resolveed setTimeout2

// 作者：夜剑剑
// 链接：https://juejin.cn/post/7025439075473571853
// 来源：稀土掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
