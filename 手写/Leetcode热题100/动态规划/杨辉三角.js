/**
给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。

在「杨辉三角」中，每个数是它左上方和右上方的数的和。

示例 1:

输入: numRows = 5
输出: [
        [1],
        [1,1],
        [1,2,1],
        [1,3,3,1],
        [1,4,6,4,1]
      ]
示例 2:
输入: numRows = 1
输出: [[1]]
 */

/**
 * 思路
 * 1 对于杨辉三角而言，每个数是它左上方和右上方的数的和。
 * 2.二维数组的 两侧 均为 1
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
  if (numRows === 1) return [[1]];

  const res = new Array(numRows);

  for (let i = 0; i < numRows; i++) {
    // i 表示 行数
    res[i] = new Array(i + 1).fill(1);

    // j 表示 列数
    for (let j = 1; j < i; j++) {
      res[i][j] = res[i - 1][j - 1] + res[i - 1][j];
    }
  }

  return res;
};
