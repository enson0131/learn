
var entry = {
    a: {
        b: {
            c: {
                dd: 'abcdd'
            }
        },
        d: {
            xx: 'adxx'
        },
        e: 'ae'
    }
}

// 要求转换成如下对象
// > var output = {
// > 'a.b.c.dd': 'abcdd',
// > 'a.d.xx': 'adxx',
// > 'a.e': 'ae'
// > }
// > ```

// 解析：[第 111 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/206)

function isObject(obj) {
    return typeof obj === 'object' && obj;
}
/**
 * @description 
 * 1 循环对象，获取到对象上的key值
 * 2 判断key值是否是对象，如果是对象的话，继续递归
 * 3 key的赋值分为2种情况
 *   - 如果是基本数据类型，那么直接将结果赋值给result, key值parent上一次的key + 这一次的key
 *   - 如果是引用数据类型，那么直接继续递归，parent的key赋值为这一次的key + 上一次的key值
 * @author enson
 * @date 2022-04-11
 * @param {*} obj
 * @param {string} [parentKey='']
 * @param {*} [result={}]
 * @returns 
 */
function flatObj(obj, parentKey = '', result = {}) {
    // obj如果不是引用类型，赋值给result
    if (!isObject(obj)) return result[parentKey] = obj; // 妙

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const keyName = `${parentKey ? `${parentKey}.` : parentKey}${key}`;
        if(Array.isArray(obj[key])) { // 如果是数组，直接遍历
            obj[key].forEach((value, index) => {
                flatObj(value, keyName + `[${index}]`, result);
            });
        } else {
          flatObj(obj[key], keyName, result);
        }
      }
    }
    return result;
}

const obj = {
    a: {
           b: 1,
           c: 2,
           d: {e: 5}
       },
    b: [1, 3, {a: 2, b: 3}],
    c: 3
}
console.log(flatObj(obj))
