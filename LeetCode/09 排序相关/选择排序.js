const selectSort = function(nums) {
    let len = nums.length;
    for(let i = 0; i < len - 1; i++) {
        let minIndex = i;
        for(let j = i + 1; j < len; j++) {
            if (nums[minIndex] > nums[j]) {
                minIndex = j;
            }
        }
        
        if (minIndex !== i) {
            [nums[i], nums[minIndex]] = [nums[minIndex], nums[i]];
        }
    }

    return nums;
}

console.log(`selectSort`, selectSort([5,3,2,1,5,6,7,9]))