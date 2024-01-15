/**
 * https://leetcode.cn/problems/merge-intervals/description/
 * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
 * 
 * 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
    输出：[[1,6],[8,10],[15,18]]
    解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 */

/**
 * 思路:
 * 1 intervals 进行升序排序
 * 2 生成一个新的数组，如果有重合的区间，就合并
 * 3 没有重合的区间，就直接 push 进去
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  if (intervals.length <= 1) return intervals;
  const res = [];
  const arr = intervals.sort((a, b) => a[0] - b[0]); // 升序排序
  const arrLen = arr.length;
  let povit = arr[0]; // 指针
  for (let i = 1; i < arrLen; i++) {
    const [povitStart, povitEnd] = povit;
    const [start, end] = arr[i];

    if (povitEnd >= start) {
      povit = [povitStart, Math.max(povitEnd, end)];
    } else {
      res.push(povit);
    }
  }
  res.push(povit);
  return res;
};

console.log(
  merge([
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ])
);
// true: [[1,6],[8,10],[15,18]]

console.log(
  merge([
    [1, 4],
    [2, 3],
  ])
);
// true: [[1, 4]]
