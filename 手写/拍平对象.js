const obj = {
    a: {
           b: 1,
           c: 2,
           d: {e: 5}
       },
    b: [1, 3, {a: 2, b: 3}],
    c: 3
}
   
// flatten(obj) 结果返回如下
// {
//  'a.b': 1,
//  'a.c': 2,
//  'a.d.e': 5,
//  'b[0]': 1,
//  'b[1]': 3,
//  'b[2].a': 2,
//  'b[2].b': 3
//   c: 3
// }

function isObject (obj) {
    return typeof obj === 'object' && obj;
}


function flatten(obj, parentKey = '', result = {}) {
    // 如果值不是引用类型，直接return
    if (!isObject(obj)) return result[parentKey] = obj;

    for(let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const keyName = `${parentKey ? `${parentKey}.` : ''}${key}`;
            const currentValue = obj[key];
            if (Array.isArray(currentValue)) {
                currentValue.forEach((value, index) => {
                    flatten(value, `${keyName}[${index}]`, result)
                })
            } else {
                flatten(currentValue, keyName, result)
            }
        }
    }
    return result;
}

console.log(flatten(obj))