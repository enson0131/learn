
/**
 *             1
 *           2       2
 *         3   3 null null
 *       4   4
 * 输入一棵二叉树的根节点，判断该树是不是平衡二叉树。
 * 如果某二叉树中任意节点的左右子树的深度相差不超过1，那么它就是一棵平衡二叉树。
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 思路
 * 从根节点出发
 * 递归判断每一个节点的左右子树的高度差
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {

  if (!root) return true;
  
  // 获取子树的深度
  const _getMaxLevel = (root, level = 0) => {
    if (!root) return level;
    level++
    return Math.max(_getMaxLevel(root.left, level), _getMaxLevel(root.right, level))
  }

  // 检查每一个节点是不是左右字数都是相差1以内
  const _checkLevel = (root) => {
    if (!root) return true;

    const leftLevel = _getMaxLevel(root.left);
    const rightLevel = _getMaxLevel(root.right);
    const value = Math.abs(leftLevel - rightLevel);
    
    return value <= 1 && _checkLevel(root.left) && _checkLevel(root.right);
  }

  return _checkLevel(root)
  
};

