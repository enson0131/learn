var remote;
(() => {
  var modules = {
    "webpack/container/entry/remote": (module, exports, require) => {
      var moduleMap = {
        "./NewsList": () => {
          return Promise.all([
            require.e("vendors-node_modules_react_index_js"),
            require.e("src_NewsList_js"),
          ]).then(
            () => () => require(/*! ./src/NewsList */ "./src/NewsList.js")
          );
        },
      };
      var get = (module, getScope) => {
        require.R = getScope;
        getScope = require.o(moduleMap, module)
          ? moduleMap[module]()
          : Promise.resolve().then(() => {
              throw new Error(
                'Module "' + module + '" does not exist in container.'
              );
            });
        require.R = undefined;
        return getScope;
      };
      var init = (shareScope, initScope) => {
        if (!require.S) return;
        var name = "default";
        var oldScope = require.S[name];
        if (oldScope && oldScope !== shareScope)
          throw new Error(
            "Container initialization failed as it has already been initialized with a different share scope"
          );
        require.S[name] = shareScope;
        return require.I(name, initScope);
      };

      // This exports getters to disallow modifications
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

  // expose the modules object (modules)
  require.m = modules;

  // expose the module cache
  require.c = cache;

  /* webpack/runtime/compat get default export */
  (() => {
    // getDefaultExport function for compatibility with non-harmony modules
    require.n = (module) => {
      var getter =
        module && module.__esModule ? () => module["default"] : () => module;
      require.d(getter, { a: getter });
      return getter;
    };
  })();

  /* webpack/runtime/define property getters */
  (() => {
    // define getter functions for harmony exports
    require.d = (exports, definition) => {
      for (var key in definition) {
        if (require.o(definition, key) && !require.o(exports, key)) {
          Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
        }
      }
    };
  })();

  /* webpack/runtime/ensure chunk */
  (() => {
    require.f = {};
    // This file contains only the entry chunk.
    // The chunk loading function for additional chunks
    require.e = (chunkId) => {
      return Promise.all(
        Object.keys(require.f).reduce((promises, key) => {
          require.f[key](chunkId, promises);
          return promises;
        }, [])
      );
    };
  })();

  /* webpack/runtime/get javascript chunk filename */
  (() => {
    // This function allow to reference async chunks
    require.u = (chunkId) => {
      // return url for filenames based on template
      return "" + chunkId + ".js";
    };
  })();

  /* webpack/runtime/hasOwnProperty shorthand */
  (() => {
    require.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
  })();

  /* webpack/runtime/load script */
  (() => {
    var inProgress = {};
    var dataWebpackPrefix = "remote:";
    // loadScript function to load a script via script tag
    require.l = (url, done, key, chunkId) => {
      if (inProgress[url]) {
        inProgress[url].push(done);
        return;
      }
      var script, needAttach;
      if (key !== undefined) {
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
          var s = scripts[i];
          if (
            s.getAttribute("src") == url ||
            s.getAttribute("data-webpack") == dataWebpackPrefix + key
          ) {
            script = s;
            break;
          }
        }
      }
      if (!script) {
        needAttach = true;
        script = document.createElement("script");

        script.charset = "utf-8";
        script.timeout = 120;
        if (require.nc) {
          script.setAttribute("nonce", require.nc);
        }
        script.setAttribute("data-webpack", dataWebpackPrefix + key);

        script.src = url;
      }
      inProgress[url] = [done];
      var onScriptComplete = (prev, event) => {
        // avoid mem leaks in IE.
        script.onerror = script.onload = null;
        clearTimeout(timeout);
        var doneFns = inProgress[url];
        delete inProgress[url];
        script.parentNode && script.parentNode.removeChild(script);
        doneFns && doneFns.forEach((fn) => fn(event));
        if (prev) return prev(event);
      };
      var timeout = setTimeout(
        onScriptComplete.bind(null, undefined, {
          type: "timeout",
          target: script,
        }),
        120000
      );
      script.onerror = onScriptComplete.bind(null, script.onerror);
      script.onload = onScriptComplete.bind(null, script.onload);
      needAttach && document.head.appendChild(script);
    };
  })();

  /* webpack/runtime/make namespace object */
  (() => {
    // define __esModule on exports
    require.r = (exports) => {
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
      }
      Object.defineProperty(exports, "__esModule", { value: true });
    };
  })();

  /* webpack/runtime/node module decorator */
  (() => {
    require.nmd = (module) => {
      module.paths = [];
      if (!module.children) module.children = [];
      return module;
    };
  })();

  /* webpack/runtime/sharing */
  (() => {
    require.S = {};
    var initPromises = {};
    var initTokens = {};
    require.I = (name, initScope) => {
      if (!initScope) initScope = [];
      // handling circular init calls
      var initToken = initTokens[name];
      if (!initToken) initToken = initTokens[name] = {};
      if (initScope.indexOf(initToken) >= 0) return;
      initScope.push(initToken);
      // only runs once
      if (initPromises[name]) return initPromises[name];
      // creates a new share scope if needed
      if (!require.o(require.S, name)) require.S[name] = {};
      // runs all init snippets from all modules reachable
      var scope = require.S[name];
      var warn = (msg) => {
        if (typeof console !== "undefined" && console.warn) console.warn(msg);
      };
      var uniqueName = "remote";
      var register = (name, version, factory, eager) => {
        var versions = (scope[name] = scope[name] || {});
        var activeVersion = versions[version];
        if (
          !activeVersion ||
          (!activeVersion.loaded &&
            (!eager != !activeVersion.eager
              ? eager
              : uniqueName > activeVersion.from))
        )
          versions[version] = {
            get: factory,
            from: uniqueName,
            eager: !!eager,
          };
      };
      var initExternal = (id) => {
        var handleError = (err) =>
          warn("Initialization of sharing external failed: " + err);
        try {
          var module = require(id);
          if (!module) return;
          var initFn = (module) =>
            module && module.init && module.init(require.S[name], initScope);
          if (module.then)
            return promises.push(module.then(initFn, handleError));
          var initResult = initFn(module);
          if (initResult && initResult.then)
            return promises.push(initResult["catch"](handleError));
        } catch (err) {
          handleError(err);
        }
      };
      var promises = [];
      switch (name) {
      }
      if (!promises.length) return (initPromises[name] = 1);
      return (initPromises[name] = Promise.all(promises).then(
        () => (initPromises[name] = 1)
      ));
    };
  })();

  /* webpack/runtime/publicPath */
  (() => {
    require.p = "http://localhost:3000/";
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
      // JSONP chunk loading for javascript
      var installedChunkData = require.o(installedChunks, chunkId)
        ? installedChunks[chunkId]
        : undefined;
      if (installedChunkData !== 0) {
        // 0 means "already installed".

        // a Promise means "currently loading".
        if (installedChunkData) {
          promises.push(installedChunkData[2]);
        } else {
          if (true) {
            // all chunks have JS
            // setup Promise in chunk cache
            var promise = new Promise(
              (resolve, reject) =>
                (installedChunkData = installedChunks[chunkId] =
                  [resolve, reject])
            );
            promises.push((installedChunkData[2] = promise));

            // start chunk loading
            var url = require.p + require.u(chunkId);
            // create error before stack unwound to get useful stacktrace later
            var error = new Error();
            var loadingEnded = (event) => {
              if (require.o(installedChunks, chunkId)) {
                installedChunkData = installedChunks[chunkId];
                if (installedChunkData !== 0)
                  installedChunks[chunkId] = undefined;
                if (installedChunkData) {
                  var errorType =
                    event && (event.type === "load" ? "missing" : event.type);
                  var realSrc = event && event.target && event.target.src;
                  error.message =
                    "Loading chunk " +
                    chunkId +
                    " failed.\n(" +
                    errorType +
                    ": " +
                    realSrc +
                    ")";
                  error.name = "ChunkLoadError";
                  error.type = errorType;
                  error.request = realSrc;
                  installedChunkData[1](error);
                }
              }
            };
            require.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
          }
        }
      }
    };

    // install a JSONP callback for chunk loading
    var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
      var [chunkIds, moreModules, runtime] = data;
      // add "moreModules" to the modules object,
      // then flag all "chunkIds" as loaded and fire callback
      var moduleId,
        chunkId,
        i = 0;
      if (chunkIds.some((id) => installedChunks[id] !== 0)) {
        for (moduleId in moreModules) {
          if (require.o(moreModules, moduleId)) {
            require.m[moduleId] = moreModules[moduleId];
          }
        }
        if (runtime) var result = runtime(require);
      }
      if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
      for (; i < chunkIds.length; i++) {
        chunkId = chunkIds[i];
        if (require.o(installedChunks, chunkId) && installedChunks[chunkId]) {
          installedChunks[chunkId][0]();
        }
        installedChunks[chunkId] = 0;
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

  // module cache are used so entry inlining is disabled
  // startup
  // Load entry module and return exports
  var exports = require("webpack/container/entry/remote");
  remote = exports;
})();
