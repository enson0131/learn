var partition = function (nums, left, right) {
  console.log('nums', nums, left, right)
  const leftArr = [];
  const rightArr = [];
  const pivot = nums[0];
  for(let i = left + 1; i <= right; i++) {
    if (nums[i] < pivot) {
        leftArr.push(nums[i])
    } else {
        rightArr.push(nums[i]);
    }
  }
  leftArr.push(pivot);
  console.log(leftArr,
    rightArr)
  return {
    leftArr,
    rightArr
  }
  
}

var qSort = function (nums, l, r) {
    if (nums.length <= 1) return nums;
    /**
     * 我们选定一个 pivot 元素，根据它进行 partition
     * partition 找出一个位置：它左边的元素都比pivot小，右边的元素都比pivot大
     * 左边和右边的元素的是未排序的，但 pivotIndex 是确定下来的
    */
    const {
      leftArr,
      rightArr
    } = partition(nums, l, r);
   
    const arr1 = qSort(leftArr, 0, leftArr.length - 1);
    const arr2 = qSort(rightArr, 0, rightArr.length - 1);
    return arr1.concat(arr2);
}

var findKthLargest = function(nums, k) {
    var sortNums = qSort(nums, 0, nums.length-1);
    console.log('sortNums', sortNums);
    return sortNums[nums.length - k];
};



var a = findKthLargest([3,2,1,5,6,4], 2)
console.log(a)