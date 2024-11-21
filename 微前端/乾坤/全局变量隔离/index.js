/**
 * 实现一个 沙箱机制代码实现示例
 */
class Sandbox {
  constructor() {
    this.originalWindow = window; // 保存原始的 window 对象

    this.proxyWidnow = new Proxy(window, {
      get: (target, key) => {
        console.log(`this - get`, this);
        if (this[key] !== undefined) {
          return this[key]; // this 指向的是代理对象
        }
        return target[key];
      },
      // target 指的是源对象
      set: (target, key, value) => {
        console.log(`this - set`, this);
        if (this[key] !== undefined) {
          this[key] = value;
          return true;
        }

        target[key] = value;
        return true;
      },
    });
  }

  activate() {
    window = this.proxyWidnow;
  }

  deactivate() {
    window = this.originalWindow;
  }

  clear() {
    const _this = this.proxyWidnow;
    // 清除沙箱中的变量
    for (const key in _this) {
      if (
        _this.hasOwnProperty(key) &&
        key !== "originalWindow" &&
        key !== "proxyWidnow"
      ) {
        delete _this[key];
      }
    }
  }
}

const sandbox = new Sandbox();

sandbox.activate(); // 激活

window.myVar = "Hello, Qiankun!"; // 在沙箱中设置变量

console.log(window.myVar); // Hello, Qiankun!

sandbox.deactivate(); // 关闭沙箱

sandbox.clear(); // 清除沙箱中的变量

console.log(window.myVar); // undefined
