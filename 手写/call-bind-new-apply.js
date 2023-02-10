// 手写call
Function.prototype.myCall = function(ctx, ...args) {
  
  if (!ctx) {
    ctx = typeof window !== 'undefined' ? window : global;
  }

  ctx = Object(ctx);
  var onlyFlag = Symbol('myCall');

  _this[onlyFlag] = this;
  const result = _this[onlyFlag](...args);
  delete _this[onlyFlag];
  return result;
}


// 手写apply
Function.prototype.myApply = function(ctx, args = []) {
  let _this = ctx;
  if (!_this) {
    _this = typeof window !== 'undefined' ? window : global;
  }


  var onlyFlag = Symbol['myApply'];

  _this[onlyFlag] = this;
  _this[onlyFlag](...args);
  delete _this[onlyFlag]
}

// 手写bind
Function.prototype.myBind = function (ctx, ...args) {
  const fn = this;
  const noop = function () {}
  const res = function (...rest) {
    return fn.apply(this instanceof noop ? this : ctx, [...args, ...rest]);
  }

  if (this.prototype) {
    noop.prototype = this.prototype;
  }

  res.prototype = new noop();
  return res;
}

// 手写new
const _new = function (fn, ...args) {
  let obj = Object.create(fn.prototype);

  const result = fn.call(obj, ...args);
  
  if (typeof result === 'object' && result !== null) {
    return result
  } else {
    return obj;
  }
}








Function.prototype.myBind = function(ctx, ...args) {
  const fn = this;
  return function(...param) {
    return fn.apply(ctx, [...args, ...param])
  }
}

Function.prototype.myBind = function(ctx, ...args) {
  const fn = this;
  const noop = function () {}

  const res = function (...param) {
    return fn.apply( this instanceof noop ? this : ctx, [...args, ...param]);
  }

  if (fn.prototype) {
    noop.prototype = fn.prototype
  }

  res.prototype = new noop();
  return res;
}

var a = 2;
var b = {
  a: 1,
  fn() {
    console.log(this.a);
  }
}
var fn = b.fn.bind(window);

var c = new fn();
// 创建一个实例，这个实例的隐式原型是fn的显式原型


