/**
 * 题目描述:实现一个 compose 函数
 * // 用法如下:
  function fn1(x) {
    return x + 1;
  }
  function fn2(x) {
    return x + 2;
  }
  function fn3(x) {
    return x + 3;
  }
  function fn4(x) {
    return x + 4;
  }
  const a = compose(fn1, fn2, fn3, fn4);
  console.log(a(1)); // 1+4+3+2+1=11
*/

function compose(...param) {
  const queue = param;
  const res = (initValue) => {
    return queue.reverse().reduce((value, cur) => { // value 是上一次返回的结果
      return cur(value);
    }, initValue) //注意这里要初始值
  }

  return res;
}

function fn1(x) {
  return x + 1;
}
function fn2(x) {
  return x + 2;
}
function fn3(x) {
  return x + 3;
}
function fn4(x) {
  return x + 4;
}
const a = compose(fn1, fn2, fn3, fn4);
console.log(a(1)); 



/**
 题目描述:setinterval 用来实现循环定时调用 可能会存在一定的问题 能用 settimeout 解决吗
 2 settimeout 模拟实现 setinterval(带清除定时器的版本)
 * 
 * * */

function mySetTimeout () {
  let timer;

  function interval(delay, fn) {
    fn();
    timer = setTimeout(() => {
      interval(delay, fn)
    }, delay);
  }
  return {
    set: (delay, fn) => {
      interval(delay, fn)
    },
    delete: () => {
      clearTimeout(timer);
    }
  }
}

// const _mySetTimeout = mySetTimeout();
// _mySetTimeout.set(1000, () => {console.log(123)});
// setTimeout(() => {
//   _mySetTimeout.delete();
// }, 10000);


/*
3 发布订阅模式
实现一个发布订阅模式拥有 on emit once off 方法
*/
class EventBus {
  constructor () {
    this.map = new Map();
  }

  on(key, callback) {
    const queue = this.map.get(key) || []
    queue.push(callback);

    this.map.set(key, queue);
  }

  emit (key, ...args) {
    if (!this.map.has(key)) return;

    const queue = this.map.get(key);

    queue.forEach(fn => {
      fn(...args);
    });
  }

  once (key, callback) {
    const fn = (...args) => {
      callback(...args);
      this.off(key, fn);
    }

    this.on(key, fn);
  }

  off (key, fn) {
    if (!this.map.has(key)) return;

    if (!fn) {
      this.map.delete(key);
    } else {
      let queue = this.map.get(key);
      queue = queue.filter(value => value !== fn);
      this.map.set(key, queue);
    }
  }
}

// 使用如下
const event = new EventBus();

const handle = (...rest) => {
  console.log(rest);
};

event.on("click", handle);

event.emit("click", 1, 2, 3, 4);

event.off("click", handle);

event.emit("click", 1, 2);

event.once("dbClick", () => {
  console.log(123456);
});
event.emit("dbClick");
event.emit("dbClick");


/*
4 数组去重
*/
function uniqueArr(arr) {
  return [...new Set(arr)];
}

// 最强数组去重
function uniqueArrPro(arr) {
  const obj = {};
  return arr.filter(item => {
    return obj.hasOwnProperty(typeof item + item) ? false :  (obj[typeof item + item] = true);
  })
}
const arr = [1, 21, 2, 2, 3];
console.log(uniqueArr(arr), uniqueArrPro(arr));


/**
 5 数组扁平化
 */
function flatter(arr) {
  const flag = arr.some(value => Array.isArray(value));

  if(!flag) return arr;

  arr = Array.prototype.concat.apply([], arr);

  return flatter(arr);
}

console.log(flatter([1, 2, [1, [2, 3, [4, 5, [6]]]]]));

// 迭代的方式
function flatter2(arr) {
  while(arr.some(value => Array.isArray(value))) {
    arr = [].concat(...arr);
  }

  return arr;
}

console.log(flatter2([1, 2, [1, [2, 3, [4, 5, [6]]]]]));


// 继承
// 6 寄生组合继承
function Parent(name, age) {
  this.name = name;
  this.age = age;
}

