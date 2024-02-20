"use strict";
(self["webpackChunkremote"] = self["webpackChunkremote"] || []).push([
  ["src_NewsList_js"],
  {
    "./src/NewsList.js": (module, exports, require) => {
      require.r(exports); // 定义成 es module 模块导出
      require.d(exports, {
        default: () => __WEBPACK_DEFAULT_EXPORT__,
      });
      var react__WEBPACK_IMPORTED_MODULE_0__ = require("./node_modules/react/index.js");
      var react__WEBPACK_IMPORTED_MODULE_0___default = require.n(
        react__WEBPACK_IMPORTED_MODULE_0__
      );

      function NewsList() {
        return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(
          "div",
          null,
          "NewsList"
        );
      }
      const __WEBPACK_DEFAULT_EXPORT__ = NewsList;
    },
  },
]);
