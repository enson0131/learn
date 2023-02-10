/**
 * new Promise((resolve, reject) => {
 * }).then(() => {
 * }, () => {})
 */

class myPromise {
    constructor(fn) {
        this.status = 'pending'; // pending - 等待，success - 成功 fail - 失败
        this.successFnList = [];
        this.failFnList = [];

        const _resolve = (value) => {
            if (this.status !== 'pending') return;

            this.status = 'success';
            
            setTimeout(() => {
                this.successFnList.forEach(callBack => callBack.call(this, value))
                this.successFnList = [];
            }, 0)
        }

        const _reject = (value) => {
            if (this.status !== 'pending') return;

            this.status = 'fail';
            
            setTimeout(() => {
                this.failFnList.forEach(callBack => callBack.call(this, value))
                this.failFnList = [];
            }, 0)
        }

        fn(_resolve, _reject)
    }

    then(successCallBack, failCallBack) {
        successCallBack = typeof successCallBack === 'function' ? successCallBack : v => v; // 如果不是函数，则封装成上一次的返回值
        failCallBack = typeof failCallBack === 'function' ? failCallBack : v => v;

        return new myPromise((resolve, reject) => {
            this.successFnList.push((value) => {
                const result = successCallBack(value)
                result instanceof myPromise ? result.then(resolve, reject) : resolve(result)
            })

            this.failFnList.push((value) => {
                const result = failCallBack(value)
                result instanceof myPromise ? result.then(resolve, reject) : reject(result)
            })
        })
    }

    static all(promiseArr) {
        const result = [];
        const count = promiseArr.length;
        return new Promise((resolve, reject) => {
            for(let i = 0; i < count; i++) {
                Promise.resolve(promiseArr[i]).then(data => {
                    result[i] = data;
                    if (result.length === count) {
                        resolve(result)
                    }
                }).catch(err => {
                    reject(err)
                })
            }
        })
    }

    static race(promiseArr) {
        return new Promise((resolve, reject) => {
            for(let i = 0; i <= promiseArr.length; i++) {
                Promise.resolve(promiseArr[i]).then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err)
                })
            }
        })
    }
}