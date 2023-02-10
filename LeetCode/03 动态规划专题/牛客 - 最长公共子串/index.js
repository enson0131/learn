
/**
  给定两个字符串str1和str2,输出两个字符串的最长公共子串
  题目保证str1和str2的最长公共子串存在且唯一。
  
 * @param {*} str1 
 * @param {*} str2 
 */
/*
给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。

一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。

输入：
    "1AB2345CD","12345EF"
  返回值：
    "12345"
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

  这个没有看别人的解题，自己独立写出来的，因为之前在书里看过相关的例子，
  但是不太一样，书里的例子只求最长的长度，所以在数组里存数字就行，一开始没看仔细，发现不对，想了一下，
  就是试着直接存字符，初始化首行首列为“”，然后比较字符，
  如果相等，当前位置赋值为[i-1][j-1]+当前字符，否则就从[i-1][j]或[i][j-1]取最长的。
  最后结果就在右下角。后来看别人的解题，很多还是存数字，然后再根据数字取字符，那样就麻烦多了！

     ""  a  b  c  d  e
  "" "" "" "" "" "" ""
  a  ""  a  a  a  a  a
  c  ""  a  a ac ac ac
  e  ""  a  a ac ac ace

 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
  
    const len1 = text1.length;
    const len2 = text2.length;
    const dp = new Array(len1 + 1).fill("").map(() => new Array(len2 + 1).fill(""));
  
    for(let j = 1; j <= len2; j++) { // 遍历text2
      const value2 = text2[j - 1];
      for(let i = 1; i <= len1; i++) { // 遍历text1
        const value1 = text1[i - 1];
        if (value1 === value2) {
          dp[i][j] = dp[i - 1][j - 1] + value1;
        } else {
          if (dp[i - 1][j].length > dp[i][j - 1].length) {
            dp[i][j] = dp[i - 1][j]
          } else {
            dp[i][j] = dp[i][j - 1]
          }
        }
      }
    }
    return dp[len1][len2]
  };
  
  
  console.log(longestCommonSubsequence('1AB2345CD', '12345EF'))