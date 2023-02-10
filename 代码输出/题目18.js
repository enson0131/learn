 // 先执行同步代码，然后遇到resolve会将then放入微任务队列中，因此先 4 后 6 
 setTimeout(() => {
    console.log('0');
  }, 0)
  new Promise((resolve, reject) => {
    console.log('1');
    resolve();
  }).then(() => {
    console.log('2');
    new Promise((resolve, reject) => {
      console.log('3');
      resolve();
    }).then(() => {     
      console.log('4');
    }).then(() => {
      console.log('5');
    })
  }).then(() => {
    console.log('6');  
  })
  
  new Promise((resolve, reject) => {
    console.log('7');
    resolve()
  }).then(() => {        
    console.log('8');
  })