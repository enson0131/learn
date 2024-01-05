/**
 * https://leetcode.cn/problems/first-missing-positive/
 * 思路1:
 *    俩个 for 循环
 *    第一个 for 循环将所有的整数存储到 Map 中
 *    第二个 for 循环从 1 开始遍历，如果当前值不在Map中，说明是缺失的第一个正整数
 *
 * 思路2:
 *    将数组的值放到对应的下标中，比如 1 放到下标 0 中，2 放到下标 1 中
 *    如果值不在对应的下标中时，n + 1 则是缺失的第一个正整数
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive1 = function (nums) {
  const cacheMap = new Map();
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    cacheMap.set(nums[i], nums[i]);
  }

  for (let i = 1; i <= n; i++) {
    if (!cacheMap.has(i)) {
      return i;
    }
  }

  return n + 1;
};

var firstMissingPositive2 = function (nums) {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    while (nums[i] > 0 && nums[i] <= n) {
      // 值的范围 [1, n]; 正整数范围 [1, n]
      // 注意⚠️: 这里不能使用 [0, n -1] 判断，数组第一个值如果是 0 或者 大于 n - 1 的数都会有问题，会一直存放在 下标 0 中，导致后续不好判断
      const index = nums[i] - 1; // 当前值对应的数组下标
      if (nums[i] === nums[index]) break; // 如果值和下标已经相等，则不需要交换，避免死循环
      [nums[i], nums[index]] = [nums[index], nums[i]];
    }
  }

  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }

  return n + 1;
};

const a = firstMissingPositive2([1]);
console.log(`a`, a);
