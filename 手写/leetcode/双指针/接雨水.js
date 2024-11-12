/**
 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

    输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
    输出：6
    解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 
    示例 2：

    输入：height = [4,2,0,3,2,5]
    输出：9
*/

/**
 * 思路:
 *   1. 通过双指针的方式，左右指针分别指向数组的两端
 *   2. 取基准值，作为基准容器的最小左/右档板，然后g用基准值减去当前的值，获取该单元格的水量
 *   3. 计算容量
 *      1. 如果左指针和右指针都大于基准值，那么基准值等于左右指针的最小值, 如果是左指针大于右指针，那么左指针向右移动，否则右指针向左移动 （无法形成左右容器挡板）
 *      2. 如果左指针和右指针有一个值小于基准值，形成一个容器，容器的容量等于基准值减去左指针或者右指针的值
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let left = 0;
  let right = height.length - 1;
  let res = 0;
  let povit = 0;

  while (left < right) {
    const leftValue = height[left];
    const rightValue = height[right];

    const minValue = Math.min(leftValue, rightValue);

    if (minValue >= povit) {
      // 最小高度都比基准挡板高度高，需要调整基准挡板
      povit = minValue; // 调整挡板高度

      if (leftValue > rightValue) {
        right--;
      } else {
        left++;
      }
    } else {
      const leftCapacity = povit - leftValue;
      const rightCapacity = povit - rightValue;

      if (leftCapacity > 0) {
        res += leftCapacity;
        left++;
      }

      if (rightCapacity > 0) {
        res += rightCapacity;
        right--;
      }
    }
  }

  return res;
};

console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));
