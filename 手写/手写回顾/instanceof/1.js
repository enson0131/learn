const _instanceof = (obj, Func) => {
  // 获取实例的原型对象
  let objPrototype = Object.getPrototypeOf(obj);
  // 获取构造函数的原型对象
  const funcPrototype = Func.prototype;
  while (objPrototype) {
    if (objPrototype === funcPrototype) {
      return true;
    }

    objPrototype = Object.getPrototypeOf(objPrototype);
  }
  return false;
};

console.log(new Object() instanceof Object);
console.log(_instanceof(new Object(), Object));
