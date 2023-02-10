var bubbleSort = function (nums) {
    const len = nums.length;
    for(let i = 0; i < len; i++) {
        for(let j = 0; j < len - 1 - i; j++) {
            if (nums[j] > nums[j + 1]) {
                [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
            }
        }
    }
    return nums;
}


console.log(`bubbleSort`, bubbleSort([5,3,2,1,5,6,7,9]))