/**
 * 题目: https://leetcode.cn/problems/search-in-rotated-sorted-array/description/
 *
 * - 思路1
 *   直接通过 findIndex 获取目标值的下标即可，时间复杂度 O(n)
 *
 * - 思路2
 *   因为要求时间复杂度 O(logn)，首先联想到二分查找
 *   因为数组是阶段性有序，可以通过 mid < right 来判断右边是否有序，反之左边有序
 *   如果 mid < right && target < right 说明目标值在右边 [mid + 1, right], 反之在左边 [left, mid - 1]
 *   如果 mid > right && target > left 说明目标值在左边 [left, mid - 1], 反之在右边 [mid + 1, right]
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search1 = function (nums, target) {
  return nums.findIndex((num) => num === target);
};

var search2 = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = (left + right) >> 1; // 取中间值

    if (nums[mid] === target) {
      return mid;
    }

    // 如果中间的值小于右边的值，说明右边是有序的
    // 如果中间值大于右边的值，说明左边是有序的
    if (nums[mid] < nums[right]) {
      // 右边(mid, right]有序
      // 如果目标值不在右边区间，那么就在左边 [left, mid - 1]
      if (nums[mid] < target && nums[right] >= target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    } else {
      // 左边[left, mid)有序
      // 如果目标值不在左边区间，那么就在右边 [mid + 1, right]
      if (nums[mid] > target && nums[left] <= target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
  }

  return -1;
};
