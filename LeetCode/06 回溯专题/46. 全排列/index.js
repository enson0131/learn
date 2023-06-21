/**
 * 回溯的本质就是递归 + 回撤状态（并在递归内部通过for循环进行不断回撤）
 思路:
 求 [1, 2, 3] 的全排列可以转化成
                      []
          1           2           3
        2   3       1   3       1    2
      3       2   3       1   2        1
  求树的排列类型
  1 树可以通过深度优先进行遍历
  2 遍历到子节点后，需要状态回撤
    - 例如遍历到 1->2->3后，3后用pop()，判断是否有新的子节点存在
 */
function sortCode(nums) {
    if (nums.length <= 1) return [nums];
    const res = [];
    function dfs(path) {
        if (path.length === nums.length) {
        res.push(path.slice()); // 这个要用slice, 因为path的内存指向值会变
        return;
        }
        for (const num of nums) {
          if (path.include(num)) continue; // 存在相同的值就不填充
          path.push(num);
          dfs(path);
          path.pop();
        }
    }
    
    dfs([]);
    return res;
}
console.log(sortCode([1, 2, 3]));