console.log(`a.js`)
setTimeout(() => {
  import('./b.js').then(res => {
    console.log(`res`, res)
  })
}, 2000)