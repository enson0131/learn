/**
 暴力解题
 思路:
 1 遍历选取一个基准值povit,
 2 不断向右迭代，获取最大的基准值，用num来存储
 3 比较num与count的大小，取最大
 * @param {string} s
 * @return {number}
 */
 var maxPower = function(s) {
  if (!s) return 0;
  let count = 1;
  for(let i = 0; i <= s.length - 2; i++) {
    const povit = s[i];
    let num = 1;
    for(let j = i + 1; j <= s.length - 1; j++) {
      if (povit === s[j]) {
        num++;
        if (num > count) {
          count = num;
        }
      } else {
        i = j - 1; // 跳步, 使时间复杂度降低到O(n)
        break;
      }
    }
  }
  return count;
};