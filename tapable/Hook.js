const CALL_DELEGATE = function (...args) {
  this.call = this._createCall("sync");
  return this.call(...args);
};

class Hook {
  constructor(args = [], name = undefined) {
    // 初始化 hooks 时传递的参数
    this._args = args;
    this.name = name;

    // 保存通过 tap 注册的内容
    /**
     
    taps: [{
      name: string; // tap 的第一个参数 name
      type: string; // tap 的类型
      fn: Function // 回调函数
    }]
     */
    this.taps = [];
    // 保存拦截器相关的内容
    this.interceptors = [];

    // hook.call 调用方法
    this._call = CALL_DELEGATE;
    this.call = CALL_DELEGATE;

    // _x 存放 hook 中所有通过 tap 注册的函数
    this._x = undefined;

    // 动态编译的方法
    this.compile = this.compile; // 重要！！！ compile 方法正是编译我们最终生成的执行函数的入口方法

    // 注册的相关方法
    // this.tap = this.tap;
  }

  tap(options, fn) {
    this._tap("sync", options, fn);
  }

  _tap(type, options, fn) {
    if (typeof options === "string") {
      options = {
        name: options.trim(),
      };
    }

    options = Object.assign({ type, fn }, options);
    this._insert(options);
  }

  // 每次tap都会调用 _resetCompilation 重新赋值 this.call
  _resetCompilation() {
    this.call = this._call;
  }

  _insert(options) {
    this._resetCompilation(); // 第一次调用call时，会执行 CALL_DELEGATE 生成了编译函数，第二次调用 call 时如果执行 _resetCompilation 方法，那么还是延用之前的编译函数
    this.taps.push(options);
  }

  /**
   * 这是因为不同类型的 Hook 最终编译出的执行函数是不同的形式，所以这里以一种抽象方法的方式将 compile 方法交给了子类进行实现。
   */
  compile(options) {
    throw new Error("Abstract: should be overridden");
  }

  // 最终编译生成函数的方法
  _createCall(type) {
    return this.compile({
      taps: this.taps,
      args: this._args,
      type: type,
    });
  }
}

module.exports = Hook;

// 参考文章: https://juejin.cn/post/7040982789650382855#heading-29
