/**
 * 思路: 回溯法
 * 1 求三者，先求前2者, 合并后再求结果和后一者
 * [["a", "b"], ["n", "m"], ["0", "1"]] => ["am0", "am1", "an0", "an1", "bm0", "bm1", "bn0", "bn1"]
 */

function fn(arr) {
  // reduce如果没有指定初始值, prev就是
  return arr.reduce((prev, cur) => {
    return _add(prev, cur);
  });

  function _add(prev, cur) {
    const res = [];
    prev.forEach(element => {
      cur.forEach(subElement => {
        res.push(element + '' + subElement)
      })
    });
    return res;
  }
}

console.log(fn([["a", "b"], ["n", "m"], ["0", "1"]]))