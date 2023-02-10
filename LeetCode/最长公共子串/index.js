
/**
  给定两个字符串str1和str2,输出两个字符串的最长公共子串
  题目保证str1和str2的最长公共子串存在且唯一。
  输入：
    "1AB2345CD","12345EF"
  返回值：
    "2345"
   0234, 1234
 思路: 
   f(n) = f(n-1)+n[n.length-1];
 * @param {*} str1 
 * @param {*} str2 
 */
function LCS(str1, str2) {
  
}

console.log(LCS(
"2LQ74WK8Ld0x7d8FP8l61pD7Wsz1E9xOMp920hM948eGjL9Kb5KJt80",
"U08U29zzuodz16CBZ8xfpmmn5SKD80smJbK83F2T37JRqYfE76vh6hrE451uFQ100ye9hog1Y52LDk0L52SuD948eGjLz0htzd5YF9J1Y6oI7562z4T2"
))