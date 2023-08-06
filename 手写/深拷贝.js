const checkIsObject = (obj) => {
    return obj && typeof obj === 'object';
}

const deepClone = (obj) => {
    const res = Array.isArray(obj) ? [] : {}; // 如果是数组则初始化为数组
    if (!checkIsObject(obj)) return obj; // 值类型直接 return


    for(let key in obj) {
        // 保证遍历的属性不在原型上
        if (obj.hasOwnProperty(key)) {
            res[key] = deepClone(obj[key]);
        }
    }

    return res;
}


const obj = {
    a: 1,
    b: {
        c: 2
    },
    d: [1, 2, 3]
}

const obj2 = deepClone(obj);
obj2.b.c = 3;
obj2.d[0] = -1;
console.log(obj);
console.log(obj2);