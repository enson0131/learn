import { forEach } from "../util";

export default class Module {
  constructor(rootModule) {
    this._rawModule = rootModule; // 原始模块
    this._children = {};
    this.state = rootModule.state;
  }

  get namespaced () { // 属性访问器
    return this._rawModule.namespaced;
  }

  getChild(key) {
    return this._children[key];
  }

  addChild(key, module) {
    this._children[key] = module;
  }
  
  forEachMutation(fn) {
    if (this._rawModule.mutations) {
      forEach(this._rawModule.mutations, fn)
    }
  }

  forEachAction(fn) {
    if (this._rawModule.actions) {
      forEach(this._rawModule.actions, fn)
    }
  }

  forEachGetters(fn) {
    if (this._rawModule.getters) {
      forEach(this._rawModule.getters, fn)
    }
  }

  forEachChild(fn) {
    forEach(this._children, fn)
  }
}