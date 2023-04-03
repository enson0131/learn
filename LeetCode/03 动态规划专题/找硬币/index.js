/**
 * 给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
    示例1：
    输入: coins = [1, 2, 5], amount = 11
    输出: 3
    解释: 11 = 5 + 5 + 1

    示例2：
    输入: coins = [2], amount = 3
    输出: -1
 */

/**
 * f(n) = f(n - 1) + f(n - 2) + f(n - 5);
 */
const getMinValue = (coins, amount) => {
    const f = [];
    f[0] = 0;
    const _dfs = (value) => {
        const res = [];

        if (typeof f[value] !== 'undefined') return f[value];

        for(let i = 0; i < coins.length; i++) {
            if(value - coins[i] >= 0) {
                const count = _dfs(value - coins[i]);
                count >= 0 && res.push(count);
            }
        }

        if (res.length > 0) {
            f[value] = Math.min(...res) + 1;
        } else {
            f[value] = -1;
        }

        return f[value];
    };

    return _dfs(amount);
};

console.log(`getMinValue===>`, getMinValue([1, 2, 5], 11));


const getMinValue2 = (coins, amount) => {
    const f = [];
    f[0] = 0;

    for(let i = 1; i <=  amount; i++) {
        f[i] = Infinity;
        
        for(let j = 0; j < coins.length; j++) {
            if (i - coins[j] >= 0) {
                f[i] = Math.min(f[i], f[i - coins[j]] + 1)
            }
        }
    }

    return f[amount] === Infinity ? -1 : f[amount];
}

console.log(`getMin ===>`, getMinValue2([1, 2, 5], 11))