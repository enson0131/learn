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

// [func1, func2, func3].reduce((pre, value) => {
//     return value(pre);
// }, (fun) => fun);

const func1 = (fn) => () => {
    console.log('进入func1', fn);
    const res = fn();
    console.log('离开func1');
    return res;
}
const func2 = (fn) => () => {
    console.log('进入func2', fn);
    const res = fn();
    console.log('离开func2');
    return res;
}
const func3 = (fn) => () => {
    console.log('进入func3', fn);
    const res = fn();
    console.log('离开func3');
    return res;
}

const composeB = (...fns) => {
    if (fns.length === 0) return arg => arg    
    if (fns.length === 1) return fns[0]  
    return fns.reduce((res, cur) => {
        return (...args) => res(cur(...args))
    });
}

// (...args) => func1(func2(func3(...args))) // 从左到右入栈
const dispatch = () => void 0;
const c = composeB(func1, func2, func3)(dispatch);
c();


