var merge = function (leftArr, rightArr) {
    let leftIndex = 0;
    let rightIndex = 0;
    const leftLen = leftArr.length;
    const rightLen = rightArr.length;
    const res = [];
    while(leftIndex < leftLen && rightIndex < rightLen) {
        const leftValue = leftArr[leftIndex];
        const rightValue = rightArr[rightIndex];

        if (leftValue <= rightValue) {
            res.push(leftValue);
            leftIndex++;
        } else {
            res.push(rightValue);
            rightIndex++;
        }
    }

    if (leftIndex < leftLen) {
        res.push(...leftArr.slice(leftIndex));
    } else {
        res.push(...rightArr.slice(rightIndex));
    }

    return res;
}

var mergeSort = function(nums) {
    if (nums.length <= 1) return nums;
    
    const middle = Math.floor(nums.length / 2);
    const left = mergeSort(nums.slice(0, middle));
    const right = mergeSort(nums.slice(middle));
    return merge(left, right);
}

console.log(mergeSort([5,3,2,1,5,6,7,9]))