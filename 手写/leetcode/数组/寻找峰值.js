/**
    https://leetcode.cn/problems/find-peak-element/description/
    峰值元素是指其值严格大于左右相邻值的元素。

    给你一个整数数组 nums，找到峰值元素并返回其索引。数组可能包含多个峰值，在这种情况下，返回 任何一个峰值 所在位置即可。

    你可以假设 nums[-1] = nums[n] = -∞ 。

    你必须实现时间复杂度为 O(log n) 的算法来解决此问题。

    示例 1：
    输入：nums = [1,2,3,1]
    输出：2
    解释：3 是峰值元素，你的函数应该返回其索引 2。

    示例 2：
    输入：nums = [1,2,1,3,5,6,4]
    输出：1 或 5 
    解释：你的函数可以返回索引 1，其峰值元素为 2；
        或者返回索引 5， 其峰值元素为 6。
 */

/**
 * 因为需要时间复杂度为 O(log n)，可以考虑使用双指针对比法获取最大值
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {
  const len = nums.length;

  if (len <= 0) return len;

  let left = 0;
  let right = len - 1;
  let maxIndex = 0;

  while (left < right) {
    if (nums[left] >= nums[right]) {
      maxIndex = left;
      right--;
    } else {
      maxIndex = right;
      left++;
    }
  }

  return maxIndex;
};

console.log(
  findPeakElement([1, 2, 3, 1]),
  findPeakElement([1, 2, 1, 3, 5, 6, 4])
);

/**
 * 通过二分查找获取最大值
 * @param {*} nums
 * @returns
 */
var findPeakElement2 = function (nums) {
  const len = nums.length;

  if (len <= 0) return len;

  const findMax = (left, right) => {
    if (left >= right) return left;

    const middle = (left + right) >> 1;

    // 这里需要留意，左 middle ，右 middle + 1
    const leftMax = findMax(left, middle);
    const rightMax = findMax(middle + 1, right);

    return nums[leftMax] >= nums[rightMax] ? leftMax : rightMax;
  };

  return findMax(0, len - 1);
};

console.log(
  findPeakElement2([1, 2, 3, 1]),
  findPeakElement2([1, 2, 1, 3, 5, 6, 4])
);
