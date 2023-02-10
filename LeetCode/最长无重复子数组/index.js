/**
 * 
 思想: 滑动窗口
 
 思路: 
 1 对arr进行遍历, 用max存储最大无重复子数组的长度
 2 使用map对遍历过得数进行存储
 3 如果遇到重复的值，将左边的值删除，拓展右边的
 4 计算max值
 * @param arr int整型一维数组 the array
 * @return int整型
 */
 function maxLength( arr ) {
  let map = new Map();
  let max = 0;
  const len = arr.length;  
  for (let i = 0; i < len; i++) {
      if (map.has(arr[i])) {
          for(let key of map.keys()) {
              map.delete(key);
              if (key === arr[i]) {
                  break;
              }
          }
      }
      
      map.set(arr[i], true);
      max = Math.max(map.size, max);
  }
     
  return max;
  
}
module.exports = {
    maxLength : maxLength
};