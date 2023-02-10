// 接口可以用来描述对象的属性
// 接口可以用来描述对象行为
interface Speakable {
    speak(): void;
    readonly lng: string;
    name?: string;
}

let speakman: Speakable = {
    speak() {}, // 缺少属性也会报错
    name: "hello",
    lng: "en",
    // age: 111, // 多余属性会报错
}

interface Speakable1 {
    speak(): void;
}

interface Eatable {
    eat(): void;
}

class Persion3 implements Speakable1, Eatable {
    speak() {
        console.log(`实现接口的speak`)
    }
    eat () { // 如果没有实现eat方法会报错
        console.log(`实现接口的eat`)
    }
}

// 给interface定义任意属性
interface P {
    id: number,
    name: string,
    [propName: string]: any,
}

const p12: P = {
    id: 1,
    name: 'p1',
    a: 1,
    b: 2,
    c: 3
}

// interface接口与类型别名type的区别?
/**
 1 interface可以声明多个接口，使用时会成一个
 2 interface可以通过extends实现对接口的拓展，而类型别名可以通过交叉类型&实现类型的拓展
 3 type类型别名不仅可以用来规范对象，还能用于基础类型、元祖、联合类型
 */
interface A {
    a: number;
}

interface A {
    b: number,
}

const c: A = {
    a: 1,
    b: 1, // 不填B会报错
}

interface _A {
    a: number;
}

interface _B {
    b: number;
}

interface _C extends _A {
    b: number;
}
const _c:  _C = {
    a: 0,
    b: 1
}






