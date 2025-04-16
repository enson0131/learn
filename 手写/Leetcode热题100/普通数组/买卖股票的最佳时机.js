/**
给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。

你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。

返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。

 

示例 1：

输入：[7,1,5,3,6,4]
输出：5
解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
示例 2：

输入：prices = [7,6,4,3,1]
输出：0
解释：在这种情况下, 没有交易完成, 所以最大利润为 0。
 

提示：

1 <= prices.length <= 105
0 <= prices[i] <= 104
 */

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  const len = prices.length;
  let max = 0;
  for (let i = 0; i < len; i++) {
    const povit = prices[i];
    for (let j = i + 1; j < len; j++) {
      const current = prices[j] - povit;
      max = Math.max(current, max);
    }
  }

  return max;
};

// 暴力破解有很多冗余的计算，例如 [7,1,5,3,6,4] 中，如果是第 2 天买入，只需要计算第 5 天的即可

var maxProfit2 = function (prices) {
  const len = prices.length;
  let max = 0;
  for (let i = 0; i < len; i++) {
    const povit = prices[i];
    const maxCash = Math.max(...prices.slice(i + 1)); // 这里还是会有一个循环

    max = Math.max(max, maxCash - povit);
  }

  return max;
};

/**
 思路: 类似于贪心算法
 1 用一个变量 minValue 表示最低成本, 用一个变量 price 表示利润
 2 对数组进行遍历
   - 当值 < minValue 时, 更新minValue
   - 当值 > minValue 时, 作差, 如果差值大于price, 更新price
 3 最后返回 price
 
 也可以理解为求 n 天前的最大利润 = max(n-1天前的最大利润即 price，n天的最大利润)

 而 n 天最大利润等于 n 天的值 - n 天前的最小值
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit3 = function (prices) {
  let minValue = Infinity;
  let price = 0;

  for (let i = 0; i < prices.length; i++) {
    const curValue = prices[i];
    if (minValue > curValue) {
      minValue = curValue;
    } else {
      price = Math.max(price, curValue - minValue);
    }
  }

  return price;
};
