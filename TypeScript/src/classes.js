"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 类相关
var Persion = /** @class */ (function () {
    function Persion(name) {
        this.name = name;
    }
    // 通过 public 就可以不用显式声明name啦，不过不支持这么做
    // constructor(public name: string) {
    //     this.name = name;
    // }
    Persion.prototype.getName = function () {
        console.log(this.name);
    };
    return Persion;
}());
var p1 = new Persion("hello");
p1.getName();
console.log("typeof Persion:", typeof Persion);
// 存取器
var User = /** @class */ (function () {
    function User(name) {
        this.myName = name;
    }
    Object.defineProperty(User.prototype, "name", {
        get: function () {
            return this.myName;
        },
        set: function (name) {
            this.myName = name;
        },
        enumerable: false,
        configurable: true
    });
    return User;
}());
var user = new User('123');
console.log("user.name", user.name);
user.name = '456';
console.log("user.name", user.name);
// 继承
var Persion1 = /** @class */ (function () {
    function Persion1(name, age) {
        this.name = name;
        this.age = age;
    }
    Persion1.prototype.getName = function () {
        return this.name;
    };
    Persion1.prototype.setName = function (name) {
        this.name = name;
    };
    return Persion1;
}());
var Son = /** @class */ (function (_super) {
    __extends(Son, _super);
    function Son(name, age, no) {
        var _this = _super.call(this, name, age) || this;
        _this.no = no;
        return _this;
    }
    Son.prototype.getAll = function () {
        console.log(this.name, this.age, this.no);
    };
    return Son;
}(Persion1));
var son = new Son('haha', 29, 1);
son.setName('balabala');
console.log(son, son.getName());
son.getAll();
// 类里面的修饰符
// public 可以被子类实例访问
// protected 当前类/子类都可以访问到
// private 只有在当前类能访问
// 类的静态方法
var Parent = /** @class */ (function () {
    function Parent(name) {
        //构造函数
        this.name = name;
    }
    Parent.getmainName = function () {
        console.log(this); //注意静态方法里面的this指向的是类本身 而不是类的实例对象 所以静态方法里面只能访问类的静态属性和方法
        return this.mainName;
    };
    Parent.mainName = "Parent";
    return Parent;
}());
console.log(Parent.mainName);
console.log(Parent.getmainName());
// 抽象类和抽象方法 - abstract
var Animal = /** @class */ (function () {
    function Animal() {
    }
    return Animal;
}());
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat.prototype.speak = function () {
        console.log("miao miao~");
    };
    return Cat;
}(Animal));
var cat = new Cat();
cat.speak();
// 重写是指子类重写继承自父类中的方法 重载是指为同一个函数提供多个类型定义
function lookupHeadphonesManufacturer(color) {
    if (color === "blue") {
        return "beats";
    }
    else {
        "bose";
    }
}
