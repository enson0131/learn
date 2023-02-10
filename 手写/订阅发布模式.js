class eventBus {
    constructor() {
        this.map = new Map();
    }
    on (key, fn) { // on 这里去添加的
        let cacheList = [];
        if (this.map.has(key)) {
            cacheList = this.map.get(key)
        }
        cacheList.push(fn)

        this.map.set(key, cacheList)
    }
    emit (key, ...args) {
        if (this.map.has(key)) {
            const cacheList = this.map.get(key);
            cacheList.forEach(fn => {
                fn.call(this, ...args)
            });
        } 
    }
    off (key, fn) {
        if (!this.map.has(key)) return;
        
        if (fn) {
            let cacheList = this.map.get(key);
            cacheList = cacheList.filter(item => item !== fn)
            this.map.set(key, cacheList)
        } else {
            this.map.delete(key)
        }
        
    }
    once (key, fn) {
        const _this = this;
        function callBack(...args) {
            fn(...args)
            _this.off(key, fn) // fix: 多次 once 是都会将回调函数压入队列中, 执行后就移除
        }
        this.on(key, callBack)
    }
}

// 使用如下
// 1234, 123456
const event = new eventBus();

const handle = (...rest) => {
  console.log(rest);
};

event.on("click", handle);

event.emit("click", 1, 2, 3, 4);

event.off("click", handle);

event.emit("click", 1, 2);

event.once("dbClick", () => {
  console.log(123456);
});
event.emit("dbClick");
event.emit("dbClick");

// export default eventBus