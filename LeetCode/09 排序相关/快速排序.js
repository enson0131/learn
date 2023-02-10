var quickSort = function(nums) {
    if (nums.length <= 1) return nums;
    
    const povit = nums.shift();
    const left = nums.filter(value => value < povit);
    const right = nums.filter(value => value >= povit);
    return [...quickSort(left), povit, ...quickSort(right)]
}

console.log(`quickSort`, quickSort([5,3,2,1,5,6,7,9]))