// 通过 for..of 遍历对象的options属性的值

class Test {
  constructor(options) {
    this.options = options;
  }
  * [Symbol.iterator]() {
    for(let key in this.options) {
      yield this.options[key]
    }
  }
}

const obj = new Test({a: 1, b: 2, c: 3})


for(let value of obj) {
  console.log(value)
}