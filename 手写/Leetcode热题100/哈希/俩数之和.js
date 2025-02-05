/**
给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值 target 的那两个整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。

你可以按任意顺序返回答案。

示例 1：
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
示例 2：

输入：nums = [3,2,4], target = 6
输出：[1,2]
示例 3：

输入：nums = [3,3], target = 6
输出：[0,1]

*/

/**
 * 思路
 *   1 通过一个 map 数组存储对应的值和下标
 *   2 遍历数组，如果 map 中存在 target - nums[i] 的值，则返回对应的值和下标
 *   3 如果 map 中不存在 target - nums[i] 的值，则将 nums[i] 和 i 存储到 map 中
 *   4 如果遍历完数组都没有找到对应的值和下标，则返回空数组
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const cacheMap = new Map();
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    const currentValue = nums[i];
    const targetValue = target - currentValue;

    if (cacheMap.has(targetValue)) {
      return [cacheMap.get(targetValue), i];
    }

    cacheMap.set(currentValue, i);
  }

  return [];
};
