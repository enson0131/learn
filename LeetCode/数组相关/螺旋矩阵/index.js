/**
 * 思路:
 *   1 有 4 个方向的遍历函数 上、下、左、右
 *   2 维护 2 个状态 curRow、 curCol 当前行和当前列，不断地遍历获取原数组 matrix 的值
 *   3 通过最小行 minRow、最小列 minCol、最大行maxRow、最大列 maxCol 缩短需要遍历的范围
 *   4 直到 res 的长度和 matrix 长度一致, 停止遍历
 * 注意:
 *   要在更新最小行、最小列、最大行、最大列的状态时，需要先遍历完行或者列后在更新
 *
 * 
 * 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
 *  输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
    输出：[1,2,3,6,9,8,7,4,5]
 * @param matrix 
 */
function spiralOrder(matrix) {
  const res = [];
  let curRow = 0; // 行
  let curCol = 0; // 列
  let minRow = 0;
  let minCol = 0;
  let maxRow = matrix.length - 1;
  let maxCol = matrix[0].length - 1;

  let i = 0;
  while (res.length < matrix.length * matrix[0].length) {
    if (i % 4 === 0) {
      // 向左
      const left = _toLeft(curRow, curCol, maxCol, matrix);
      res.push(...left);
      curRow++;
      curCol = maxCol;
      minRow++;
    }

    if (i % 4 === 1) {
      // 向下
      const bottom = _toBottom(curRow, curCol, maxRow, matrix);
      res.push(...bottom);
      curRow = maxRow;
      curCol--;
      maxCol--;
    }

    if (i % 4 === 2) {
      // 向右
      res.push(..._toRight(curRow, curCol, minCol, matrix));
      curRow--;
      curCol = minCol;
      maxRow--;
    }

    if (i % 4 === 3) {
      // 向上
      res.push(..._toTop(curRow, curCol, minRow, matrix));
      curRow = minRow;
      curCol++;
      minCol++;
    }

    i++;
  }

  function _toLeft(curRow, curCol, maxCol, matrix) {
    const res = [];
    while (curCol <= maxCol) {
      res.push(matrix[curRow][curCol]);
      curCol++;
    }

    return res;
  }

  function _toBottom(curRow, curCol, maxRow, matrix) {
    const res = [];
    while (curRow <= maxRow) {
      res.push(matrix[curRow][curCol]);
      curRow++;
    }

    return res;
  }

  function _toRight(curRow, curCol, minCol, matrix) {
    const res = [];
    while (curCol >= minCol) {
      res.push(matrix[curRow][curCol]);
      curCol--;
    }

    return res;
  }

  function _toTop(curRow, curCol, minRow, matrix) {
    const res = [];
    while (curRow >= minRow) {
      res.push(matrix[curRow][curCol]);
      curRow--;
    }

    return res;
  }

  return res;
}

// 解法二:
/**
 思路:
 1 通过一个方向器控制上下左右
 2 在遍历的过程中，根据下一个坐标的相关信息判断是否需要调整方向控制器
 3 将结果缓存到 res 中
 */
function spiralOrder2(matrix) {
  const res = [];
  const row = matrix.length; // 行
  const col = matrix.length; // 列
  const total = row * col;
  const directionArr = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];
  const visited = new Array(row).fill(0).map(() => new Array(col).fill(false));
  let povit = 0;
  let i = 0;
  let j = 0;

  for (let index = 0; index < total; index++) {
    res[index] = matrix[i][j];
    visited[i][j] = true;
    let direction = directionArr[povit];

    const nextRow = i + direction[0];
    const nextCol = j + direction[1];
    // 检察方向的正确性
    if (
      !(
        nextRow >= 0 &&
        nextCol >= 0 &&
        nextRow < row &&
        nextCol < col &&
        !visited[nextRow][nextCol]
      )
    ) {
      povit = (povit + 1) % 4;
      direction = directionArr[povit];
    }

    i = i + direction[0];
    j = j + direction[1];
  }

  return res;
}

console.log(
  spiralOrder2([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
);

// 2023-01-15
// 思路3 相对于 思路2 的解法在于 思路3 是先调整坐标再push。思路2 是先push 在调整位置
/**
 思路3:
 1 提供一个方向控制机器人 root = [[1, 0], [0, 1], [-1, 0], [0, -1]];
 2 通过 hash 表记录当前元素是否有被访问过 visited
 3 在遍历数组的过程中, 如果遇到 visited 被访问过或者到达边界则换方向
 4 通过 prePosition 记录前一个左边，探测下一个坐标是否合规, 合规则步进，否则将更换方向
 5 直到数组长度等于二维数据的元素个数，停止遍历
 */
function spiralOrder3(matrix) {
  let povit = 0;
  const visited = {};
  const root = [
    // matrix 是二维数组
    [0, 1], // 右
    [1, 0], // 下
    [0, -1], // 左
    [-1, 0], // 上
  ];
  const res = [];
  const row = matrix[0].length;
  const col = matrix.length;

  let prePosition = [0, -1]; // 前一个坐标
  while (res.length < row * col) {
    povit = povit % 4;
    const x = prePosition[0] + root[povit][0];
    const y = prePosition[1] + root[povit][1];
    if (x < row && x >= 0 && y < col && y >= 0 && !visited[matrix[x][y]]) {
      res.push(matrix[x][y]);
      visited[matrix[x][y]] = true;
      prePosition[0] = x; // 步进
      prePosition[1] = y;
    } else {
      povit++;
    }
  }
  return res;
}

console.log(
  spiralOrder3([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
);
