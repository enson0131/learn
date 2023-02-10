/**
  描述
  一群孩子做游戏，现在请你根据游戏得分来发糖果，要求如下：

  1. 每个孩子不管得分多少，起码分到一个糖果。
  2. 任意两个相邻的孩子之间，得分较多的孩子必须拿多一些糖果。(若相同则无此限制)

  给定一个数组 arrarr 代表得分数组，请返回最少需要多少糖果。

  要求: 时间复杂度为 O(n)O(n) 空间复杂度为 O(n)O(n)

 思路:
 根据规则 相邻的孩子中分数高的孩子糖果多
 相邻分为左相邻和右相邻
 - 1 在左相邻中，当前孩子比左边孩子分数高，那边当前孩子糖果 = 左边孩子糖果数 + 1
 - 2 在右相邻中，当前孩子比右孩子分数高，那么当前孩子糖果 = 右边孩子糖果数 + 1
 - 3 取左相邻和右相邻的最大数，求和即

 本题我采用了两次贪心的策略：
  一次是从左到右遍历，只比较右边孩子评分比左边大的情况。
  一次是从右到左遍历，只比较左边孩子评分比右边大的情况。
  这样从局部最优推出了全局最优。
 * pick candy
 * @param arr int整型一维数组 the array
 * @return int整型
 */
function candy(arr) {
  // write code here
  const len = arr.length;
  const countList = new Array(len).fill(1);

  // 左相邻
  for (let i = 1; i < len; i++) {
    if (arr[i - 1] < arr[i]) {
      countList[i] = countList[i - 1] + 1;
    }
  }
  
  // 右相邻
  for(let i = len - 1; i > 0; i--) {
    if (arr[i] < arr[i - 1]) {
      countList[i - 1] = Math.max(countList[i - 1], countList[i] + 1);
    }
  }

  return countList.reduce((pre, cur) => pre + cur, 0);
}
