/**
给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
示例 1：

输入：nums = [100,4,200,1,3,2]
输出：4
解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
示例 2：

输入：nums = [0,3,7,2,5,8,4,6,0,1]
输出：9
 

提示：

0 <= nums.length <= 105
-109 <= nums[i] <= 109

*/

/**
 * 思路1:
 * 1. 对数组进行排序
 * 2. 通过 2层 for 循环找到每一个元素的最长连续序列
 * 3. 优化:
 *    3.1 如果和前一个指针相差1，则跳过
 *    3.2 如果剩余遍历长度小于最大长度则跳过
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  const targetArr = Array.from(new Set(nums)); // 去除重复

  let res = 1; // 这里要从 1 开始，因为 len <= 1 的情况已经去除掉了，1 的话可以避免都是乱序的长数组情况
  targetArr.sort((a, b) => a - b); // 对 nums 进行升序排序
  const len = targetArr.length;

  if (len <= 1) return len;

  for (let i = 0; i < len - 1; i++) {
    let targetRes = 1;

    // 如果和前一个指针相差1，则跳过
    if (i !== 0 && targetArr[i] - targetArr[i - 1] === 1) continue;

    // 如果剩余遍历长度小于最大长度则跳过遍历
    if (len - i <= res) return res;

    for (let j = i + 1; j < len; j++) {
      const current = targetArr[j - 1];
      const next = targetArr[j];
      if (next - current === 1) {
        targetRes++;
        res = Math.max(res, targetRes);
      } else {
        break;
      }
    }
  }

  return res;
};

console.log(longestConsecutive([-1, -2, -3]));
