function quickSort (nums, k) {
  const dfs = (nums, targetIndex) => {
    const middle = Math.floor(nums.length / 2); // 获取数组中间的值
    const middleValue = nums[middle]; 
    nums.splice(middle, 1)// 去除数组中间值，并修改原数组
    const left = []; // 存放比 middleValue 小的值
    const right = []; // 存放比 middleValue 大的值

    for (let i = 0; i < nums.length; i++) {
      if (nums[i] < middleValue) {
        left.push(nums[i])
      } else {
        right.push(nums[i])
      }
    }
    if (left.length === targetIndex) {
      return middleValue;
    } else if (left.length > targetIndex) {
      return dfs(left, targetIndex)
    } else {
      return dfs(right, targetIndex - left.length - 1) // 这里的减1是减去middle的1
    }
  }
  return dfs(nums, nums.length - k)
}

var findKthLargest = function(nums,  k) {
  return quickSort(nums,  k)
}

findKthLargest([3,2,3,1,2,4,5,5,6], 4)