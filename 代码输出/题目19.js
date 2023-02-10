// 结论: 先执行同步代码，然后前面第一个微任务放进去队列了，执行完后，再去执行then（第二个微任务）
new Promise((resolve, reject) => {
    Promise.resolve()
    .then(() => {
        console.log(1);
    })
    .then(() => {
        console.log(2);
    });
    resolve();
}).then(() => {
    console.log(3);
    Promise.resolve()
    .then(() => {
        console.log(4);
    })
    .then(() => {
        console.log(5);
    });
}).then(() => {
    console.log(6);
});