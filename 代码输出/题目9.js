// const promise1 = Promise.resolve('First')
// const promise2 = Promise.resolve('Second')
// const promise3 = Promise.reject('Third')
// const promise4 = Promise.resolve('Fourth')
// const runPromises = async () => {
//   const res1 = await Promise.all([promise1, promise2])
//   const res2 = await Promise.all([promise3, promise4])
//   console.log(`res2`, res2)
//   return [res1, res2]
// }
// runPromises()
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err))

// const foo = async function () {
//   const err = await Promise.reject(1)
//   console.log(err)
// }
// foo()
//   .then((res) => {
//     console.log(`res`, res)
//   })
//   .catch((err) => {
//     console.log('err', err)
//   })

const promise = Promise.reject(1)
promise
  .then(
    (res) => {},
    (err) => {
      throw new Error(11)
    },
  )
  .then((res) => {
    console.log(`res`, res)
  })
  .catch((err) => {
    console.log(`err`, err)
  })
