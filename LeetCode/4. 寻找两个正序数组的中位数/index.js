var findMedianSortedArrays = function(nums1, nums2) {
    // 合并俩个数组
    const merge = (nums1, nums2) => {
      const arr = [];
      const len1 = nums1.length;
      const len2 = nums2.length;
      let i = 0;
      let j = 0;
      while (i < len1 && j < len2) {
        const value1 = nums1[i];
        const value2 = nums2[j];
        if (value1 < value2) {
          i++;
          arr.push(value1);
        } else {
          j++;
          arr.push(value2);
        }
      }
  
      if (i < len1) {
        arr.push(...nums1.slice(i));
      } else {
        arr.push(...nums2.slice(j));
      }
  
      return arr;
    };
  
    const arr = merge(nums1, nums2);
    const len = arr.length;
    const middle = Math.floor(len / 2);
    if (len % 2 !== 0) {
      // 奇数
      return arr[middle];
    } else {
      // 偶数
      return (arr[middle] + arr[middle - 1]) / 2;
    }
  }