function Son (name, age) {
  Parent.call(this, name, age);
}

Son.prototype = Object.create(Parent.prototype); // 注意这里是Parent.prototype
Son.prototype.constructor = Son;

function _create(obj) {
  const noop = function() {};
  noop.prototype = obj;
  return new noop();
}


// 7 实现有并行限制的 Promise 调度器
/*
题目描述:JS 实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有两个
 addTask(1000,"1");
 addTask(500,"2");
 addTask(300,"3");
 addTask(400,"4");
 的输出顺序是：2 3 1 4

 整个的完整执行流程：

一开始1、2两个任务开始执行
500ms时，2任务执行完毕，输出2，任务3开始执行
800ms时，3任务执行完毕，输出3，任务4开始执行
1000ms时，1任务执行完毕，输出1，此时只剩下4任务在执行
1200ms时，4任务执行完毕，输出4
*/

class Scheduler {
  constructor (limit) {
    this.limit = limit;
    this.queue = [];
    this.count = 0; // 当前占用的任务数
  }

  add (delay, value) {
    const task = () => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(value);
          resolve();
        }, delay)
      })
    }

    this.queue.push(task);
  }

  request() {
    if (this.count >= this.limit || !this.queue.length) return;
    this.count++;
    const fn = this.queue.shift();

    fn().then(() => {
      this.count--;
      this.request();
    })
  }

  run () {
    for(let i = 0; i < this.limit; i++) {
      this.request();
    }
  }
}

const scheduler = new Scheduler(2);
function addTask (delay, value) {
  scheduler.add(delay, value);
}


addTask(1000,"1");
addTask(500,"2");
addTask(300,"3");
addTask(400,"4");
scheduler.run();


// 8 手写 new 操作符实现
function _new (fn, ...args) {
  const obj = Object.create(fn.prototype);
  const result = fn.call(obj, ...args);
  
  if (result && typeof result === 'object') {
    return result;
  } else {
    return obj;
  }
}
// 9 call apply bind
Function.prototype._call = function(ctx, ...args) {
  const obj = ctx || window;
  const fn = this;

  const onlyFlag = Symbol();
  obj[onlyFlag] = fn;

  const result = obj[onlyFlag](...args);
  delete obj[onlyFlag];

  return result;
}

Function.prototype._apply = function(ctx, param) {
  const obj = ctx || window;
  const fn = this;

  const onlyFlag = Symbol();
  obj[onlyFlag] = fn;

  const result = obj[onlyFlag](...param);
  delete obj[onlyFlag];

  return result;
}

Function.prototype._bind = function(ctx, ...args) {
  const obj = ctx || window;
  const fn = this;
  const noop = function () {};

  const res = function(...param) {
    return fn.apply(this instanceof noop ? this : obj, [...args, ...param]);
  } 

  if (fn.prototype) {
    noop.prototype = fn.prototype;
  }

  res.prototype = new noop();

  return res;
}

// 10 深拷贝（考虑到复制 Symbol 类型）

function isObject(obj) {
  return typeof obj === 'object' && obj;
}

function deepClone (target, hash = new WeakMap()) {
  if (!isObject(target)) return target; // 如果不是对象，直接返回
  
  if (hash.has(target)) return hash.get(target);

  let res = {};
  
  if (Array.isArray(target)) {
    res = [];
  }

  hash.set(target, res); // 处理循环引用

  for(let key in target) {
    res[key] = deepClone(target[key]);
  }

  return res;
}

// 11 instanceof
// 检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上
function _instanceof(obj, fn) {
  let parentObj = Object.getPrototypeOf(obj);

  while(parentObj) {
    if (fn.prototype === parentObj) return true;

    parentObj = Object.getPrototypeOf(parentObj);
  }

  return false;
}

// 12 函数柯里化
function curry(fn, ...args) {
  let allParam = [...args];
  let len = fn.length;

  const res = function(...rest) {
    allParam = [...allParam, ...rest];
    if (allParam.length >= len) {
      fn(...allParam);
    } else {
      return res;
    }
  }
  return res;
}

