function myBind(ctx, ...args) {
    const fn = this;

    return function (...rest) {
        fn.apply(ctx, [...args, ...rest])
    }
}


function myBind_pro(ctx, ...args) {
    const fn = this;
    
    const noop = function () {}

    const res = function(...rest) {
        fn.apply(this instanceof noop ? this : ctx, [...args, ...rest])
    }

    if (fn.prototype) {
        noop.prototype = fn.prototype;
    }

    res.prototype = new noop();

    return res;
}


// ---- 再次手写一波 ------
Function.prototype.myBind = function(ctx, ...args) {
    const fn = this;
    const noop = function() {};
    const res = function(...rest) {
        return fn.apply(ctx, [...args, ...rest]);
    }

    if (fn.prototype) {
        noop.prototype = fn.prototype;
    }
    
    res.prototype = new noop;

    return res;
}

/**
 * fn.call(window, 1, 2, 3, 4)
 * @param {*} ctx 
 * @param  {...any} args 
 */
Function.prototype.myCall = function (ctx, ...args) {
    const fn = this;
    const onlyFlag = Symbol();
    const obj = ctx ? ctx : window;
    obj[onlyFlag] = fn;

    const result = obj[onlyFlag](...args);
    delete obj[onlyFlag];

    return result;
}

/**
 * fn.apply(window, [1, 2, 3, 4])
 * @param {*} ctx 
 * @param  {...any} args 
 */
 Function.prototype.myApply = function (ctx, args) {
    const fn = this;
    const onlyFlag = Symbol();
    const obj = ctx || window;
    obj[onlyFlag] = fn;

    const result = obj[onlyFlag](...args);
    delete obj[onlyFlag];

    return result;
}


function _new(fn, ...args) {
    const obj = Object.create(fn.prototype);
   
    const result = fn.call(obj, ...args);

    if (typeof result === 'object' && result) {
        return result;
    } else {
        return obj;
    }
}

// instanceof: 判断 fn.prototype 是否在obj的原型上
function _instanceof (obj, fn) {
    if (!obj) return;
    let parentObj = Object.getPrototypeOf(obj); // 获取原型对象

    while(parentObj) {
        if (parentObj === fn.prototype) return true;
        parentObj = Object.getPrototypeOf(parentObj); // 获取原型对象
    }

    return false;
}

console.log(_instanceof({}, Object))
console.log(_instanceof(Object.prototype, Object))

const checkIsObj = value => {
    return typeof value === 'object' && value;
};

const hash = new WeakMap();

const _deepClone = function(obj) {
    if (!checkIsObj(obj)) return obj;

    if (hash.has(obj)) return hash.get(obj);

    let result = {};
    if (Array.isArray(obj)) {
        result = [];
    }

    hash.set(obj, result);

    for (const key in obj) {
        result[key] = _deepClone(obj[key]);
    }

    return result;
};




function debounce(fn, delay = 100) {
    let timer;
    return function(...rest) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.call(this, ...rest);
            clearTimeout(timer)
        }, delay)
    }
}


function throttle (fn, delay = 100) {
    let timer;
    return function(...rest) {
        if (timer) return;
        timer = setTimeout(() => {
            fn.call(this, ...rest);
            clearTimeout(timer);
        }, delay)
    }
}

function _flat(arr) {
    const hasArr = arr.some(item => item instanceof Array);

    if (!hasArr) return arr;

    // 拍平
    const result = Array.prototype.concat.apply([], arr);
    return _flat(result);
}
console.log(_flat([1, 2, [1, [2, 3, [4, 5, [6]]]]]));

// fn(1)(2, 3) 
// _myCurry(fn, 1)(2, 3)
function _myCurry(fn, ...args) {
    const len = fn.length;
    let allArgs = [...args];
    const res = function(...params) {
        allArgs = [...allArgs, ...params];
        if (allArgs.length === len) {
            return fn(...allArgs)
        } else {
            return res;
        }
    }

    return res;
}

