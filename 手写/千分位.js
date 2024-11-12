/**
    给你一个整数 n，请你每隔三位添加点（即 "." 符号）作为千位分隔符，并将结果以字符串格式返回。
    示例 1：

    输入：n = 987
    输出："987"
    示例 2：

    输入：n = 1234
    输出："1.234"
    示例 3：

    输入：n = 123456789
    输出："123.456.789"
    示例 4：

    输入：n = 0
    输出："0"
 */

/**
 * 思路:
 * 1 如何数字小于 1000 直接返回
 * 2 源数字进行遍历，每3位插入一个点

 * @param {number} n
 * @return {string}
 */
var thousandSeparator = function (n) {
  if (n < 1000) return n;

  let res = "";
  const str = n.toString();
  const len = str.length;

  for (let i = 0; i < len; i++) {
    if (i > 0 && i % 3 === 0) {
      res = "." + res; // 要留意整除的场景
    }
    res = str[len - 1 - i] + res;
  }

  if (res[0] === ".") {
    res = res.slice(1);
  }

  return res;
};

/**
 *
 * @param {number} n
 * @return {string}
 */
var thousandSeparator = function (n) {
  if (n < 1000) return n;
  const str = n.toString();
  const len = str.length;
  let res = "";

  for (let i = 0; i <= len - 1; i++) {
    const povit = str[len - 1 - i];
    res = povit + res;
    if ((i + 1) % 3 === 0 && i !== len - 1) {
      res = "." + res;
    }
  }
  return res;
};

console.log(`thousandSeparator---->`, thousandSeparator(1000));
