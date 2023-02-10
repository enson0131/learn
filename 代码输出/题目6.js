let promise = new Promise(function (resolve, reject) {
  console.log('Promise')
  resolve()
})

promise.then(function () {
  console.log('resolved')
})

console.log('Hi,CODEHTML!')
