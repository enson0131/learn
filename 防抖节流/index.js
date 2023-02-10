// 防抖
function debounce (fn, delay) {
    let timer;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.call(this, ...args);
            clearTimeout(timer);
            timer = null;
        }, delay);
    }
}

// 节流 throttle - 滚动事件
function throttle(fn, delay) {
    let timer;
    return function(...args) {
        if (timer) return;
        timer = setTimeout(() => {
            fn.call(this, ...args);
            clearTimeout(timer);
            timer = null;
        }, delay)
    }
}


function debounce_pro(fn, delay) {
    let last = 0;
    let timer;
    return function (...args) {
        const now = +new Date();

        // 在时间范围内持续触发，将以最后一次为等待时间
        if (now - last < delay) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                fn.call(this, ...args);
                last = now;
            }, delay)
        } else { // 超过了时间范围内，直接不等待，直接触发
            last = now;
            fn.call(this, ...args);
        }
    }
}