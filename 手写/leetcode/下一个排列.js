/**
 * 思考
 * 求下一个排列，就是求下一个比当前排列 “大一点” 的排列
 *
 * 如何求下一个 “大一点” 的排列？ （从右开始查找）
 *    - 1 找到第一个比右邻居小的数，记录下标 povit
 *    - 2 获取 povit 的值，从右边找到第一个比 povit 大的数，互换位置
 *    - 3 对 povit 右边的数进行升序排序
 * 15234
 * 15324
 * @param {*} nums
 */
const nextPermutation = (nums) => {
  let povit = nums.length - 2; // 寻找第一个比右邻居小的数

  while (povit >= 0 && nums[povit] >= nums[povit + 1]) {
    povit--;
  }

  if (povit === -1) {
    // 说明是降序排列
    return nums.reverse();
  }

  console.log(`povit--->`, povit);

  // 从右边找到第一个比 povit 大的数
  if (povit >= 0) {
    let j = nums.length - 1;
    while (j >= 0) {
      if (nums[j] > nums[povit]) {
        [nums[j], nums[povit]] = [nums[povit], nums[j]]; // 互换位置
      }
      j--;
    }
  }

  // 右边升序排序
  const right = nums.slice(povit + 1).sort((a, b) => a - b); // 升序排序
  console.log(`right-->`, right);
  nums.splice(povit + 1, right.length, ...right);
  return nums;
};

console.log(nextPermutation([1, 5, 1]));
