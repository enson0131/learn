async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2() {
  console.log('async2 start')
  await async3()
  console.log('async2 end')
}

async function async3() {
  console.log('async3 start')
}

setTimeout(function () {
  console.log('setTimeout0')
}, 0)

console.log('start')

async1()

new Promise(function (resolve) {
  console.log('Promise1')
  resolve()
}).then(function () {
  console.log('Promise2')
})

console.log('all end')

// start
// async1 start
// async2 start
// async3 start
// Promise1
// all end
// async2 end
// Promise2
// async1 end
// setTimeout0
