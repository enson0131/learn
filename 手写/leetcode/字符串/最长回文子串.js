/**
 *  https://leetcode.cn/problems/longest-palindromic-substring/description/
    给你一个字符串 s，找到 s 中最长的回文子串。

    如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。
    示例 1：

    输入：s = "babad"
    输出："bab"
    解释："aba" 同样是符合题意的答案。
    示例 2：

    输入：s = "cbbd"
    输出："bb"
 */

/**
 * 最值问题采用动态规划，拆解成一个个的子问题的最优解
 *
 * 状态转移方程为 f(n) = Math.max(f(n - 1), f(n))
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  const len = s.length;
  let res = "";
  const cache = {};

  // 判断是否是回文字符串
  const _check = (str) => {
    if (!str) return false;
    let left = 0;
    let right = str.length - 1;

    while (left <= right) {
      if (str[left] !== str[right]) {
        cache[str] = false;
        return false;
      }
      left++;
      right--;
    }

    cache[str] = true;
    return true;
  };

  for (let i = 0; i <= len; i++) {
    for (let j = 0; j < i; j++) {
      const value = s.slice(j, i);
      const flag = cache[value] ?? _check(value);
      if (flag) {
        const cur = value.length;
        const max = res.length;
        if (cur > max) {
          res = value;
        }
      }
    }
  }

  return res;
};

console.log(
  longestPalindrome(
    "zudfweormatjycujjirzjpyrmaxurectxrtqedmmgergwdvjmjtstdhcihacqnothgttgqfywcpgnuvwglvfiuxteopoyizgehkwuvvkqxbnufkcbodlhdmbqyghkojrgokpwdhtdrwmvdegwycecrgjvuexlguayzcammupgeskrvpthrmwqaqsdcgycdupykppiyhwzwcplivjnnvwhqkkxildtyjltklcokcrgqnnwzzeuqioyahqpuskkpbxhvzvqyhlegmoviogzwuiqahiouhnecjwysmtarjjdjqdrkljawzasriouuiqkcwwqsxifbndjmyprdozhwaoibpqrthpcjphgsfbeqrqqoqiqqdicvybzxhklehzzapbvcyleljawowluqgxxwlrymzojshlwkmzwpixgfjljkmwdtjeabgyrpbqyyykmoaqdambpkyyvukalbrzoyoufjqeftniddsfqnilxlplselqatdgjziphvrbokofvuerpsvqmzakbyzxtxvyanvjpfyvyiivqusfrsufjanmfibgrkwtiuoykiavpbqeyfsuteuxxjiyxvlvgmehycdvxdorpepmsinvmyzeqeiikajopqedyopirmhymozernxzaueljjrhcsofwyddkpnvcvzixdjknikyhzmstvbducjcoyoeoaqruuewclzqqqxzpgykrkygxnmlsrjudoaejxkipkgmcoqtxhelvsizgdwdyjwuumazxfstoaxeqqxoqezakdqjwpkrbldpcbbxexquqrznavcrprnydufsidakvrpuzgfisdxreldbqfizngtrilnbqboxwmwienlkmmiuifrvytukcqcpeqdwwucymgvyrektsnfijdcdoawbcwkkjkqwzffnuqituihjaklvthulmcjrhqcyzvekzqlxgddjoir"
  )
);

/**
 * 建立 dp[i, j] 标识字符串 s 从索引 i 到 j 是否是回文串
 *
 * 要求 dp[i, j] 是否是回文串有一下俩种情况
 * 1. s[i] === s[j] && dp[i + 1][j - 1] === true
 * 2. s[i] === s[j] && j - i <= 2 // 即中间间隔只有一个或者零个字符串
 *
 * 因此状态转移方程为
 * dp[i][j] = s[i] === s[j] && (j - i <= 2 || dp[i + 1][j - 1])
 * @param {*} s
 */
function longestPalindrome2(s) {
  if (s.length <= 1) return s;
  const len = s.length;
  const dp = Array.from(new Array(len), () => new Array(len).fill(0)); //new Array(len).fill(() => new Array(len).fill(false));
  let res = ""; // 最长回文
  // 这种遍历方式可以让里面的状态转移方程的结果先得知
  for (let i = len - 1; i >= 0; i--) {
    // 根据状态转移方程得出的，得先知道 i+1 才能知道 i
    for (let j = i; j < len; j++) {
      // 要知道 j 就得先知道 j - 1
      dp[i][j] = s[i] === s[j] && (j - i <= 2 || dp[i + 1][j - 1]);

      if (dp[i][j] && res.length < s.slice(i, j + 1).length) {
        res = s.slice(i, j + 1);
      }
    }
  }

  return res;
}

console.log(`longestPalindrome2 -->`, longestPalindrome2("babad"));
console.log(`longestPalindrome2 -->`, longestPalindrome2("ac"));
console.log(`3`, longestPalindrome2("aacabdkacaa"));
console.log(`4`, longestPalindrome2("abcba"));
