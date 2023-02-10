// 结论: 如果promise内部返回了一个promise
//    - 他需要先对这个promise进行状态转化，需要耗费1个tick
//    - 然后将后面的then添加到微任务队列中，也需要1个tick
console.log('script start')

async function async1() {
    await async2()
    console.log('async1 end')
}
async function async2() {
    console.log('async2 end')
    return Promise.resolve()
}
async1()

setTimeout(function() {
    console.log('setTimeout')
}, 0)

new Promise(resolve => {
    console.log('Promise')
    resolve()
})
.then(function() {
    console.log('promise1')
})
.then(function() {
    console.log('promise2')
})

console.log('script end')