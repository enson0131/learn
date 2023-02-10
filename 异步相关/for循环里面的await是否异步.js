function test(num) {
    return new Promise(res => {
        setTimeout(() => {
            console.log(`test - ${num}`)
            res(num)
        }, 200 - num * 100);
    })
}

async function a() {
    console.log('start')
    for(let i = 0; i < 3; i++) {
        const res = await test(i); // 同步执行
        console.log(`res ===>`, res);
    }
    console.log('end')
}

// a();


async function b () {
    console.log('start - b');
    [1, 2, 3].forEach(async value => {
        const res = await test(value); // 并发 - 不建议这种写法, 建议使用 Promise.all
        console.log('res ===>', res);
    })
    console.log('end === b');
}
// b();


async function c() {
    console.log('start')
    for (let value of [1, 2, 3]) {
        const res = await test(value); // 同步
        console.log('res ===>', res);
    }
    console.log('end')
}
c();