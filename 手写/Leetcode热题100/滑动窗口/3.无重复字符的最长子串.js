/**
给定一个字符串 s ，请你找出其中不含有重复字符的 最长 
子串
 的长度。

 

示例 1:

输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 

提示：

0 <= s.length <= 5 * 104
s 由英文字母、数字、符号和空格组成
 */

/**
 * 思路:
 * 因为最长子串涉及 “连续”，因此可以使用滑动窗口的思路去实现
 * 1. 通过一个 curStr 记录当前的没有重复的子串
 * 2. 循环遍历字符串
 * 3. 如果字符不重复，则 curStr = curStr + s[i], 并更新 res 值
 * 4. 如果字符重复存在，则当前没有重复的子串是 curStr = curStr.slice(重复值下标 + 1) + s[i]; (关键), 并更新 res 值
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  if (!s) return 0;
  const length = s.length;
  let res = 1;
  let curStr = s[0];

  for (let i = 1; i < length; i++) {
    const value = s[i];
    const index = curStr.indexOf(value);

    if (index <= -1) {
      // 字符不存在
      curStr = curStr + value;
    } else {
      curStr = curStr.slice(index + 1) + value;
    }

    res = Math.max(res, curStr.length);
  }

  return res;
};
