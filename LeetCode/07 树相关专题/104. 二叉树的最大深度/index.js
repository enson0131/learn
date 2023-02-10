/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 思路: 用递归的思想去找左右子树的最大值
 * @param {TreeNode} root
 * @return {number}
 */
 var maxDepth = function(root) {
  if (!root) return 0;
  let max= 0;

  const _getMaxDeep = (root, max) => {
      if (!root) return max;
      
      max++;

      // 获取是左子树还是右子树的最大值
      return Math.max(_getMaxDeep(root.left, max), _getMaxDeep(root.right, max));
  }

  return _getMaxDeep(root, max);
};