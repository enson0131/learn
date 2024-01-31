const Hook = require("./Hook");
const HookCodeFactory = require("./HookCodeFactory");

class SyncHookCodeFactory extends HookCodeFactory {
  content({ onError, onDone, rethrowIfPossible }) {
    return this.callTapsSeries({
      onError: (i, err) => onError(err),
      onDone,
      rethrowIfPossible,
    });
  }
}

const factory = new SyncHookCodeFactory();

const TAP_ASYNC = () => {
  throw new Error("tapAsync is not supported on a SyncHook");
};

const TAP_PROMISE = () => {
  throw new Error("tapPromise is not supported on a SyncHook");
};

/**
 compile 方法会在 hook.call 被调用，编译出目标函数
 options: [{
    type,
    args,
    taps: [{
        name,
        type,
        fn,
    }]
 }]
 */
function COMPILE(options) {
  factory.setup(this, options);
  return factory.create(options);
}

function SyncHook(args = [], name = undefined) {
  const hook = new Hook(args, name);
  hook.constructor = SyncHook;
  hook.tapAsync = TAP_ASYNC;
  hook.tapPromise = TAP_PROMISE;
  hook.compile = COMPILE;
  return hook;
}

SyncHook.prototype = null;

module.exports = SyncHook;

/**
const { SyncHook } = require('tapable');

const hooks = new SyncHook(['arg1', 'arg2']);

hooks.tap('flag1', () => {
    console.log(1);
})

hooks.tap('flag', () => {
    console.log(2);
})

hooks.call('arg1', 'arg2');

Tapable 会动态编译出来: 

function fn(arg1, arg2) {
    "use strict";
    var _context;
    var _x = this._x;
    var _fn0 = _x[0];
    _fn0(arg1, arg2);
    var _fn1 = _x[1];
    _fn1(arg1, arg2);
}
 */
