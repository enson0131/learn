/**
 * https://leetcode.cn/problems/container-with-most-water/description/
 * 
   给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。

   找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。

   返回容器可以储存的最大水量。

   说明：你不能倾斜容器。

   输入：[1,8,6,2,5,4,8,3,7]
   输出：49 
   解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。

   示例 2：
   输入：height = [1,1]
   输出：1
 */

/**
 * 暴力破解
 * 使用 cache 记录每一个柱子的最大值
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  const len = height.length;
  let cache = [];

  for (let i = 0; i < len; i++) {
    const curValue = height[i];
    for (let j = 0; j < len; j++) {
      const nextValue = height[j];
      cache[j] = Math.max(
        cache[j] || 0,
        Math.min(nextValue, curValue) * (j - i)
      );
    }
  }

  return Math.max(...cache);
};
console.log(`maxArea--->`, maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));

/**
 * 使用双指针的方式
 * https://leetcode.cn/problems/container-with-most-water/solutions/94102/on-shuang-zhi-zhen-jie-fa-li-jie-zheng-que-xing-tu/
 * 压缩空间，减少时间复杂度
 * 如何计算最大水量（面积） 👉 f(i, j) = Math.min(i, j) * (indexI - indexJ)
 * @param {*} height
 * @returns
 */
var maxArea2 = function (height) {
  let left = 0;
  let right = height.length - 1;
  let res = 0;

  while (left < right) {
    const valueLeft = height[left];
    const valueRight = height[right];
    const curRes = Math.min(valueLeft, valueRight) * (right - left);

    res = Math.max(res, curRes);
    console.log(`--->`, curRes);

    if (valueLeft <= valueRight) {
      left++;
    } else {
      right--;
    }

    res = Math.max(res, curRes);
  }

  return res;
};

console.log(`2 maxArea--->`, maxArea2([1, 8, 6, 2, 5, 4, 8, 3, 7]));
