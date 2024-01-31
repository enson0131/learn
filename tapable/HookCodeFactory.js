class HookCodeFactory {
  constructor(config) {
    this.config = config;
    this.options = undefined;
    this._args = undefined;
  }

  /**
   * 初始化必要参数
   * @param {*} instance - Hooks 实例
   * @param {*} options  - 参数
   */
  setup(instance, options) {
    instance._x = options.taps.map((x) => x?.fn);
  }

  // 编译最终需要生成的函数
  create(options) {
    this.init(options);
    // 最终编译生成的方法 fn
    let fn;

    switch (this.options.type) {
      case "sync":
        // new Function(arg0, arg1, /* …, */ argN, functionBody)
        fn = new Function(
          this.args(),
          '"use strict"; \n' +
            this.header() +
            this.contentWithInterceptors({
              onError: (err) => `throw ${err}; \n`,
              onResult: (result) => `return ${result}; \n`,
              resultReturns: true,
              onDone: () => "",
              rethrowIfPossible: true,
            })
        );
        break;
      default: // 其他类型先不考虑
        break;
    }

    this.deinit();

    return fn;
  }
  init(options) {
    this.options = options;
    this._args = options.args.slice(); // 初始化 hooks 是传入的第一个参数的数组
  }

  deinit() {
    this.options = undefined;
    this._args = undefined;
  }

  /**
   * 构建函数的参数
   */
  args({ before, after } = {}) {
    let allArgs = this._args;
    if (before) allArgs = [before].concat(allArgs);
    if (after) allArgs = allArgs.concat([after]);
    if (allArgs.length === 0) {
      return "";
    } else {
      return allArgs.join(",");
    }
  }
  header() {
    let code = "";
    code += "var _context; \n";
    code += "var _x = this._x; \n";
    return code;
  }
  // 生成函数内容和拦截器内容
  contentWithInterceptors(options) {
    return this.content(options);
  }

  callTapsSeries({ onDone }) {
    let code = "";
    let current = onDone;

    if (this.options.taps.length === 0) return onDone();

    // 遍历 taps 注册的函数，编译生成需要执行的函数
    for (let i = this.options.taps.length - 1; i >= 0; i--) {
      const done = current;
      const content = this.callTap(i, {
        onDone: done,
      });
      current = () => content;
    }
    code += current();
    return code;
  }

  callTap(tapIndex, { onDone }) {
    let code = "";
    code += `var _fn${tapIndex} = ${this.getTapFn(tapIndex)}; \n`;
    const tap = this.options.taps[tapIndex];

    switch (tap.type) {
      case "sync":
        code += `_fn${tapIndex}(${this.args()}); \n`;
        break;
      default:
        break;
    }

    if (onDone) {
      code += onDone();
    }

    return code;
  }

  getTapFn(tapIndex) {
    return `_x[${tapIndex}]`;
  }
}

module.exports = HookCodeFactory;
