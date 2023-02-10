/**
给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。

你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。


输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[[7,4,1],[8,5,2],[9,6,3]]

1 2 3    7 4 1
4 5 6 👉 8 5 2
7 8 9    9 6 3
 */

/**
 思路1:
 1 对数组旋转，其实就是换个起始坐标换个方向遍历数组
 2 因为不能使用另一个矩阵，因此可以将遍历后的结果push在源数据，后续在剔除源数据即可。
 * @param {*} matrix - 二维数组
 */
var rotate = function (matrix) {
  let n = matrix.length;

  for (let j = 0; j < n; j++) {
    // 控制列
    const arr = [];
    for (let i = n - 1; i >= 0; i--) {
      // 控制行
      arr.push(matrix[i][j]);
    }
    matrix.push(arr);
  }

  while (n--) {
    matrix.shift();
  }
};

/**
 * 思路2:
 * 对矩阵进行顺时针循转即可通过 上下对折、对角对折获取到顺时间旋转矩阵
 * @param {*} matrix
 */
var rotate = function (matrix) {
  let n = matrix.length;

  for (let i = 0; i < Math.floor(n / 2); i++) {
    // 上下对折
    for (let j = 0; j < n; j++) {
      [matrix[i][j], matrix[n - i - 1][j]] = [
        matrix[n - i - 1][j],
        matrix[i][j],
      ];
    }
  }

  for (let i = 0; i < n; i++) {
    // 对角对折
    for (let j = i; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  console.log(`matrix====>`, matrix);
};

rotate([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);
