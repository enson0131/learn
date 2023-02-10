// 泛型
// 在定义函数/接口/类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

function createArray<T>(length: number, value: T) : Array<T> {
    let result: T[] = [];
    for(let i = 0; i < length; i++) {
        result[i] = value;
    }

    return result;
}


// 多类型泛型
function swap<T, U>(tuple: [T, U]) : [U, T] {
    return [tuple[1], tuple[0]]
}

// 泛型约束
interface lengthwise {
    length: number;
}

function fn<T extends lengthwise>(args: T) : T {
    console.log(args.length); // 通过泛型约束参数必须存在length
    return args;
}

// 泛型接口
interface Cart<T> {
    list: T[];
}

let cartList: Cart<{name: string, age: number}> = {
    list: [{name: 'kiki', age: 3}]
}


// 泛型类型别名
type Cart1<T> = {list: T[]} | T[];
let c1: Cart1<string> = {list: ["1"]};
let c2: Cart1<number> = [1];
