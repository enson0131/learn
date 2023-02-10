function deepClone(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  let result;
  if (Array.isArray(obj)) {
    result = []
  } else {
    result = {}
  }

  for(let i in obj) {
    if (obj.hasOwnProperty(i)) {
      result[i] = deepClone(obj[i])
    }
  }
  
  return result;
}

var a = {
  a: 1,
  b: 2,
  c: {
    a: 1
  }
}

var b = deepClone(a);
b.a = 2;
console.log(a);
b.c.a = 2;
console.log(a);
console.log(b);



function isObject(val) {
    return typeof val === "object" && val !== null;
}
  
function deepClone(obj, hash = new WeakMap()) {
    if (!isObject(obj)) return obj;
    if (hash.has(obj)) {
      return hash.get(obj);
    }
    let target = Array.isArray(obj) ? [] : {};
    hash.set(obj, target);

    Reflect.ownKeys(obj).forEach((item) => {
        target[item] = deepClone(obj[item], hash);
    });
  
    return target;
}

console.log(deepClone({
    a: new Set([1, 2, 3]),
    b: 2,
    c: {a:1}
}))