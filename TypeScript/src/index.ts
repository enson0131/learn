// /*
//  
//  使用 npx tsc index.ts 可以将index.ts编译成js文件
//  使用 npx ts-node index.ts 可以直接运行index.ts
//  使用 tsc 编译某个文件是无法指定ts.config.js的
//  我们可以在不指定输入文件的情况下执行 tsc 命令，默认从当前目录开始编译，编译所有 .ts 文件，并且从当前目录开始查找 tsconfig.json 文件，并逐级向上级目录搜索
// */
const num: number = 1;
const bol: boolean = true;
const str: string = 'str';
var undef: undefined = undefined;
var isNull: null = null;

const flag1: number[] = [1, 2, 3];
const flag2: Array<number> = [1, 2, 3, 4];

// 元组（ Tuple ）表示一个已知数量和类型的数组 其实可以理解为他是一种特殊的数组
const tuple: [string, number] = ['1', 1];

const sym1 = Symbol("hello");
const sym2 = Symbol("hello");
console.log(Symbol("hello") === Symbol("hello"));

// 任意类型
const any: any = 'a' || 1 || false;


// Unknown类型只能赋值给Unknown类型或者Any类型
let unknown: unknown;
unknown = 42;
// let bol1: unknown = unknown; // yes
// let bol1: any = unknown; // yes
// let bol1: boolean = unknown // no

// void类型 - 表示没有类型
// 拥有 void 返回值类型的函数能正常运行
function setId(id: number) : void {}

// never类型 - 常用于抛出错误
// 拥有 never 返回值类型的函数无法正常返回，无法终止，或会抛出异常。
function throwId(id: number) : never  { throw new Error('never')};

// bigInt类型
const max1 = Number.MAX_SAFE_INTEGER; // 2^53 - 1
console.log(max1 + 1 === max1 + 2); // true

const max2 = BigInt(Number.MAX_SAFE_INTEGER);
console.log(max2 + 1n === max2 + 2n); // false;


// object类型
let obj: object = []; // yes - 只能赋值引用类型
// let obj: object = 1; // no

// Object/{} 类型
let obj2: Object = 1; // yes - 可以赋值原始类型和非原始类型

// 联合类型
// 联合类型（Union Types）表示取值可以为多种类型中的一种 未赋值时联合类型上只能访问两个类型共有的属性和方法
let a: number | string = 1 || "1";

// 类型断言
// 尖括号 语法
// let someValue: any = "this is a string";
// let strLength: number = (<string>someValue).length;

// as 语法
let someValue: any = "this is a string";
let strLength = (someValue as string).length;

// 类型别名
type flag = string | number; // flag类型是string和number的联合类型

// 交叉类型 
// 交叉类型是将多个类型合并为一个类型。通过 & 运算符可以将现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性
type Flag1 = { x: number };
type Flag2 = Flag1 & { y: string };

let flag3: Flag2 = {
  x: 1, //'1',
  y: "hello1",
};

