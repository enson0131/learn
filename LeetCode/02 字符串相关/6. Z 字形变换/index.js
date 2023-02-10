/**
将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：

P   A   H   N
A P L S I I G
Y   I   R
之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。
*/

/**
 * 思路：
 * 1 不断的遍历字符串 s
 * 2 创建一个一维数组 res, 下标为 i, 存储遍历的字符串
 * 3 当 i 达到行数 numRows时, 改由 i - flag（步长，题意这里是1） 不断地递减下标存储字符串
 * 4 当 i 到达 0 时, 改由 i + flag（步长，题意这里是1） 不断地递增下标存储字符串
 * 5 直到 s 遍历完成，输出 res
 * @param {string} s - 字符串
 * @param {number} numRows - 行数
 */
function convert(s, numRows) {
  const res = [];
  const len = s.length;
  let flag = -1;
  let curIndex = 0;
  for (let i = 0; i < len; i++) {
    const povit = s[i];
    res[curIndex] = (res[curIndex] || "") + povit;

    if (curIndex === numRows - 1 || curIndex === 0) {
      flag = -flag;
    }

    curIndex = curIndex + flag;
  }
  return res.join("");
}

console.log(convert("PAYPALISHIRING", 3));
