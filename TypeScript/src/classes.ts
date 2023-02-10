// 类相关
class Persion {
    name: string;
    age!: number; // 如果初始属性没有赋值需要加上非空判断

    constructor(name: string) {
        this.name = name;
    }

    // 通过 public 就可以不用显式声明name啦，不过不支持这么做
    // constructor(public name: string) {
    //     this.name = name;
    // }

    getName() : void {
        console.log(this.name);
    }
}

let p1 = new Persion("hello");
p1.getName();

console.log(`typeof Persion:`, typeof Persion)


// 存取器
class User {
    // public readonly myName: string; // 如果使用readonly那么只在构造函数能初始化
    myName: string;
    constructor(name: string) {
        this.myName = name;
    }

    get name () {
        return this.myName;
    }

    set name (name) {
        this.myName = name;
    }
}

const user = new User('123');
console.log(`user.name`, user.name);
user.name = '456';
console.log(`user.name`, user.name);

// 继承
class Persion1 {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    getName() : string {
        return this.name;
    }

    setName(name: string) : void {
        this.name = name;
    }
}

class Son extends Persion1 {
    no: number;
    constructor(name: string, age: number, no: number) {
        super(name, age);
        this.no = no;
    }
    getAll(): void {
        console.log(this.name, this.age, this.no);
    }
}

const son = new Son('haha', 29, 1);
son.setName('balabala')
console.log(son, son.getName());
son.getAll();

// 类里面的修饰符
// public 可以被子类实例访问
// protected 当前类/子类都可以访问到
// private 只有在当前类能访问

// 类的静态方法
class Parent {
    static mainName = "Parent";
    static getmainName() {
        console.log(this); //注意静态方法里面的this指向的是类本身 而不是类的实例对象 所以静态方法里面只能访问类的静态属性和方法
        return this.mainName;
    }
    public name: string;
    constructor(name: string) {
        //构造函数
        this.name = name;
    }
}
console.log(Parent.mainName);
console.log(Parent.getmainName());


// 抽象类和抽象方法 - abstract
abstract class Animal {
    name!: string;
    abstract speak(): void;
}

class Cat extends Animal {
    speak(): void {
        console.log(`miao miao~`)
    }
}

const cat = new Cat();
cat.speak()

// 重写是指子类重写继承自父类中的方法 重载是指为同一个函数提供多个类型定义





