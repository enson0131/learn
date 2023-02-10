// ### 第 84 题：请实现一个 add 函数，满足以下功能。
// > ```js
// > add(1); 			// 1
// > add(1)(2);  	// 3
// > add(1)(2)(3); // 6
// > add(1)(2, 3); // 6
// > add(1, 2)(3); // 6
// > add(1, 2, 3); // 6
// > ```
// 解析：[第 84 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/134)



const add = function(...args) {
    let allParam = [...args];
    function res(...rest) {
        allParam = [...allParam, ...rest];
        return res;
    }

    res.toString = function() {
        return allParam.reduce((pre, cur) => pre + cur);
    }

    return res;
}

console.log(add(1).toString()); 	  // 1
add(1)(2);    // 3
add(1)(2)(3); // 6
add(1)(2, 3); // 6
add(1, 2)(3); // 6
add(1, 2, 3); // 6


function curry(fn, ...args) {
    const len = fn.length;
    let allParam = [...args];
    function res (...rest) {
        allParam = [...rest, ...args];

        if (allParam.length >= len) {
            return fn(...allParam)
        } else {
            return res;
        }
    }
    return res;
}


