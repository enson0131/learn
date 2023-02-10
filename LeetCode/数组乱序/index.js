// 数组乱序
const arr = [];
for(let i = 0; i < 54; i++) {
    arr.push(i);
}

/**
 * 方法1: 
 * 通过 Math.random() 获取 [0, 53] 的随机数 push 到数组中
 * 
 * 这种洗牌方法要200+次计算
 */
function sort1 () {
    let count = 0;
    const target = [];
    while(target.length < arr.length) {
        const number = getRandom();
        count++;
        if (!target.includes(number)) {
            target.push(number);
        }
    }
    return [count, target];
}

// Math.random() 会生成 [0, 1) 的随机数
function getRandom() {
    return Math.floor(Math.random() * 54);
}

// console.log(sort1())


/**
 * 方法2: 
 * 印度阿三洗牌法
 * 1 将牌分成俩部分，不断的交换他们的位置，洗个54次就能把牌洗乱
 * 
 * 54张牌 有 54！（54的阶层）个排列组合方式
 * 
 * 第1次洗牌，随机的结果有 n 种
 * 第2次洗牌，随机结果有 n * (n - 1) 种
 * ...
 * 第54次洗牌，随机结果有 54！种
 * 
 * 因此需要洗牌54次，随机结果才能完全覆盖所有的排列组合方式，也就是要洗54次牌才能将牌洗乱。
 * 
 * 印度阿三洗牌只需要洗54次
 */
function sort2 () {
    let target = arr.slice();
    for(let i = 0; i < 54; i++) {
        let random1 = getRandom();
        let random2 = getRandom();

        // 确保 random1 是最小的
        if (random1 > random2) {
            [random1, random2] = [random2, random1];
        }
        
        target = target.slice(0, random1).concat(target.slice(random2)).concat(target.slice(random1, random2));
    }
    return target
}

// console.log('sort2: ', sort2());


/**
 * 方法3:  Fisher-Yates 洗牌算法
 * 
 * 思路:
 * 1 随机生成0-53的值，将其与数组最后 1 位对换
 * 2 随机生成0-52的值，将其与数组的倒数第 2 位对换
 * 
 * 这样时间复杂度为 O(n), 并且每张牌出现的概率为 1/54
 */
function sort3 () {
    const count = arr.length;
    const target = arr.slice();

    for(let i = 0; i < count; i++) {
        const random = Math.floor(Math.random() * (count - i));
        const end = count - i - 1; // 最后一项
        const cacheValue = target[random];
        target[random] = target[end];
        target[end] = cacheValue;
    }

    return target;
}

console.log('sort3:', sort3());

