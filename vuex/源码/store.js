import applyMixin from './mixin';
import ModuleCollection from './module/module-collection'
import { forEach } from './util';

let Vue;

/**
 * 获取最新的 state
 * @param {*} store 
 * @param {*} path 
 * @returns 
 */
function getState(store, path) {
  return path.reduce((newState, current) => {
    return newState[current];
  }, store.state)
}

/**
 * 
 * @param {*} store - store
 * @param {*} rootState - 根实例的state
 * @param {*} path - 路径, 可用于追溯父元素
 * @param {*} module - 模块
 */
function installModule(store, rootState, path, module) {

  // 获取命名空间
  let namespace = store._modules.getNamespace(path);
  // [b, c]
  if (path.length > 0) {
    // 如果是子模块，需将子模块的状态定义到根模块上
    let parent = path.slice(0, -1).reduce((memo, current) => {
      return memo[current];
    }, rootState)

    // Vue.set(parent, path[path.length - 1], getState(store, path)); // 将子模块的state也定义到根模块上
    store._withCommitting(() => {
      Vue.set(parent, path[path.length - 1], getState(store, path));
    })
  }

  // 注册事件时，需要注册到对应的命名空间中
  // 可以根据path算出空间
  module.forEachMutation((mutation, type) => {
    store._mutations[namespace + type] = store._mutations[type] || [];
    store._mutations[namespace + type].push((payload) => {
      // 内部可能会替换状态, 这里如果一直使用module.state, 因为作用域问题可能就是老的状态了
      // mutation.call(store, module.state, payload);
      store._withCommitting(() => {
        mutation.call(store, getState(store, path), payload);
      })
      store._subscribe.forEach(sub => sub({mutation, type}, store.state));
    });
  })

  module.forEachAction((action, type) => {
    store._action[namespace + type] = store._action[type] || [];
    store._action[namespace + type].push((payload) => {
      action.call(store, store, payload)
    });
  })

  module.forEachGetters((getter, type) => {
    // getters重名会覆盖
    store._wrappedGetters[namespace + type] = function() {
      return getter(getState(store, path));
    }
  })

  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child);
  })
}

function resetStoreVm (store, state) {

  const _wrappedGetters = store._wrappedGetters;
  let computed = {};
  let oldVm = store._vm;
  store.getters = {};
  forEach(_wrappedGetters, (fn, key) => {
    computed[key] = function() {
      return fn();
    }
    // 我们调用的是getters, 因此我们需要通过代理的形式
    // 当访问我们的getters时实际上是获取computed的值
    Object.defineProperties(store.getters, key, {
      get: () => state._vm[key]
    })
  });

  // 通过创建一个vue的实例，将state状态变成响应式
  store._vm = new Vue({
    data: {
      $$state: state,
    },
    computed,
  })


  if (store.strict) {
    // 在状态变化变化后，立即执行
    store._vm.$watch(() => store._vm._data.$$state, () => {
      // 如果断言为 false，则将一个错误消息写入控制台。如果断言是 true，没有任何反应。
      console.assert(store._commiting, '异步修改了state');
    }, {deep: true, sync: true})
  }

  // 如果之前的vm存在，则销毁
  if (oldVm) {
    Vue.nextTick(() => {
      oldVm.$destoryed();
    })
  }


}

class Store {
  // constructor(options) {
  //   let state = options.state; // 用户传递过来的状态
  //   const computed = {};
  //   this.getters = {};
  //   // getters: 写法是方法，但是取值的时候是属性（方法的返回值）
  //   forEach(options.getters, (fn, key) => {
  //     computed[key] = () => {
  //       return fn(this.state)
  //     }
  //     Object.defineProperty(this.getters, key, {
  //       get: () => this._vm[key]
  //     })
  //   })
    
  //   // vue中定义数据，如果属性名通过 $xxx 命名 他不会被代理到 vue 的实例上（只会存在data中）
  //   this._vm = new Vue({
  //     data: {
  //       $$state: state, // 内部状态
  //     },
  //     computed, // 计算属性会将自己的属性放到实例上
  //   })
    
  //   // 发布订阅模式 将用户定义的 mutation 和 action 保存起来
  //   // 当调用 commit 时, 就找订阅的 mutation 方法
  //   // 调用 dispatch 就找对应的 action 方法
  //   this._mutations = {};
  //   forEach(options.mutations, (fn, type) => {
  //     this._mutations[type] = (payload) => {
  //       return fn.call(this, this.state, payload);
  //     }
  //   })

  //   this._action = {};
  //   forEach(options.actions, (fn, type) => {
  //     this._action[type] = (payload) => {
  //       return fn.call(this, this, payload);
  //     }
  //   })
  // }

  constructor (options) {
    // 格式化用户传入的参数，格式化成树形结构
    // 1 收集模块，将模块转化成一棵树
    this._modules = new ModuleCollection(options);

   
    let state = this._modules.root.state; // 根的状态

    this._mutations = {}; // 存放所有模块的mutations
    this._action = {}; // 存放所有模块的action
    this._wrappedGetters = {}; // 存放所有模块中的getters
    this._subscribe = [];
    this.strict = options.strict; // 严格模式

    // 同步的watcher
    this._commiting = false;


    // 2 安装模块 将模块上的属性 定义在我们的store中
    installModule(this, state, [], this._modules.root);

    // 3 将状态放到Vue的实例中
    resetStoreVm(this, state);

    // 插件的实现
    options.plugins.forEach(fn => {
      fn(this)
    })
  }
  
  _withCommitting(fn) {
    let commiting = this._commiting;
    this._commiting = true; // 做切片
    fn();
    this._commiting = commiting;
  }

  subscribe(fn) {
    this._subscribe.push(fn);
  }
  commit = (type, payload) => {
    this._mutations[type].forEach(fn => {
      fn(payload)
    });
  }

  dispatch = (type, payload) => {
    this._action[type].forEach(fn => {
      fn(payload)
    });
  }

  // 类的属性访问器，当用户去这个实例访问state属性时，会执行这个方法
  get state() {
    return this._vm._data.$$state;
  }

  replaceState (newState) {
    this._withCommitting(() => {
      this._vm.data.$$state = newState;
    })
  }

  registerModule (path, rawModule) {
    if (typeof path === 'string') path = [path];
    this._modules.register(path, rawModule);

    // 安装模块
    installModule(this, this.state, path, rawModule.rawModule);

    // 重新定义getters
    resetStoreVm(this, this.state);
  }
}


const install = (_Vue) => {
  Vue = _Vue;

  applyMixin(Vue);
}

export {
  Store,
  install
}

// 1 默认模块是没有作用域的
// 2 state状态不要和模块名字相同，会优先拿模块的
// 3 默认计算属性 直接通过getters取值
// 4 如果增加 namespaced: true, 会将模块的属性封装到该模块作用域下 (如果父级有，子级没有的话，就会放到父级上)
