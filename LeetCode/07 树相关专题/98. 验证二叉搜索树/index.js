/**
 *
  给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。

  有效 二叉搜索树定义如下：

  节点的左子树只包含 小于 当前节点的数。
  节点的右子树只包含 大于 当前节点的数。
  所有左子树和右子树自身必须也是二叉搜索树。

 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 需要递归去验证每一个节点是否满足左 < 根 && 右 > 根的场景
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
   
  const _checkBST = (root, maxValue, minValue) => {
    if (!root) return true;

    const flag = root.val < maxValue && root.val > minValue;

    return flag && _checkBST(root.left, root.val, minValue) && _checkBST(root.right, maxValue, root.val);
  }

  return _checkBST(root, Infinity, -Infinity);
};