// > ```js
var entry = {
 'a.b.c.dd': 'abcdd',
 'a.d.xx': 'adxx',
 'a.e': 'ae'
}
// >
// > // 要求转换成如下对象
// > var output = {
// > a: {
// > b: {
// >   c: {
// >     dd: 'abcdd'
// >   }
// > },
// > d: {
// >   xx: 'adxx'
// > },
// > e: 'ae'
// > }
// > }
// > ```

// 解析：[第 112 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/212)


/**
 * 1 利用reduce写法, 将key转化为嵌套对象, 因为对象指向的是内存地址，会同步更新
 * 2 当到数组的最后一个值时，说明不再是对象，赋值即可
 * @param {*} obj 
 * @returns 
 */
function transform (obj) {
  const result = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (key.indexOf('.') > -1) {
        const arr = key.split('.');
        arr.reduce((pre, cur, index) => {
          pre[cur] = pre[cur] || {};
          if (index === arr.length - 1) { // 赋值
            pre[cur] = obj[key];
          }
          return pre[cur];
        }, result)
      } else {
        result[key] = obj[key];
      }
    }
  }

  return result
}

console.log(transform(entry));