var search = function (nums, key) {
    let arr = nums.sort((a, b) => a - b); // 从小到大
    const _findIndex = (left, right) => {
        const middle = Math.floor((left + right) / 2);
        const povit = arr[middle];
        if (povit === key) return middle;

        if (left >= right) return -1;

        if (key > povit) return _findIndex(middle + 1, right);
        if (key < povit) return _findIndex(left, middle - 1);
    }
    return  _findIndex(0, arr.length - 1);
}

console.log(`search`, search([1, 2, 3, 5, 5, 6, 7, 9], 9))