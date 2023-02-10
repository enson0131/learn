/**
 * [1, 3, 5, 7, 9]
 * [2, 4, 6, 8, 10]
 *
 * 要求的时间复杂度在O(log(m+n)), 首先会联想到使用二分的做法
 *
 * 实现如果将
 * [1, 3, 5, 7, 9] 切割成 L1: [1, 3, 5] R1: [7, 9]
 * [2, 4, 6, 8, 10] 切割成 L2: [2, 4]   R2: [6, 8, 10]
 * 即当L1 < R1 && L2 < R2 && L1 < R2 && L2 < R1 时, 切割正确
 * 此时中位数就是 (L1/L2的最大值 + R1/R2的最小值) / 2
 * 如果俩个数组之和是一个奇数时, 取R1/R2的最小值
 *
 * 如何寻找切点:
 * 1 切点满足L1 < R1 && L2 < R2 && L1 < R2 && L2 < R1
 * 2 切点满足 L1 + L2的长度为 数组之和 / 2 (求出L1就可以通过作差的方式求出L2了)
 */
const findMedianSortedArrays = function(nums1, nums2) {
    const len1 = nums1.length;
    const len2 = nums2.length;
  
    // 确保nums1是最小的, 对nums1进行切割最简单
    if (len1 > len2) return findMedianSortedArrays(nums2, nums1);
  
    const len = len1 + len2; // 2
    const middleLen = Math.floor(len / 2); // 1
  
    let slice1 = 0; // 第一个数组的切点(也是右数组的第一个子节点)
    let slice2 = 0; // 第二个数组的切点(也是右数组的第一个子节点)
    // 初始化切点在nums1.length
    let slice1L = 0; // 第一个切点数组的左端点
    let slice1R = len1; // 第一个切点数组的右端点
  
    while (slice1 <= len1) {
      // 二分更新slice1
      slice1 = Math.floor((slice1R - slice1L) / 2) + slice1L; // 0
  
      // 更新slice2
      slice2 = middleLen - slice1; // 1
  
      // 获取L1/R1/L2/R2
      const L1 = slice1 - 1 < 0 ? -Infinity : nums1[slice1 - 1];
      const R1 = slice1 >= len1 ? Infinity : nums1[slice1];
      const L2 = slice2 - 1 < 0 ? -Infinity : nums2[slice2 - 1];
      const R2 = slice2 >= len2 ? Infinity : nums2[slice2];
  
      // 判断 L1 < R2 && L2 < R1 (L1 < R1 && L2 < R2 这个是必然的)
      if (L1 > R2) {
        // 切多了
        slice1R = slice1 - 1;
      } else if (L2 > R1) {
        // 切少了
        slice1L = slice1 + 1;
      } else {
        // 正确的切断
        if (len % 2 !== 0) {
          // 个数是奇数
          return Math.min(R1, R2);
        } else {
          // 偶数
          const L = Math.max(L1, L2);
          const R = Math.min(R1, R2);
          return (L + R) / 2;
        }
      }
    }
  
    return -1;
};

console.log(findMedianSortedArrays([0], [1]))
  