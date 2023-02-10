import { forEach } from "../util";
import Module from "./module";

export default class ModuleCollection {
  constructor(options) {
    // 注册模块
    this.register([], options);
  }

  register(path, rootModule) {
    let newModule = new Module(rootModule);
    rootModule.rawModule = newModule; // 用于动态添加模块 store.registerModule
    if (path.length === 0) {
      this.root = newModule;
    } else {
      // [a, b, c, d] 
      // path.slice(0, -1) => [a, b, c]
      let parent = path.slice(0, -1).reduce((memo, current) => {
        return memo.getChild(current);
      }, this.root);

      parent.addChild(path[path.length - 1], newModule);
    }

    // 如果有modules, 说明有子模块
    if (rootModule.modules) { // 深度优先
      forEach(rootModule.modules, (childModule, moduleName) => {
        this.register([...path, moduleName], childModule)
      });
    }
  }

  getNamespace(path) { // 获取命令空间
    let root = this.root;
    path.reduce((namespace, key) => {
      root = root.getChild(key);
      if (!root.namespaced) return namespace;

      return namespace + key + '/'
    }, '')
  }
}


// 格式化树结构
// this.root = {
//   _raw: xxx,
//   _children: {
//     a: { // 模块a
//       _raw: xxx,
//     },
//     b: { // 模块b
//       _raw: xxx,
//       _children: {

//       }
//     }
//   }
// }