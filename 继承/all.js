// ---------------- 原型链继承 ------------------------
/**
 * 1 定义: 子类的原型是父类的实例对象
 * 2 优点: 简单阅读
 * 3 缺点: 所有子类都共享同一个父类, 当某一个子类修改了父类的属性/方法时，会影响到其他子类
 * 
 */
function Parent (name) {
    this.name = name
}

Parent.prototype.getName = function () {
    return this.name
}

function Childon() {
}

Childon.prototype = new Parent();
// ---------------- 原型链继承 ------------------------

// ---------------- 构造函数继承 ----------------------
/*
 定义: 在子类的构造函数中去调用父类的构造函数
 优点: 解决了原型链继承所有子类共用一个父类的问题
 缺点: 无法继承父类原型的属性和方法
*/
function Parent(name) {
    this.name = name;
}

Parent.prototype.getName = function () {
    return this.name
}

function Childon (name) {
    Parent.call(this, name)
}
// ---------------- 构造函数继承 ----------------------


// ---------------- 组合继承 --------------------------
/*
 定义: 在构造函数继承的基础上，子类的原型指向了父类的实例对象
 优点: 解决了构造函数继承，无法继承父类元素的属性和方法
 缺点: 调用了俩次父类的构造函数
*/
function Parent(name) {
    this.name = name;
}

Parent.prototype.getName = function() {
    return this.name
}

function Childon(name) {
    Parent.call(this, name)
}

Childon.prototype = new Parent();
Childon.prototype.constructor = Childon;
// ---------------- 组合继承 --------------------------


// ---------------- 寄生组合继承 -----------------------
/*
定义: 在子类构造函数调用父类构造函数, 子类原型指向父类原型
优点: 解决了组合继承多次调用父类构造函数的问题
缺点: 阅读性差
*/
function Parent(name) {
    this.name = name;
}

Parent.prototype.getName = function () {
    return this.name;
}

function Childon (name) {
    Parent.call(this, name)
}

Childon.prototype = Object.create(Parent)
Childon.prototype.constructor = Childon;

function object (fn) {
    const noop = function(){};
    noop.prototype = fn.prototype;
    return new noop();
}
// ---------------- 寄生组合继承 -----------------------

// ---------------- extends ---------------------------
// ES6继承就是寄生组合继承的语法糖
class Parent {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name
    }
}

class Childon extends Parent {
    constructor(name) {
        super(name);
    }
}
// ---------------- extends ---------------------------
