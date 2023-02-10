/**
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 * 
  示例 1:
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
  解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
       请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
  示例 4:

  输入: s = ""
  输出: 0
 */

/*
  思路:
  通过curLen去记录当前最长的字符串长度
  通过curValue记录当前最长的字符串

  通过循环去遍历字符串,
  如果没有重复子串更新curValue、curLen
  如果有重复子串则通过slice方法更新子串
**/
var lengthOfLongestSubstring = function(s) {
  if (!s) return 0;
  let res = 1;
  let curLen = 1;
  let curValue = s[0];
  let len = s.length;
  for(let i = 1; i < len; i++) {
    const curStr = s[i];
    const index = curValue.indexOf(curStr);
    if (index < 0) { // 没有重复子串
      curValue = curValue + curStr;
      curLen = curValue.length;
      res = Math.max(res, curLen);
    } else {
      curValue = curValue.slice(index + 1) + curStr;
      curLen = curValue.length;
    }
  }
  return res;
};

console.log('lengthOfLongestSubstring', lengthOfLongestSubstring('pwwkew'));

