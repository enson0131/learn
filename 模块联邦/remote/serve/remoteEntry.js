// remoteEntry 给一个全局变量赋值
/**
 * require.e 异步加载模块
 */
window.remote = (() => {
  var modules = {
    "./node_modules/is-array/index.js": (module) => {
      var isArray = Array.isArray;
      var str = Object.prototype.toString;
      module.exports =
        isArray ||
        function (val) {
          return !!val && "[object Array]" == str.call(val);
        };
    },
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

      // 初始化共享作用域
      // host 和 remote 共享一个公共作用域
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
      exports: {},
    });

    modules[moduleId](module, module.exports, require);

    return module.exports;
  }

  // expose the modules object (modules)
  require.m = modules;

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

  (() => {
    // 获取模块的内容
    require.n = (module) => {
      var getter =
        module && module.__esModules ? () => module["default"] : () => module;

      return getter;
    };
  })()(
    /* webpack/runtime/publicPath */
    () => {
      require.p = "http://localhost:3000/"; // 资源的前缀
    }
  )();

  /* webpack/runtime/get javascript chunk filename */

  (() => {
    // This function allow to reference async chunks
    // 获取文件路径
    require.u = (chunkId) => {
      // return url for filenames based on template
      return "" + chunkId + ".js";
    };
  })();

  (() => {
    require.l = (url, done) => {
      var script = document.createElement("script");
      script.src = url;
      script.onload = done;
      document.head.appendChild(script);
    };
  })();

  require.S = {}; // 所有作用域的集合，通过 name 来区分
  require.I = (name) => {
    // 判断是否对应的作用域
    if (require.S[name]) {
      return Promise.resolve();
    }
  };

  // 从共享作用域中加载共享模块
  /**
   * scopeName - 作用域，默认 default
   * key - 包名
   * version - 版本号
   */
  var init = (fn) =>
    function (scopeName, key, version) {
      return require.I(scopeName).then(() => {
        return fn(require.S[scopeName], key, version);
      });
    };

  // scope = {'is-array': { '1.0.1': { get: 就是对应 isArray 的模块内容} }}
  var loadShareScope = init((scope, key, version) => {
    var versions = scope[key];
    var entry = versions[version];
    return entry.get();
  });

  (() => {
    var moduleToHandlerMapping = {
      "webpack/sharing/consume/default/is-array/is-array": () =>
        loadShareScope("default", "is-array", "1.0.1"),
    };
    // no consumes in initial chunks
    var chunkMapping = {
      "webpack_sharing_consume_default_is-array_is-array": [
        "webpack/sharing/consume/default/is-array/is-array",
      ],
    };

    require.f.consumes = (chunkId, promises) => {
      if (require.o(chunkMapping, chunkId)) {
        chunkMapping[chunkId].forEach((id) => {
          let promise = moduleToHandlerMapping[id]().then((factory) => {
            modules[id] = () => {
              module.exports = factory(); // 工厂的执行结果就是这个 ID 对应的模块定义了
            };
          });
          promises.push(promise);
        });
      }
    };
  })();

  /* webpack/runtime/jsonp chunk loading */
  (() => {
    // no baseURI

    // object to store loaded and loading chunks
    // undefined = chunk not loaded, null = chunk preloaded/prefetched
    // [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
    var installedChunks = {
      remote: 0,
    };

    require.f.j = (chunkId, promises) => {
      if ("webpack_sharing_consume_default_is-array_is-array" != chunkId) {
        // setup Promise in chunk cache
        var promise = new Promise((resolve, reject) => {
          installedChunkData = installedChunks[chunkId] = [resolve, reject];
        });
        installedChunkData[2] = promise; // installedChunkData => [resolve, reject, promise];
        promises.push(promise);

        // start chunk loading
        var url = require.p + require.u(chunkId);
        require.l(url);
      } else installedChunks[chunkId] = 0;
    };

    // install a JSONP callback for chunk loading
    var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
      // 新的代码块id 和 代码块
      var [chunkIds, moreModules] = data;
      // add "moreModules" to the modules object,
      // then flag all "chunkIds" as loaded and fire callback
      var moduleId,
        chunkId,
        i = 0,
        resolves = [];

      for (; i < chunkIds.length; i++) {
        chunkId = chunkIds[i];
        if (require.o(installedChunks, chunkId) && installedChunks[chunkId]) {
          // installedChunks[chunkId][0]();
          resolves.push(installedChunks[chunkId][0]);
        }
        installedChunks[chunkId] = 0;
      }
      for (moduleId in moreModules) {
        if (require.o(moreModules, moduleId)) {
          require.m[moduleId] = moreModules[moduleId];
        }
      }
      if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
      while (resolves.length) {
        resolves.shift()();
      }
    };

    var chunkLoadingGlobal = (self["webpackChunkremote"] =
      self["webpackChunkremote"] || []);
    chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
    chunkLoadingGlobal.push = webpackJsonpCallback.bind(
      null,
      chunkLoadingGlobal.push.bind(chunkLoadingGlobal)
    );
  })();

  // 判断是否是对象的属性
  (() => {
    require.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
  })();

  (() => {
    // 转化成 esm 模块
    require.r = (exports) => {
      Object.defineProperties(exports, Symbol.toStringTag, { value: "Module" });
      Object.defineProperties(exports, "__esModule", { value: true });
    };
  })();

  return require("webpack/container/entry/remote");
})();
