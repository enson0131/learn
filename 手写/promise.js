/**
 * Promise.all - 所有Promise都为成功状态才返回
 * Promise.allSettled - 返回所有Promise的状态
 * Promise.race - 返回第一个Promise确定的状态，可以是成功或者失败
 * Promise.any - 返回第一个成功的Promise
 */
class myPromise {
  constructor (fn) {
    this.status = 'pendding'; // pending、success、fail
    this.successFnList = []; 
    this.failFnList = [];
    
    const _resolve = (...args) => {
      if (this.status !== 'pendding') return; // Promise状态只能从pedding -> resolve

      setTimeout(() => {
        this.status = 'success';
        // 为了保证then事件先注册（主要是考虑在promise里面写同步代码） promise规范 这里为模拟异步
        this.successFnList.forEach(item => item.call(this, ...args))
        this.successFnList = [];
      })
    }

    const _reject = (...args) => {
      if (this.status !== 'pendding') return; // Promise状态只能从pedding -> fail 

      setTimeout(() => {
        this.status = 'fail';
        this.failFnList.forEach(item => item.call(this, ...args));
        this.failFnList = [];
      })
    }

    try {
      fn(_resolve, _reject)
    } catch (err) {
      _reject(err)
    }
    
  }


  then(successCallBack, failCallBack) {
    successCallBack = typeof successCallBack === 'function' ? successCallBack : (v) => v;
    failCallBack = typeof failCallBack === 'function' ? failCallBack : (v) => v;

    // 链式调用
    return new myPromise((resolve, reject) => {
      this.successFnList.push((val) => {
        const x = successCallBack(val);
        //（最难的一点）
        // 如果回调函数结果是普通值 那么就resolve出去给下一个then链式调用
        // 如果是一个promise对象（代表又是一个异步） 那么调用x的then方法 将resolve和reject传进去
        // 等到x内部的异步 执行完毕的时候（状态完成）就会自动执行传入的resolve
        // 这样就控制了链式调用的顺序
        x instanceof myPromise ? x.then(resolve, reject) : resolve(x);
        // resolve(x);
      })

      this.failFnList.push((val => {
        const x = failCallBack(val);
        x instanceof myPromise ? x.reject(resolve, reject) : reject(x);
        // reject(x);
      }))
    })
  }

  all (promiseArr) {
    const result = [];
    const count = 0;
    return new myPromise((resolve, reject) => {
      for(let i = 0; i < promiseArr.length; i++) {
        //这里用 Promise.resolve包装一下 防止不是Promise类型传进来
        Promise.resolve(promiseArr[i]).then(val => {
          count++;
          result[i] = val; // 这里不能使用push，因为promise.all的值是一一对应的

          if (count === promiseArr.length) {
            resolve(result)
          }
        }, (err) => {
          reject(err);
        })
      }
    })
  }

  race() { // 返回第一个promise变更的状态
    return new myPromise((resolve, reject) => {
      for(let i = 0; i < promiseArr.length; i++) {
        //这里用 Promise.resolve包装一下 防止不是Promise类型传进来
        Promise.resolve(promiseArr[i]).then(val => {
          resolve(val); // promise数组只要有任何一个promise 状态变更  就可以返回
        }, (err) => {
          reject(err);
        })
      }
    })
  }
}


new myPromise((resolve => {
    resolve(1)
})).then((res) => {
    return new myPromise((resolve => {console.log(res); resolve(2)} ))
}).then(data => {
    console.log(data);
})