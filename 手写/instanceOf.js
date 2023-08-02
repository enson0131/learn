
/**
 * instanceof 运算符用于判断构造函数的 prototype 属性是否出现在对象的原型链中的任何位置。
 */
function _instanceof (obj, fn) {
    let parent = Object.getPrototypeOf(obj); 

    while(parent) {
        if (parent === fn.prototype) return true;

        parent = Object.getPrototypeOf(parent); 
    }

    return false;
}

console.log(_instanceof({}, Array));
console.log(_instanceof([], Array));


/**
 * instanceof 判断当前对象的原型链上是否存在指定的构造函数的原型
 */

function instanceof2(obj, Fn) {
    let current = obj;

    while(current) {
        const parent = Object.getPrototypeOf(current);
        if (parent === Fn.prototype) return true;
        current = parent;
    }

    return false;
}

console.log('instanceof2', instanceof2({}, Array));
console.log('instanceof2', instanceof2([], Array));