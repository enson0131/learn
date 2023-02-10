


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 思路:
 1 维护一个数组minMap
 2 递归遍历树
 3 对minMap进行排序
   - 如果没有找到更小的值 排序push
   - 如果当前找到了更小的值，在对应的index下插入操作
 4 遍历完后，return minMap[k - 1];
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
  if (!root) return;
  const minMap = []; // 存放最小的值
  sortTree(root, minMap);
  console.log(minMap)
  return minMap[k - 1];
};

var sortTree = function(root, minMap) {
  if (!root) return;
  if (root.val == undefined) return;
  
  const currentValue = root.val;
 
  const targetIndex = minMap.findIndex((value) => {
    return value >= currentValue;
  })

  if (targetIndex >= 0) {
    minMap.splice(targetIndex, 0, currentValue);
  } else {
    minMap.push(currentValue);
  }

  sortTree(root.left, minMap)
  sortTree(root.right, minMap)
}
