const arr = [];

for(let i = 0; i < 54; i++) {
    arr.push(i);
}


/**
 * 思路:
 * 1 随机在[0, 53]区间内生成一个下标，下标对应的值和数组最后一个数对换
 * 2 下一次随机在[0, 52]区间内生成一个下标, 下标对应的值和数组倒数第二个数对换
 * 
 * 随机数组每个值的概率都为 1/n
 * 公式如：f(1) = 1/54;
 *        f(2) = 53/54 * 1 * 53 = 1/54;
 *        f(3) = 53/54 * 52/53 * 1/52 = 1/54;
 */
function fn() {
    const target = arr.slice();
    const len = target.length;
    for(let i = 0; i < 54; i++) {
        const randomIndex = getRandomIndex(i);
        [target[randomIndex], target[len - i - 1]] = [target[len - i - 1], target[randomIndex]]
    }
    return target;
}


function getRandomIndex(number) {
    return Math.floor(Math.random() * (54 - number)); // [0 54)
}


console.log(fn());