// 用法如下：
// const add = (a, b, c) => a + b + c;
// const a = currying(add, 1);
// console.log(a(2,3))



//-------------------------------------------------












// 29 Ajax
(function() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'url', true); // async: true
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      console.log(`成功`, this.responseText);
    } else {
      console.log(`失败`, this.responseText);
    }
  }
  xhr.send();
})()

// 31 将虚拟 Dom 转化为真实 Dom
/*
{
  tag: 'DIV',
  attrs:{
  id:'app'
  },
  children: [
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] }
      ]
    },
    {
      tag: 'SPAN',
      children: [
        { tag: 'A', children: [] },
        { tag: 'A', children: [] }
      ]
    }
  ]
}
把上诉虚拟Dom转化成下方真实Dom
<div id="app">
  <span>
    <a></a>
  </span>
  <span>
    <a></a>
    <a></a>
  </span>
</div>
*/

(function () {
  let data = {
    tag: 'DIV',
    attrs:{
      id:'app'
    },
    children: [
      {
        tag: 'SPAN',
        children: [
          { tag: 'A', children: [] }
        ]
      },
      {
        tag: 'SPAN',
        children: [
          { tag: 'A', children: [] },
          { tag: 'A', children: [] }
        ]
      }
    ]
  };

  function trasformNode (data) {
    if (typeof data === 'number') {
      data = String(data);
    }

    if (typeof data === 'string') {
      return document.createTextNode(data);
    }

    const node = document.createElement(data.tag);
    
    if (data.attrs) {
      for(let key in data.attrs) {
        node.setAttribute(key, data.attrs[key])
      }
    }
    
    if (data.children) {
      for(const value of data.children) {
        node.append(trasformNode(value))
      }
    }
    return node;
  }

  console.log(trasformNode(data));
})()

// 32 实现模板字符串解析功能
/*
  let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
  let data = {
    name: '姓名',
    age: 18
  }
  render(template, data); // 我是姓名，年龄18，性别undefined
*/

/**
 * 可以通过正则表达式结合replace方法处理
 */
(function () {
  let template = '我是{{name}}，年龄{{age}}，性别{{sex}}'
  let data = {
    name: '姓名',
    age: 18
  }

  // \w - 匹配字母数字下划线，等同于：[a-zA-Z0-9_]
  function render (template, data) {
    return template.replace(/{{(\w+)}}/g, (match, key) => { // 一定要加括号
      console.log(`match, key`, match, key)
      return data[key]
    })
  }

  console.log(render(template, data));
})()




//--------------------------------------------------


// 33 实现一个对象的 flatten 方法
/*
const obj = {
  a: {
         b: 1,
         c: 2,
         d: {e: 5}
     },
  b: [1, 3, {a: 2, b: 3}],
  c: 3
}
 
 flatten(obj) 结果返回如下
 // {
 //  'a.b': 1,
 //  'a.c': 2,
 //  'a.d.e': 5,
 //  'b[0]': 1,
 //  'b[1]': 3,
 //  'b[2].a': 2,
 //  'b[2].b': 3
 //   c: 3
 // }
*/
/*
  拍平对象
  思路: 还是通过不断递归的思路, 但key值需要存储从上一次的处理结果
  如果遇到数组，则对数组再次进行遍历，因为要获取到他的index值
*/
function flattenObj (obj) {
  const res = [];
  
  const isObject = (obj) => {
    return obj && typeof obj === 'object';
  }

  const _trasform = (obj, targetKey = '') => {
    if (!isObject(obj)) {
      res[targetKey] = obj;
      return;
    }

    for(let key in obj) {
      const value = obj[key];
      const parentKey = targetKey ? `${targetKey}.` : '';
      if (Array.isArray(value)) { // 如果是数组
        for(let index in value) { // 这一步主要是去获取他的下标
          _trasform(obj[key][index], `${parentKey}${key}[${index}]`)
        }
      } else {
        _trasform(obj[key], `${parentKey}${key}`)
      }
    }
  }

  _trasform(obj)

  return res;
}

