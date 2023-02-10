Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log)
// 输出1
//  onFuiFilled = typeof onFuiFilled === 'function' ? onFuiFilled : y => y;
