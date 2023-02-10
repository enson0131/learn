/**
 * 
 * 思路: 可以使用动态规划，一个比较复杂的问题不断向前拆解成诺干个子问题
 * 1 例如 [0,1,0,3,2,3], 要求该数组的最长递增子序列，我们可以向前看, 即求 [0, 1, 0, 3, 2]的最长递增子序列
 *   可以得到状态转移方程
 *   f(n) = Math.max(f(n-1) + 1, f(n)) 
 * 
 *   可以使用一个数组初始化 [0,0,0,0,0], 该数组记录原数组下标对应的最长递增子序列个数
 */
var lengthOfLIS = function(nums) {
    
    const len = nums.length;
    const dp = new Array(len).fill(1);
    let max = 1;

    for(let i = 1; i < len; i++) {
        for(let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[j] + 1, dp[i]);
            }
        }
        max = Math.max(dp[i], max)
    }

    return max;
};



// 二刷
/**
 * 借鉴 Vue3 的算法思路 (贪心 + 二分查找)
 * 1 通过 result 数组去维护一个递增序列
 * 不断的遍历nums
 *     a. 如果值比nums都大, 则直接push
 *     b. 如果值比nums任意一个小, 则通过二分查找的方式找到第一个比它大的值进行替换
 * 2 维护一个数组p, 每次push/替换时，记录当前值前面的最小值
    3 从后往前遍历数组result，根据p数组记录的值即上一个值的最小值, 不断更新result

  案例
  - [0,1,0,3,2,3]
  result: 0,1,2,3
       p:   0,1,2
  更新后的result: 3 -> 2 -> 1 -> 0 ===> 0, 1, 2, 3
 * 
 *  
 * @param {*} nums 
 */
var lengthOfLIS = function(nums) {

  const p = nums.slice(); // 记录每次插入之前的最小值
  const result = [nums[0]];
  const len = nums.length;
  for(let i = 0; i < len; i++) {
    const numsI = nums[i];
    const j = result[result.length - 1]; // 获取当前result的最大值

    if (numsI > j) { // 如果当前值比j还大, 则直接push
      p[numsI] = j; // 记录当前值前面的最小值
      result.push(numsI);
      continue;
    }

    // 如果当前值比j小, 则通过二分查找
    let start = 0;
    let end = result.length - 1;
    let middle;

    while(start < end) {
      middle = (start + end) >> 1; // 求向下取整获取 等价于Math.floor((start + end) / 2);
      if (result[middle] < numsI) {
        start = middle + 1;
      } else {
        end = middle;
      }
    }

    if (result[start] > numsI) {
      if (start > 0) {
        p[numsI] = result[start - 1];
      }
      result[start] = numsI;
    }
  }


  let len1 = result.length;
  let value = result[len1 - 1];
  while(len1) {
    result[len1 - 1] = value;
    value = p[value];
    len1--;
  }
  
  return result.length;
}
console.log(`1`, lengthOfLIS([0,1,0,3,2,3]))

/**
 * 思路:
 * 通过动态规划方式
 * 
 * 例如 [0,1,0,3,2,3]
 * 给数组添加权重 dp = [1, 1, 1, 1, 1, 1]
 * 
 * 1 如果当前的值比前面序列的值都大，则权重为前面的值加1 f(n) = f(n-1) + 1
 * 2 如果当前的值比前面的序列某一个小, 则当前的权重为上一个序列的权重 f(n) = f(n-1)
 * @param {*} nums 
 */
var lengthOfLIS = function(nums) {
  const len = nums.length;
  const dp = new Array(len).fill(1);
  let max = 0;
  for(let i = 0; i < len; i++) {
    for(let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    if (dp[i] > max) max = dp[i]
  }

  return max;
}

console.log(lengthOfLIS([0,1,0,3,2,3]))

