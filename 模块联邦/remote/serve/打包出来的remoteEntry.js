var remote;
(() => {
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

    "webpack/container/entry/remote":
      /*!***********************!*\
  !*** container entry ***!
  \***********************/
      (__unused_webpack_module, exports, require) => {
        "use strict";
        var moduleMap = {
          "./NewsList": () => {
            return Promise.all([
              require.e("vendors-node_modules_react_index_js"),
              require.e("webpack_sharing_consume_default_is-array_is-array"),
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
  var cache = {};

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
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
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
        case "default":
          {
            register(
              "is-array",
              "1.0.1",
              () => () =>
                require(/*! ./node_modules/is-array/index.js */ "./node_modules/is-array/index.js"),
              1
            );
          }
          break;
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

  /* webpack/runtime/consumes */
  (() => {
    var parseVersion = (str) => {
      // see webpack/lib/util/semver.js for original code
      var p = (p) => {
          return p.split(".").map((p) => {
            return +p == p ? +p : p;
          });
        },
        n = /^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(str),
        r = n[1] ? p(n[1]) : [];
      return (
        n[2] && (r.length++, r.push.apply(r, p(n[2]))),
        n[3] && (r.push([]), r.push.apply(r, p(n[3]))),
        r
      );
    };
    var versionLt = (a, b) => {
      // see webpack/lib/util/semver.js for original code
      (a = parseVersion(a)), (b = parseVersion(b));
      for (var r = 0; ; ) {
        if (r >= a.length) return r < b.length && "u" != (typeof b[r])[0];
        var e = a[r],
          n = (typeof e)[0];
        if (r >= b.length) return "u" == n;
        var t = b[r],
          f = (typeof t)[0];
        if (n != f) return ("o" == n && "n" == f) || "s" == f || "u" == n;
        if ("o" != n && "u" != n && e != t) return e < t;
        r++;
      }
    };
    var rangeToString = (range) => {
      // see webpack/lib/util/semver.js for original code
      var r = range[0],
        n = "";
      if (1 === range.length) return "*";
      if (r + 0.5) {
        n +=
          0 == r
            ? ">="
            : -1 == r
            ? "<"
            : 1 == r
            ? "^"
            : 2 == r
            ? "~"
            : r > 0
            ? "="
            : "!=";
        for (var e = 1, a = 1; a < range.length; a++) {
          e--,
            (n +=
              "u" == (typeof (t = range[a]))[0]
                ? "-"
                : (e > 0 ? "." : "") + ((e = 2), t));
        }
        return n;
      }
      var g = [];
      for (a = 1; a < range.length; a++) {
        var t = range[a];
        g.push(
          0 === t
            ? "not(" + o() + ")"
            : 1 === t
            ? "(" + o() + " || " + o() + ")"
            : 2 === t
            ? g.pop() + " " + g.pop()
            : rangeToString(t)
        );
      }
      return o();
      function o() {
        return g.pop().replace(/^\((.+)\)$/, "$1");
      }
    };
    var satisfy = (range, version) => {
      // see webpack/lib/util/semver.js for original code
      if (0 in range) {
        version = parseVersion(version);
        var e = range[0],
          r = e < 0;
        r && (e = -e - 1);
        for (var n = 0, i = 1, a = !0; ; i++, n++) {
          var f,
            s,
            g = i < range.length ? (typeof range[i])[0] : "";
          if (n >= version.length || "o" == (s = (typeof (f = version[n]))[0]))
            return !a || ("u" == g ? i > e && !r : ("" == g) != r);
          if ("u" == s) {
            if (!a || "u" != g) return !1;
          } else if (a)
            if (g == s)
              if (i <= e) {
                if (f != range[i]) return !1;
              } else {
                if (r ? f > range[i] : f < range[i]) return !1;
                f != range[i] && (a = !1);
              }
            else if ("s" != g && "n" != g) {
              if (r || i <= e) return !1;
              (a = !1), i--;
            } else {
              if (i <= e || s < g != r) return !1;
              a = !1;
            }
          else "s" != g && "n" != g && ((a = !1), i--);
        }
      }
      var t = [],
        o = t.pop.bind(t);
      for (n = 1; n < range.length; n++) {
        var u = range[n];
        t.push(
          1 == u
            ? o() | o()
            : 2 == u
            ? o() & o()
            : u
            ? satisfy(u, version)
            : !o()
        );
      }
      return !!o();
    };
    var ensureExistence = (scopeName, key) => {
      var scope = require.S[scopeName];
      if (!scope || !require.o(scope, key))
        throw new Error(
          "Shared module " + key + " doesn't exist in shared scope " + scopeName
        );
      return scope;
    };
    var findVersion = (scope, key) => {
      var versions = scope[key];
      var key = Object.keys(versions).reduce((a, b) => {
        return !a || versionLt(a, b) ? b : a;
      }, 0);
      return key && versions[key];
    };
    var findSingletonVersionKey = (scope, key) => {
      var versions = scope[key];
      return Object.keys(versions).reduce((a, b) => {
        return !a || (!versions[a].loaded && versionLt(a, b)) ? b : a;
      }, 0);
    };
    var getInvalidSingletonVersionMessage = (
      scope,
      key,
      version,
      requiredVersion
    ) => {
      return (
        "Unsatisfied version " +
        version +
        " from " +
        (version && scope[key][version].from) +
        " of shared singleton module " +
        key +
        " (required " +
        rangeToString(requiredVersion) +
        ")"
      );
    };
    var getSingleton = (scope, scopeName, key, requiredVersion) => {
      var version = findSingletonVersionKey(scope, key);
      return get(scope[key][version]);
    };
    var getSingletonVersion = (scope, scopeName, key, requiredVersion) => {
      var version = findSingletonVersionKey(scope, key);
      if (!satisfy(requiredVersion, version))
        warn(
          getInvalidSingletonVersionMessage(
            scope,
            key,
            version,
            requiredVersion
          )
        );
      return get(scope[key][version]);
    };
    var getStrictSingletonVersion = (
      scope,
      scopeName,
      key,
      requiredVersion
    ) => {
      var version = findSingletonVersionKey(scope, key);
      if (!satisfy(requiredVersion, version))
        throw new Error(
          getInvalidSingletonVersionMessage(
            scope,
            key,
            version,
            requiredVersion
          )
        );
      return get(scope[key][version]);
    };
    var findValidVersion = (scope, key, requiredVersion) => {
      var versions = scope[key];
      var key = Object.keys(versions).reduce((a, b) => {
        if (!satisfy(requiredVersion, b)) return a;
        return !a || versionLt(a, b) ? b : a;
      }, 0);
      return key && versions[key];
    };
    var getInvalidVersionMessage = (scope, scopeName, key, requiredVersion) => {
      var versions = scope[key];
      return (
        "No satisfying version (" +
        rangeToString(requiredVersion) +
        ") of shared module " +
        key +
        " found in shared scope " +
        scopeName +
        ".\n" +
        "Available versions: " +
        Object.keys(versions)
          .map((key) => {
            return key + " from " + versions[key].from;
          })
          .join(", ")
      );
    };
    var getValidVersion = (scope, scopeName, key, requiredVersion) => {
      var entry = findValidVersion(scope, key, requiredVersion);
      if (entry) return get(entry);
      throw new Error(
        getInvalidVersionMessage(scope, scopeName, key, requiredVersion)
      );
    };
    var warn = (msg) => {
      if (typeof console !== "undefined" && console.warn) console.warn(msg);
    };
    var warnInvalidVersion = (scope, scopeName, key, requiredVersion) => {
      warn(getInvalidVersionMessage(scope, scopeName, key, requiredVersion));
    };
    var get = (entry) => {
      entry.loaded = 1;
      return entry.get();
    };
    var init = (fn) =>
      function (scopeName, a, b, c) {
        var promise = require.I(scopeName);
        if (promise && promise.then)
          return promise.then(
            fn.bind(fn, scopeName, require.S[scopeName], a, b, c)
          );
        return fn(scopeName, require.S[scopeName], a, b, c);
      };

    var load = init((scopeName, scope, key) => {
      ensureExistence(scopeName, key);
      return get(findVersion(scope, key));
    });
    var loadFallback = init((scopeName, scope, key, fallback) => {
      return scope && require.o(scope, key)
        ? get(findVersion(scope, key))
        : fallback();
    });
    var loadVersionCheck = init((scopeName, scope, key, version) => {
      ensureExistence(scopeName, key);
      return get(
        findValidVersion(scope, key, version) ||
          warnInvalidVersion(scope, scopeName, key, version) ||
          findVersion(scope, key)
      );
    });
    var loadSingleton = init((scopeName, scope, key) => {
      ensureExistence(scopeName, key);
      return getSingleton(scope, scopeName, key);
    });
    var loadSingletonVersionCheck = init((scopeName, scope, key, version) => {
      ensureExistence(scopeName, key);
      return getSingletonVersion(scope, scopeName, key, version);
    });
    var loadStrictVersionCheck = init((scopeName, scope, key, version) => {
      ensureExistence(scopeName, key);
      return getValidVersion(scope, scopeName, key, version);
    });
    var loadStrictSingletonVersionCheck = init(
      (scopeName, scope, key, version) => {
        ensureExistence(scopeName, key);
        return getStrictSingletonVersion(scope, scopeName, key, version);
      }
    );
    var loadVersionCheckFallback = init(
      (scopeName, scope, key, version, fallback) => {
        if (!scope || !require.o(scope, key)) return fallback();
        return get(
          findValidVersion(scope, key, version) ||
            warnInvalidVersion(scope, scopeName, key, version) ||
            findVersion(scope, key)
        );
      }
    );
    var loadSingletonFallback = init((scopeName, scope, key, fallback) => {
      if (!scope || !require.o(scope, key)) return fallback();
      return getSingleton(scope, scopeName, key);
    });
    var loadSingletonVersionCheckFallback = init(
      (scopeName, scope, key, version, fallback) => {
        if (!scope || !require.o(scope, key)) return fallback();
        return getSingletonVersion(scope, scopeName, key, version);
      }
    );
    var loadStrictVersionCheckFallback = init(
      (scopeName, scope, key, version, fallback) => {
        var entry =
          scope &&
          require.o(scope, key) &&
          findValidVersion(scope, key, version);
        return entry ? get(entry) : fallback();
      }
    );
    var loadStrictSingletonVersionCheckFallback = init(
      (scopeName, scope, key, version, fallback) => {
        if (!scope || !require.o(scope, key)) return fallback();
        return getStrictSingletonVersion(scope, scopeName, key, version);
      }
    );
    var installedModules = {};
    var moduleToHandlerMapping = {
      "webpack/sharing/consume/default/is-array/is-array": () =>
        loadSingletonVersionCheckFallback(
          "default",
          "is-array",
          [1, 1, 0, 1],
          () => () =>
            require(/*! is-array */ "./node_modules/is-array/index.js")
        ),
    };
    // no consumes in initial chunks
    var chunkMapping = {
      "webpack_sharing_consume_default_is-array_is-array": [
        "webpack/sharing/consume/default/is-array/is-array",
      ],
    };
    var startedInstallModules = {};
    require.f.consumes = (chunkId, promises) => {
      if (require.o(chunkMapping, chunkId)) {
        chunkMapping[chunkId].forEach((id) => {
          if (require.o(installedModules, id))
            return promises.push(installedModules[id]);
          if (!startedInstallModules[id]) {
            var onFactory = (factory) => {
              installedModules[id] = 0;
              require.m[id] = (module) => {
                delete require.c[id];
                module.exports = factory();
              };
            };
            startedInstallModules[id] = true;
            var onError = (error) => {
              delete installedModules[id];
              require.m[id] = (module) => {
                delete require.c[id];
                throw error;
              };
            };
            try {
              var promise = moduleToHandlerMapping[id]();
              if (promise.then) {
                promises.push(
                  (installedModules[id] = promise
                    .then(onFactory)
                    ["catch"](onError))
                );
              } else onFactory(promise);
            } catch (e) {
              onError(e);
            }
          }
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
          if ("webpack_sharing_consume_default_is-array_is-array" != chunkId) {
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
          } else installedChunks[chunkId] = 0;
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
