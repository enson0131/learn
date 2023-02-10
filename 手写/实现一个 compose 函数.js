/**
 * 用法如下:
    function fn1(x) {
        return x + 1;
    }
    function fn2(x) {
        return x + 2;
    }
    function fn3(x) {
        return x + 3;
    }
    function fn4(x) {
        return x + 4;
    }
    const a = compose(fn1, fn2, fn3, fn4);
    console.log(a(1)); // 1+4+3+2+1=11
 */


function compose(...args) {
    const queue = [...args];
    let value;
    const _next = (initValue) => {
        if (!queue.length) return value;
        
        const task = queue.pop();
        if (task) {
            value = task(initValue);
            return _next(value);
        }
    }

    return _next;
}

function fn1(x) {
    return x + 1;
}
function fn2(x) {
    return x + 2;
}
function fn3(x) {
    return x + 3;
}
function fn4(x) {
    return x + 4;
}
const a = compose(fn1, fn2, fn3, fn4);
console.log(a(1));


// 解法2:
/**
 * compose
    1 返回一个函数
    2 可以使用分治的思想，用reduce函数，先处理第一个函数，在通过第一个的结果传递给第二个函数，最后返回结果
 */
function compose(...args) {
    return function(initValue) {
        return args.reduce((pre, value) => {
            return value(pre);
        }, initValue);
    };
}
const a = compose(fn1, fn2, fn3, fn4);
console.log(a(1));