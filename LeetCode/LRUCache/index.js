/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.map = new Map();
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this.map.has(key)) {
    // get表示访问该值
    // 所以在访问的同时，要将其调整位置，放置在最后
    const temp = this.map.get(key);
    // 先删除，再添加
    this.map.delete(key);
    this.map.set(key, temp);
    // 返回访问的值
    return temp;
  } else {
    // 不存在，返回-1
    return -1;
  }
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  // 要将其放在最后，所以若存在key，先删除
  if (this.map.has(key)) this.map.delete(key);
  // 设置key、value
  this.map.set(key, value);
  if (this.map.size > this.capacity) {
    // 若超出范围，将 map 中头部的删除
    // map.keys()返回一个迭代器
    // 迭代器调用next()方法，返回包含迭代器返回的下一个值，在value中
    this.map.delete(this.map.keys().next().value);
  }
};
