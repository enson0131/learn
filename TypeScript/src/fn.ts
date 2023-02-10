// 函数相关
// 函数定义
function num(num1: number, num2: number) : number {
    return num1 + num2;
}

// 可选
function print(name: string, age?: number) : void {
    console.log(name, age);
}

// 默认参数
function ajax(url: string, method: string = 'get') : void {
    console.log(url, method);
}

// 剩余函数
function sum(...numbers: number[]) {
    return numbers.reduce((val, item) => { return val + item }, 0);
}
console.log(sum(1, 2, 3))

export {}; // 如果有export/import ts文件会变成局部作用域 默认是全局作用域