console.log(flattenObj({
  a: {
         b: 1,
         c: 2,
         d: {e: 5},
         f: [1, 2, 3]
     },
  b: [1, 3, {a: 2, b: 3}],
  c: 3
}))


// 34 列表转成树形结构
/*
[
    {
        id: 1,
        text: '节点1',
        parentId: 0 //这里用0表示为顶级节点
    },
    {
        id: 2,
        text: '节点1_1',
        parentId: 1 //通过这个字段来确定子父级
    }
    ...
]
转成
[
    {
        id: 1,
        text: '节点1',
        parentId: 0,
        children: [
            {
                id:2,
                text: '节点1_1',
                parentId:1
            }
        ]
    }
]
*/

/*
思路: 列表转树
1 通过一次遍历，将Map去根据id缓存每一个值item
2 通过第二次遍历，将subItem对应的parentId, 找到item, 设置item的children值
3 parentId如果是 0 说明是根元素
*/

function listToTree(data) {
  const res = [];
  const map = new Map();

  for(let value of data) {
    map.set(value.id, value);
  }

  for(let value of data) {
    if (value.parentId === 0) {
      res.push(value); // 根节点的场景
    } else {
      const parentId = value.parentId;
      const parentNode = map.get(parentId);
      parentNode.children = parentNode.children || [];
      parentNode.children.push(value);
    }
  }

  return res;
}
console.log(listToTree([
  {
      id: 1,
      text: '节点1',
      parentId: 0 //这里用0表示为顶级节点
  },
  {
      id: 2,
      text: '节点1_1',
      parentId: 1 //通过这个字段来确定子父级
  }
]))


// 35 树形结构转成列表
/*
[
    {
        id: 1,
        text: '节点1',
        parentId: 0,
        children: [
            {
                id:2,
                text: '节点1_1',
                parentId:1
            },
            {
                id:3,
                text: '节点1_2',
                parentId:1
            }
        ]
    }
]
转成
[
    {
        id: 1,
        text: '节点1',
        parentId: 0 //这里用0表示为顶级节点
    },
    {
        id: 2,
        text: '节点1_1',
        parentId: 1 //通过这个字段来确定子父级
    }
    ...
]
*/

/*
思路
深度优先获取到每一个item的children的值，删除item的children属性，再将item存放到res中
*/
function treeToList (data) {
  const res = [];
  const _dfs = (data) => {
    for(let value of data) {
      if (value.children) _dfs(value.children);
      res.push(value);
      delete value.children;
    }
  }
  _dfs(data);
  return res;
}
console.log(treeToList([
  {
      id: 1,
      text: '节点1',
      parentId: 0,
      children: [
          {
              id:2,
              text: '节点1_1',
              parentId:1
          },
          {
              id:3,
              text: '节点1_2',
              parentId:1
          }
      ]
  }
]))


// 36 大数相加
/*
let a = "9007199254740991";
let b = "1234567899999999999";

function add(a ,b){
  //...
}
*/
/*
思路: 指针思路
1 使用长度较短的为被加数
2 加后会有一个进制povit
*/
var a1 = "9007199254740991";
var b1 = "1234567899999999999";
function add (a ,b) {
  // 确保a为长度较短的数
  if (a.length > b.length) {
    [a, b] = [b, a];
  }
  const aLen = a.length;
  const bLen = b.length;
  let index = 0;
  let res = '';
  let povit = 0; // 进制

  while(index < aLen) {
    const value1 = Number(a[aLen - 1 - index]);
    const value2 = Number(b[bLen - 1 - index]);
    
    let value = value1 + value2 + povit;
    if(value >= 10) {
      povit = 1;
      value = value - 10;
    } else {
      povit = 0;
    }
    
    res = value + res;
    index++;
  }
  
  // 最后对b剩余的数值进行加法
  while(index < bLen) {
    const valueB = Number(b[bLen - 1 - index]);

    let value = valueB + povit;

    if (value >= 10) {
      value = value - 10;
      povit = 1;
    } else {
      povit = 0;
    }

    res = value + res;
    index++;
  }

  if (povit === 1) {
    res = 1 + res;
  }

  return res;
}

console.log(add(a1, b1));






