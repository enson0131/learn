
/**
 * Object.is 基本上和 === 没有什么太大的不同
 * 特殊场景
 * 1 +0/-0 判断为 false
 * 2 NaN/NaN 判断为true
 * @param {*} check1 
 * @param {*} check2 
 */
function ObjectIs(check1, check2) {
    if (check1 === check2) {
        // 只要做+0/-0的判断即可
        return check1 !== 0 || 1/check1 === 1/check2
    }

    return check1 !== check1 && check2 !== check2; // 判断 NaN
}

console.log(ObjectIs(0, 0));
console.log(ObjectIs(6, 6));
console.log(ObjectIs(+0, -0), `+0 === -0 => ${+0 === -0}`);
console.log(ObjectIs(NaN, NaN), `NaN === NaN => ${NaN === NaN}`);

console.log(+0 === -0); // true



