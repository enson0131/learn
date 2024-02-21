"use strict";
(self["webpackChunkremote"] = self["webpackChunkremote"] || []).push([
  ["src_NewsList_js"],
  {
    "./src/NewsList.js": (module, exports, require) => {
      require.r(exports);
      require.d(exports, {
        default: () => __WEBPACK_DEFAULT_EXPORT__,
      });
      var react__WEBPACK_IMPORTED_MODULE_0__ = require(/*! react */ "./node_modules/react/index.js");
      var react__WEBPACK_IMPORTED_MODULE_0___default = require.n(
        react__WEBPACK_IMPORTED_MODULE_0__
      );
      var is_array__WEBPACK_IMPORTED_MODULE_1__ = require(/*! is-array */ "webpack/sharing/consume/default/is-array/is-array");
      var is_array__WEBPACK_IMPORTED_MODULE_1___default = require.n(
        is_array__WEBPACK_IMPORTED_MODULE_1__
      );

      function NewsList() {
        console.log(
          `isArray---->`,
          is_array__WEBPACK_IMPORTED_MODULE_1___default().name
        );
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
