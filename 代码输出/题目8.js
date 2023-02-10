console.log(1)
setTimeout(() => {
  console.log(2)
}, 1 * 200)
Promise.resolve()
  .then(() => {
    console.log(3)
  })
  .then(() => {
    console.log(4)
  })

async function foo() {
  await bar()
  console.log(5)
}
foo()

async function errorFunc() {
  try {
    await Promise.reject(6)
  } catch (e) {
    console.log(e)
  }
  console.log(7)
  return Promise.resolve(8)
}
errorFunc().then((res) => console.log(res))

function bar() {
  console.log(9)
}
console.log(10)
