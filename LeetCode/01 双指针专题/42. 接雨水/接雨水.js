/**
 * @description
 * 思路: 左右边界求区域内容用双指针
 * 1 设置双指针left、right,
 * 2 left指针从左往右遍历，right指针从右往左遍历
 * 3 通过maxLeft来记录左卡槽，通过maxRight记录右卡槽（最大值即卡槽）
 * 4 通过作差计算出积水面积
 *
 * 求面积:
 *   1 最大面积值 - 差值 等于剩余面积
 *   2 面积拆解
 * @export
 */
 export function getAppUtils(arr) {
  let res = 0;
  let left = 0;
  let right = arr.length - 1;
  let leftMax = 0;
  let rightMax = 0;

  while (left < right) {
    leftMax = Math.max(leftMax, arr[left]);
    rightMax = Math.max(rightMax, arr[right]);

    if (leftMax < rightMax) {
      res = res + leftMax - arr[left];
      left++;
    } else {
      res = res + rightMax - arr[right];
      right--;
    }
  }

  return res;
}


/**
* 思路
* 使用首尾双指针 left、right
* 1 通过currentMaxValue或者双指针区域内能存放的最大雨水数量
* 2 left左移、right右移
*  - 如果leftValue、rightValue没有currentMaxValue大，继续使用currentMaxValue作差, 如果为正值，指针移动
*  - 如果leftValue、rightValue都比currentMaxValue大，重新计算出currentMaxValue, 最小值对应的指针移动
* @param {number[]} height
* @return {number}
*/
var trap = function(height) {
 let left = 0;
 let right = height.length - 1;
 let currentMaxValue = 0; // 当前能存储的最大水量
 let res = 0;

 while(left < right) {
  const leftValue = height[left];
  const rightValue = height[right];
  
  const minValue = Math.min(leftValue, rightValue);

  if (minValue >= currentMaxValue) {
    currentMaxValue = minValue;
    if (leftValue > rightValue) {
      right--;
    } else {
      left++;
    }
  } else {
    const value1 = currentMaxValue - leftValue;
    const value2 = currentMaxValue - rightValue;
    if (value1 > 0) {
      res += value1;
      left++;
    }

    if (value2 > 0) {
      res += value2;
      right--;
    }
  }
}

return res;
};