/**
 * 题目描述：给定不同面额的硬币 coins 和一个总金额 amount。
 * 编写一个函数来计算可以凑成总金额所需的最少的硬币个数。
 * 如果没有任何一种硬币组合能组成总金额，返回 -1。
 */

/**
    示例1：
    输入: coins = [1, 2, 5], amount = 11
    输出: 3
    解释: 11 = 5 + 5 + 1

    示例2：
    输入: coins = [2], amount = 3
    输出: -1
 */

/**
 * 从顶向下推导出状态转移方程: f(n) = Math.min(f(n-1), f(n-2), f(n-5)) + 1
 * 从底向上编码
 * 符合最优子结构、重叠子问题。
 */
const coinChange = (coins = [], amount = 0) => {
  const f = new Array(amount + 1).fill(Infinity);

  for (const coin of coins) {
    f[coin] = 1;
  }

  f[0] = 0;

  for (let i = 1; i <= amount; i++) {
    let min = Infinity;
    for (const coin of coins) {
      if (i - coin >= 0) {
        min = Math.min(min, f[i - coin] + 1);
      }
    }
    f[i] = min;
  }

  return f[amount] === Infinity ? -1 : f[amount];
};

console.log(coinChange([1, 2, 5], 11)); // 3
console.log(coinChange([2], 3)); // -1
console.log(coinChange([1], 0)); // 0
