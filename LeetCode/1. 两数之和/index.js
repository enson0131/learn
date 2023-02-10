/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
 var twoSum = function(nums, target) {
  for(let i = 0; i < nums.length; i++) {
    const povit = nums[i];
    for(let j = i + 1; j < nums.length; j++) {
      if (povit + nums[j] === target) {
        return [i, j]
      }
    }
  }
};

var twoSum = function(nums, target) {
  const map = new Map();
  for(let i = 0; i < nums.length; i++) {
    const x = target - nums[i];
    if (map.has(x)) {
      return [map.get(x), i]
    }
    map.set(nums[i], i)
  }
}
