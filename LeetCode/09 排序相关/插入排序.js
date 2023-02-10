var insertSort = function (nums) {
        
    for(let i = 1; i < nums.length; i++) {
        const povit = nums[i];
        let j = i;
        while(j > 0 && povit < nums[j - 1]) {
            nums[j] = nums[j - 1];
            j--;
        }
        nums[j] = povit;
    }

    return nums;
}

console.log(`insertSort`, insertSort([5,3,2,1,5,6,7,9]))