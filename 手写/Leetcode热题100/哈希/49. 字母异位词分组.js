/**
给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。

字母异位词 是由重新排列源单词的所有字母得到的一个新单词。

示例 1:

e a b t n
输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
输出: [["bat"],["nat","tan"],["ate","eat","tea"]]

示例 2:
输入: strs = [""]
输出: [[""]]
示例 3:

输入: strs = ["a"]
输出: [["a"]]
 

提示：
1 <= strs.length <= 104
0 <= strs[i].length <= 100
strs[i] 仅包含小写字母
*/

// 👉 如何判断不规则的字母和数组 - 对字母进行分割 split() ，分割后排序 sort, 最后组合
/**
 * 思路:
 *   1. 循环遍历 strs
 *   2. 判断当前字符串是否存在 map 中
 *   3. 如果存在，则将当前字符串添加到 map 中
 *   4. 如果不存在，则创建一个数组，将当前字符串添加到数组中，并存储到 map 中
 *   5. 最后返回 map 的值
 *
 * 难点: 可以通过 sort 方法，将字符串进行排序，然后进行比较，不同组合的字符床 key 也就一样了
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const cacheMap = new Map();
  const len = strs.length;

  if (len === 1) {
    return [strs];
  }

  for (let i = 0; i < len; i++) {
    const value = strs[i];
    const key = value?.split("")?.sort().join("");
    console.log(`key-->`, value, value?.split(), key);

    if (cacheMap.has(key)) {
      const currentValueArr = cacheMap.get(key);
      currentValueArr.push(value);
      cacheMap.set(key, currentValueArr);
    } else {
      cacheMap.set(key, [value]);
    }
  }

  return Array.from(cacheMap.values());
};

console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
