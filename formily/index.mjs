import { observable, autorun } from '@formily/reactive'

// 参考 👉 https://github.com/fishedee/Demo/tree/master/formily_reactive/listen_set

function testObservable1() {
    // 将一个对象变化可观察的，就是倾听它的set操作
    const obs = observable({
        aa: {
            bb: 123,
        },
        cc: {
            dd: 123,
        },
    })

    autorun(() => {
        // 首次的时候会触发，变化的时候也会触发
        // 总共触发2次
        console.log('normal1', obs.aa.bb)
    })

    //数据进行set操作的时候，就会触发
    obs.aa.bb = 44

    // autorun(() => {
    //     // 当值相同的时候，不会重复触发
    //     // 这里只会触发1次
    //     console.log('normal2', obs.cc.dd)
    // })

    obs.cc.dd = 123
}


/**
 * 本质就是通过 proxy 代理对象，然后通过 get 和 set 方法去收集 watch 依赖，后续当依赖变化时，会触发 autorun 回调
 */
function testObservable2_object() {
    const obs = observable({
        aa: {
            bb: 123,
        },
    })
    autorun(() => {
        // 触发2次
        // 首次
        // 自身赋值1次
        // 赋值如同console，一样是向对象执行get操作
        const mk = obs.aa
        console.log('normal2_object')
    })

    // 不会触发，子字段的变化不会影响到父字段的触发
    console.log('1. sub assign')
    obs.aa.bb = 44

    // 会触发1次
    console.log('2. self assign')
    obs.aa = { bb: 789 }
}

// testObservable2_object();


function testObservable3_object() {
    const obs = observable({
        aa: {},
    })

    autorun(() => {
        // 触发1次
        // 首次
        const mk = obs.aa
        console.log('normal3_object')
    })

    // 不会触发，object的添加property不会触发
    console.log('1. self add property')
    obs.aa.bb = 4

    // 不会触发，obs.aa.bb的赋值不会触发
    console.log('2. self assign')
    obs.aa.bb = 5

    // 不会触发，object的移除property不会触发
    console.log('3. self remove property')
    delete obs.aa.bb
}

// testObservable3_object();


function testObservable3() {
    const obs = observable({
        aa: {
            bb: ['a'],
        },
    })
    autorun(() => {
        // 只倾听bb字段的话，变化的时候也不会触发
        // 因为obs.aa.bb的引用没变化
        // 只会触发1次
        console.log('array1', obs.aa.bb)
    })

    autorun(() => {
        // length字段会autorun的时候触发
        // 因为obs.aa.bb的length字段发生变化了
         // 触发2次
        console.log('array2', obs.aa.bb.length)
    })

    autorun(() => {
        // 即使原来的不存在，也能触发
        // 这里会触发2次，因为的确obs.aa.bb[1]的值变了
        // 触发2次
        console.log('array3', obs.aa.bb[1])
    })

    console.log('testObservable3 set data')
    obs.aa.bb.push('cc')
}

// testObservable3();


function testObservable4() {
    const obs = observable({
        aa: {
            bb: ['a'],
        },
        cc: '78',
    })
    autorun(() => {
        // 倾听其他字段的话当然也不会触发
        console.log('other', obs.cc)
    })

    console.log('testObservable4 set data')
    obs.aa.bb.push('cc')
}

// testObservable4();

// 浅倾听shadow，只能处理表面一层的数据
function testObservableShadow() {
    const obs = observable.shallow({
        aa: {
            bb: 'a',
        },
        cc: {
            dd: 'a',
        },
    })

    autorun(() => {
        // 这里只会触发1次，因为是浅倾听set操作
        console.log('shadow1', obs.aa.bb)
    })

    console.log('testObservableShadow set data1')
    obs.aa.bb = '123'

    autorun(() => {
        // 这里会触发2次，aa属于浅倾听的范围
        console.log('shadow2', obs.cc)
    })

    console.log('testObservableShadow set data2')
    obs.cc = { dd: 'c' }
}

// testObservableShadow();

/**
 可以看到触发的规则为：

  1. number与string的基础类型，值比较发生变化了会触发
  2. object与array的复合类型，引用发生变化了会触发，object的字段添减不会触发，array的push和pop也不会触发
  3.array.length，它属于字段的基础类型变化，所以也会触发
  4. object与array类型，对于自己引用整个变化的时候，它也会触发子字段的触发
  5. 浅倾听shadow，只能处理表面一层的数据
 */