// remoteEntry 给一个全局变量赋值
/**
 * require.e 异步加载模块
 */
window.remote = (() => {
  var modules = {
    "webpack/container/entry/remote": (module, exports, require) => {
      const moduleMap = {
        // 动态加载 vendors-node_modules_react_index_js、src_NewsList_js 的代码块，获取他们的模块定义，合并到 modules 上，并返回模块定义
        "./NewsList": () => {
          // 返回的是一个 promise resolve 是一个函数 () => require(/*! ./src/NewsList */ "./src/NewsList.js")
          return Promise.all([
            require.e("vendors-node_modules_react_index_js"),
            require.e("src_NewsList_js"),
          ]).then(
            () => () => require(/*! ./src/NewsList */ "./src/NewsList.js")
          );
        },
      };

      var get = (name) => {
        return moduleMap[name]();
      };

      // 初始化共享作用域 TODO
      var init = (shareScope) => {
        var name = "default";
        require.S[name] = shareScope;
        return require.I(name);
      };

      require.d(exports, {
        get: () => get,
        init: () => init,
      });
    },
  };

  // The module cache
  var cache = {};

  // The require function
  function require(moduleId) {
    // Check if module is in cache
    var cachedModule = cache[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    // Create a new module (and put it into the cache)
    var module = (cache[moduleId] = {
      id: moduleId,
      loaded: false,
      exports: {},
    });

    // Execute the module function
    modules[moduleId](module, module.exports, require);

    // Flag the module as loaded
    module.loaded = true;

    // Return the exports of the module
    return module.exports;
  }

  // expose the module cache
  require.c = cache;

  /**
   * 将 definition 的方法拷贝到 exports 上
   * @param {*} exports
   * @param {*} definition
   */
  require.d = (exports, definition) => {
    for (var key in definition) {
      Object.defineProperties(exports, key, {
        get: definition[key],
      });
    }
  };

  require.f = {};
  // 异步动态加载代码块
  require.e = (chunkId) => {
    let promises = [];
    for (var key in require.f) {
      require.f[key](chunkId, promises);
    }
    return Promise.all(promises);
  };

  // 判断是否是对象的属性
  (() => {
    require.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
  })();

  return require("webpack/container/entry/remote");
})();
