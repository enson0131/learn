function isObject(val) {
  return typeof val === 'object' && val !== null;
}

/**
 * 比较俩个对象的值是否都相等
 * @param {*} val1 
 * @param {*} val2 
 */
function isEqual(val1, val2) {
  if (!isObject(val1) || !isObject(val2)) {
    return val1 === val2;
  }
  
  // 同一个对象的场景
  if (val1 === val2) return true;

  const len1 = Object.keys(val1).length;
  const len2 = Object.keys(val2).length;
  if (len1 !== len2) return false; // 数据长度不一致，直接return false

  
  for(let i in val1) {
    if (!isEqual(val1[i], val2[i])) return false;
  }
 
  
  return true;
}

var a = isEqual({a:1, b: {
  x: 100,
  y: 200
}}, {a:1, b:{
  x: 100,
  y: 201
}})
console.log('a', a)