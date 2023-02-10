"use strict";
// /*
//  使用 npx tsc index.ts 可以将index.ts编译成js文件
//  使用 npx ts-node index.ts 可以直接运行index.ts
// */
const num = 1;
const bol = true;
const str = 'str';
var undef = undefined;
var isNull = null;
const flag1 = [1, 2, 3];
const flag2 = [1, 2, 3, 4];
// 元组（ Tuple ）表示一个已知数量和类型的数组 其实可以理解为他是一种特殊的数组
const tuple = ['1', 1];
const sym1 = Symbol("hello");
const sym2 = Symbol("hello");
console.log(Symbol("hello") === Symbol("hello"));
// 任意类型
const any = 'a' || 1 || false;
// Unknown类型只能赋值给Unknown类型或者Any类型
let unknown;
unknown = 42;
// let bol1: unknown = unknown; // yes
// let bol1: any = unknown; // yes
// let bol1: boolean = unknown // no
// void类型 - 表示没有类型
// 拥有 void 返回值类型的函数能正常运行
function setId(id) { }
// never类型 - 常用于抛出错误
// 拥有 never 返回值类型的函数无法正常返回，无法终止，或会抛出异常。
function throwId(id) { throw new Error('never'); }
;
// bigInt类型
const max1 = Number.MAX_SAFE_INTEGER; // 2^53 - 1
console.log(max1 + 1 === max1 + 2); // true
const max2 = BigInt(Number.MAX_SAFE_INTEGER);
console.log(max2 + 1n === max2 + 2n); // false;
// object类型
let obj = []; // yes - 只能赋值引用类型
// let obj: object = 1; // no
// Object/{} 类型
let obj2 = 1; // yes - 可以赋值原始类型和非原始类型
// 联合类型
// 联合类型（Union Types）表示取值可以为多种类型中的一种 未赋值时联合类型上只能访问两个类型共有的属性和方法
let a = 1 || "1";
// 类型断言
// 尖括号 语法
// let someValue: any = "this is a string";
// let strLength: number = (<string>someValue).length;
// as 语法
let someValue = "this is a string";
let strLength = someValue.length;
let flag3 = {
    x: 1,
    y: "hello1",
};
