/*
给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。

一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。

 

示例 1：

输入：text1 = "abcde", text2 = "ace" 
输出：3  
解释：最长公共子序列是 "ace" ，它的长度为 3 。
*/

/**
 思路:
 求俩个text的最长公共子串，可以通过动态规划的形式
 创建一个table的二维数组, 初始值权重为 0
 以 text2 为基准, 遍历text2, 下标为i
 遍历 text1, 下标为 j
 如果 text2[j] 与 text1[i] 相等 那么 table[i][j] 的权重为 table[i - 1][j - 1] + 1
 如果 text2[j] 与 text1[i] 不相等 那么 table[i][j] 的权重为 Math.max(table[i][j - 1], table[i - 1][j])
    0 a b c d e
  0 0 0 0 0 0 0
  a 0 1 1 1 1 1
  c 0 1 1 2 2 2 
  e 0 1 1 1 1 3

 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
  
  const len1 = text1.length;
  const len2 = text2.length;
  const dp = new Array(len1 + 1).fill(0).map(() => new Array(len2 + 1).fill(0));
  for(let j = 1; j <= len2; j++) { // 遍历text2
    const value2 = text2[j - 1];
    for(let i = 1; i <= len1; i++) { // 遍历text1
      const value1 = text1[i - 1];
      if (value1 === value2) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[len1][len2]
};


console.log(longestCommonSubsequence('1A2C3D4B56', 'B1D23A456A'))